const random = require( "mnf/utils/random" )
const stage = require( "mnf/core/stage" )
// const audio = require( "mnf/core/audio2" )
const audio = require( "mnf/core/audio" )

const textures = require( "vj/textures" )

const data = require( "vzvs/core/data" )
const VZVSMesh = require( "vzvs/core/VZVSMesh" )

class SignsSerie extends VZVSMesh {

  constructor( data ) {
    const mat = new THREE.MeshBasicMaterial( {
      map: null,
      color: 0xffffff,
      // wireframe: true,
      transparent: true
    } )

    super( data, mat, true, true )

    this.ids = []
    this.idxCurrent = 0

    this.rotationZ = 0
  }

  refreshMap() {
    this.material.map = textures[ this.ids[ this.idxCurrent ] ]
    this.animateScale( .4, 1, .6 )

    if( random() < .4 ) {
      let sign = random() < .5 ? 1 : -1
      if( random() < .5 ) {
        this.rotationZ += Math.PI * .25 * sign
      } else {
        this.rotationZ += Math.PI * .5 * sign
      }
      this.rotation.z = this.rotationZ
      // this.position.z = Math.random() * 1000
    //   TweenLite.to( this.rotation, .4, {
    //     z: this.rotationZ,
    //     ease: Power4.easeInOut
    //   } )
    }
  }

  setColor( color ) {
    this.material.color.set( color )
  }

  next() {
    this.idxCurrent++
    if( this.idxCurrent > this.ids.length -1 ) {
      this.idxCurrent = 0
    }
    this.refreshMap()
  }

  random() {
    this.idxCurrent = this.ids.length * random() >> 0
    this.refreshMap()
  }

  start() {
    // audio.onStandardBeat.add( this.onBeat )
    audio.onBeat.add( this.onBeat )
  }

  stop() {
    // audio.onStandardBeat.remove( this.onBeat )
    audio.onBeat.remove( this.onBeat )
  }

  onBeat = () => {
    this.update()
  }

  update() {

  }

}

module.exports = SignsSerie
