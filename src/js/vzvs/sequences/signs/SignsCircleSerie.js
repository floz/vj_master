const audio = require( "mnf/core/audio" )
const stage = require( "mnf/core/stage" )
const random = require( "mnf/utils/random" )

const SignsSerie = require( "./SignsSerie" )

class SignsCircleSerie extends SignsSerie {

  constructor( data ) {
    super( data )

    this.ids.push( "sign_empty" )
    this.ids.push( "sign_smallcircletop" )
    this.ids.push( "sign_halfcircleright" )
    this.ids.push( "sign_circle" )
    this.ids.push( "sign_smallcircletop" )
    this.ids.push( "sign_dot" )
    this.refreshMap()

    this.switchRate = 20
    this.idxRate = random() * this.switchRate >> 0

    this.zRatio = 1 + Math.random() * 3
  }

  start() {
    super.start()
    stage.onUpdate.add( this.onUpdate )
  }

  onUpdate = () => {
    this.position.z = this.__positionZ + audio.volume * 40 * this.zRatio
  }

  stop() {
    super.stop()
    stage.onUpdate.remove( this.onUpdate )
  }

  update = () => {
    // this.rotation.z += .01 + random() * .2

    // this.idxRate += 1
    // if( this.idxRate > this.switchRate ) {
      // this.next()
      this.random()
      // this.idxRate = 0
    // }
  }

}

module.exports = SignsCircleSerie
