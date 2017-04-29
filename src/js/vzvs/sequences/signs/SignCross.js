const stage = require( "mnf/core/stage" )
const random = require( "mnf/utils/random" )
const audio = require( "mnf/core/audio" )

const SignsSerie = require( "./SignsSerie" )

class SignCross extends SignsSerie {

  constructor( data ) {
    super( data )

    this.ids.push( "sign_cross" )
    this.refreshMap()

    this.switchRate = 20
    this.idxRate = random() * this.switchRate >> 0

    this.zRatio = 1 + Math.random() * 3
  }

  start() {
    stage.onUpdate.add( this.onUpdate )
  }

  onUpdate = () => {
    this.position.z = this.__positionZ + audio.volume * 40 * this.zRatio

    // this.rotation.z += .01 + random() * .2

    this.idxRate += 1
    if( this.idxRate > this.switchRate ) {
      // this.next()
      this.rotation.z = ( random() * 4 >> 0 ) * Math.PI * .25
      this.idxRate = 0
    }
  }

  stop() {
    stage.onUpdate.remove( this.onUpdate )
  }

}

module.exports = SignCross
