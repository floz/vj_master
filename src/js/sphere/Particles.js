const random = require( "mnf/utils/random" )

const config = require( "./config" )

const vs = require( "./shaders/Particles.vs" )
const fs = require( "./shaders/Particles.fs" )

const gui = require( "mnf/utils/gui" )

const textures = require( "vj/textures" )

const DATA = {
  colorSet: 1
}

class Particles extends THREE.Points {

  constructor( particlesSim, colorPool, countSpheres, countParticles ) {
    const count = config.particles.count

    let x = 0
    let y = 0
    let idx2 = 0
    let idx3 = 0
    const uids = new Float32Array( count )
    const uvDatas = new Float32Array( count * 2 )
    const vertices = new Float32Array( count * 3 )
    for( let i = 0, n = uids.length; i < n; i++ ) {
      uids[ i ] = random() * 1000

      uvDatas[ idx2 + 0 ] = x / ( particlesSim.width - 1 )
      uvDatas[ idx2 + 1 ] = y / ( particlesSim.height - 1 )

      vertices[ idx3 + 0 ] = random() * 1400 - 700
      vertices[ idx3 + 1 ] = random() * 1000 - 500
      vertices[ idx3 + 2 ] = random() * 20 - 10

      x += 1
      if( x > particlesSim.width - 1 ) {
        x = 0
        y += 1
      }

      idx2 += 2
      idx3 += 3
    }

    const geo = new THREE.BufferGeometry()
    geo.addAttribute( "position", new THREE.BufferAttribute( vertices, 3 ) )
    geo.addAttribute( "uvData", new THREE.BufferAttribute( uvDatas, 2 ) )
    geo.addAttribute( "uid", new THREE.BufferAttribute( uids, 1 ) )

    const uniforms = {
      tBaseData: { type: "t", value: particlesSim.tBaseData },
      tSimParticles: { type: "t", value: particlesSim.getTexture() },
      tParticle: { type: "t", value: textures.sign_cross },
      alpha: { type: "f", value: 1 },
      time: { type: "f", value: 0 },
      bounds: { type: "v2", value: new THREE.Vector2( 0, 0 ) },
      speed: { type: "f", value: .01 },
      dx: { type: "f", value: 0 },
      dy: { type: "f", value: 5 },
      dz: { type: "f", value: 6.3 },
      coef: { type: "f", value: .1 },
      tx: { type: "f", value: 0.01 },
      ty: { type: "f", value: 0.03 },
      time: { type: "f", value: 0 },
      tColors: { type: "t", value: config.textures[ "colors" + DATA.colorSet ] },
      hue: { type: "f", value: 0.00001 },
      sat: { type: "f", value: 0.10 },
      val: { type: "f", value: 0.06 }
    }
    const mat = new THREE.ShaderMaterial( {
      uniforms: uniforms,
      vertexShader: vs,
      fragmentShader: fs,
      transparent: true,
      type: "BIParticles",
      side: THREE.DoubleSide,
      depthWrite: false
    } )

    super( geo, mat )

    const fDebug = gui.addFolder( "ColorMove" )
    fDebug.add( this.material.uniforms.speed, "value", 0.001, .2 ).step( .001 ).name( "speed" )
    fDebug.add( this.material.uniforms.dx, "value", 0.0, 50 ).step( .1 ).name( "dx" )
    fDebug.add( this.material.uniforms.dy, "value", 0.0, 50 ).step( .1 ).name( "dy" )
    fDebug.add( this.material.uniforms.dz, "value", 0.0, 50 ).step( .1 ).name( "dz" )
    fDebug.add( this.material.uniforms.coef, "value", 0.0, .4 ).step( .01 ).name( "coef" )
    fDebug.add( this.material.uniforms.tx, "value", 0.0, 1 ).step( .01 ).name( "tx" )
    fDebug.add( this.material.uniforms.ty, "value", 0.0, 1 ).step( .01 ).name( "ty" )
    fDebug.open()
    const fColorChange = gui.addFolder( "ColorChange" )
    fColorChange.add( DATA, "colorSet", [ 1, 2, 3, 4, 5 ] ).onChange( this.updateColors )
    fColorChange.add( this.material.uniforms.hue, "value", -180, 180 ).step( 1 ).name( "hue" ).listen()
    fColorChange.add( this.material.uniforms.sat, "value", -1, 1 ).step( .01 ).name( "sat" ).listen()
    fColorChange.add( this.material.uniforms.val, "value", -1, 1 ).step( .01 ).name( "val" ).listen()
    fColorChange.open()

    this.frustumCulled = false
    this.particlesSim = particlesSim
  }

  updateColors = () => {
    this.material.uniforms.tColors.value = config.textures[ "colors" + DATA.colorSet ]
    this.material.uniforms.hue.value = 0
    this.material.uniforms.sat.value = 0
    this.material.uniforms.val.value = 0
    if( DATA.colorSet == 4 ) {
      this.material.uniforms.sat.value = .1
      this.material.uniforms.val.value = .06
    }
    if( DATA.colorSet == 4 ) {
      this.material.uniforms.sat.value = .26
      this.material.uniforms.val.value = .1
    }
    if( DATA.colorSet == 5 ) {
      this.material.uniforms.val.value = .4
    }
  }

  update( dt ) {
    this.particlesSim.update( dt )
    this.material.uniforms.time.value += dt
    this.material.uniforms.tSimParticles.value = this.particlesSim.getTexture()
  }

  dispose() {
    gui.removeFolder( "ColorMove" )
    gui.removeFolder( "ColorChange" )
  }

}

module.exports = Particles
