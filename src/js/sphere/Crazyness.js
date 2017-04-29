const stage3d = require( "mnf/core/stage3d" )
const stage = require( "mnf/core/stage" )

const ParticlesSim = require( "./ParticlesSim" )
const Particles = require( "./Particles" )

class Crazyness {

  constructor() {

  }

  start() {
    // const w = stage.width
    // const h = stage.height





    this.particlesSim = new ParticlesSim( 2, 4000 )
    // // if( isFirstInit ) {
    // //   ParticlesSim.debug()
    // // }
    //
    // // stage3d.add( this.particlesSim.getDebugMesh() )
    //
    this.particles = new Particles( this.particlesSim, this.colorPool, 4, 1000 )
    stage3d.add( this.particles )

    stage.onUpdate.add( this.onUpdate )
  }

  onUpdate = ( dt ) => {
    if( this.particles ) {
      this.particles.update( dt )
    }
  }

}

module.exports = Crazyness
