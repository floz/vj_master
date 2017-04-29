const stage = require( "mnf/core/stage" )
const stage3d = require( "mnf/core/stage3d" )
const gui = require( "mnf/utils/gui" )

const data = require( "psykato/core/data" )
const PsykatoSim = require( "psykato/PsykatoSim" )
const PsykatoPlane = require( "psykato/PsykatoPlane" )
const PsykatoParticles = require( "psykato/PsykatoParticles" )

const PostProcessManager = require( "./postprocess/PostProcessManager" )

class Psykato {

  constructor() {
    this.postProcessManager = new PostProcessManager()
    // this.postProcessManager.activate()
    // this.postProcessManager.debug()

    // stage3d.add( new THREE.Mesh(
    //   new THREE.BoxBufferGeometry( 500, 500, 500 ),
    //   new THREE.MeshBasicMaterial( { color: 0xff00ff } )
    // ) )
    // this.plane = new THREE.Mesh(
    //   new THREE.PlaneBufferGeometry( 595, 893, 1, 1 ),
    //   new THREE.MeshBasicMaterial( { map: data.textures.shinjuku } )
    // )
    // stage3d.add( this.plane )


    // stage3d.add( this.sim.getDebugMesh() )

    const colors = [ 0xfaf6d0, 0xfff2b4, 0xffc460, 0xed5027, 0x48486a, 0xc4381d, 0x1e1a29, 0x5d0b0d ]

    this.particles = []
    for( let i = 0; i < colors.length; i++ ) {
      let sim = new PsykatoSim( Math.PI * .5 * i )
      // if( i == 0 ) {
      //   stage3d.add( sim.getDebugMesh() )
      // }

      // let p = new PsykatoParticles( sim, 1.25 - .15 * i, colors[ i ] )
      // let p = new PsykatoParticles( sim, .5 + .15 * i, colors[ i ] )
      let p = new PsykatoParticles( sim, 1, colors[ i ] )
      p.position.z = -i * 20 + 10
      p.scale.set( 1 + .2 * i, 1 + .2 * i )
      // p.scale.set( 1 - .075 * i, 1 - .075 * i )
      p.rotation.x = i * Math.PI * .5
      p.rotation.z = i * Math.PI * .25
      stage3d.add( p )

      // console.log( .5 + .25 * i )

      this.particles.push( p )
    }

    // this.plane = new PsykatoPlane()
    // stage3d.add( this.plane )

    // const f = gui.addFolder( "Plane" )
    // f.add( this.plane.position, "z", -1000, 1000 )
    // f.add( this.plane.rotation, "z", -Math.PI, Math.PI )
    // f.open()

    stage.onUpdate.add( this.onUpdate )
  }

  onUpdate = () => {
    // this.sim.update()
    for( let i = 0, n = this.particles.length; i < n; i++ ) {
      this.particles[ i ].update()
    }
    // this.particles.update()
  }

}

module.exports = Psykato
