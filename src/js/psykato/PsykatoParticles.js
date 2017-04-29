const stage3d = require( "mnf/core/stage3d" )

const random = require( "mnf/utils/random" )

const PsykatoParticlesSim = require( "psykato/PsykatoParticlesSim" )
const vs = require( "psykato/shaders/PsykatoParticles.vs" )
const fs = require( "psykato/shaders/PsykatoParticles.fs" )

class PsykatoParticles extends THREE.Points {

  constructor( simKaleid, alpha, color ) {
    const bounds = 500


    const particlesSim = new PsykatoParticlesSim( simKaleid, bounds )
    const meshSim = particlesSim.getDebugMesh()
    meshSim.position.z = 10
    // stage3d.add( meshSim )

    const count = 16000

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

      vertices[ idx3 + 0 ] = 0
      vertices[ idx3 + 1 ] = 0
      vertices[ idx3 + 2 ] = 0

      idx2 += 2
      x += 1
      if( x > particlesSim.width - 1 ) {
        x = 0
        y += 1
      }
    }

    const geo = new THREE.BufferGeometry()
    geo.addAttribute( "position", new THREE.BufferAttribute( vertices, 3 ) )
    geo.addAttribute( "uvData", new THREE.BufferAttribute( uvDatas, 2 ) )
    geo.addAttribute( "uid", new THREE.BufferAttribute( uids, 1 ) )

    const uniforms = {
      tSimParticles: { type: "t", value: particlesSim.getTexture() },
      tSimKaleid: { type: "t", value: simKaleid.getTexture() },
      bounds: { type: "f", value: bounds },
      alpha: { type: "f", value: alpha },
      color: { type: "c", value: new THREE.Color( color ) }
    }
    const mat = new THREE.ShaderMaterial( {
      uniforms: uniforms,
      vertexShader: vs,
      fragmentShader: fs,
      transparent: true,
      type: "PsykatoParticles",
      side: THREE.DoubleSide,
    } )

    super( geo, mat )

    this.simKaleid = simKaleid

    this.frustumCulled = false
    // this.renderOrder = 1000

    this.particlesSim = particlesSim
  }

  update() {
    this.simKaleid.update()
    this.particlesSim.update()
    this.material.uniforms.tSimParticles.value = this.particlesSim.getTexture()
    this.material.uniforms.tSimKaleid.value = this.simKaleid.getTexture()
  }

}

module.exports = PsykatoParticles
