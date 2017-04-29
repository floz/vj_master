const stage = require( "mnf/core/stage" )
const audio = require( "mnf/core/audio" )
const random = require( "mnf/utils/random" )

const SignsSerie = require( "./SignsSerie" )

class SignsCircleSerie extends SignsSerie {

  constructor( data, hasEmpty = true ) {
    super( data )

    if( hasEmpty ) {
      this.ids.push( "sign_empty" )
    }
    this.ids.push( "sign_smallcircletop" )
    this.ids.push( "sign_halfcircleright" )
    this.ids.push( "sign_circle" )
    this.ids.push( "sign_smallcircletop" )
    this.ids.push( "sign_cross" )
    this.ids.push( "sign_sign_dot" )
    this.ids.push( "sign_powerkindaright" )
    this.ids.push( "sign_faux" )
    this.ids.push( "sign_doubletraitsb" )
    this.ids.push( "sign_doubletraits" )
    this.ids.push( "sign_baton" )
    this.ids.push( "sign_zigzag" )
    this.ids.push( "sign_tilde" )
    this.ids.push( "sign_approve" )
    this.ids.push( "sign_powerkindadown" )
    this.ids.push( "sign_powerdown" )
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

  update() {
    this.position.z = this.__positionZ + audio.volume * 40 * this.zRatio
    this.rotation.z = ( random() * 4 >> 0 ) * Math.PI * .25
    this.random()
  }

  // start() {
  //   stage.onUpdate.add( this.onUpdate )
  // }

  // onUpdate = () => {
  //
  //   this.idxRate += 1
  //   if( this.idxRate > this.switchRate ) {
  //     // this.next()
  //     this.rotation.z = ( random() * 4 >> 0 ) * Math.PI * .25
  //     this.random()
  //     this.idxRate = 0
  //   }
  // }

  // stop() {
  //   stage.onUpdate.remove( this.onUpdate )
  // }

}

module.exports = SignsCircleSerie
