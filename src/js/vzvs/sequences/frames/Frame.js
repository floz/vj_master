const stage = require( "mnf/core/stage" )
const stage3d = require( "mnf/core/stage3d" )
// const audio = require( "mnf/core/audio2" )
const audio = require( "mnf/core/audio" )
const random = require( "mnf/utils/random" )
const uArray = require( "mnf/utils/arrays" )
const uMaths = require( "mnf/utils/maths" )
const vjVars = require( "vzvs/core/vjVars" )
const sequences = require( "vzvs/core/sequences" )

class Frame extends THREE.Group {

  constructor( id ) {
    super()

    this.sequence = sequences.getSequenceById( id )
    stage3d.setClearColor( this.sequence.colorsBg.get() )

    this.imagesAvailables = []
    this.grabImageAvailables()
    this.imagesUsed = []

    this.signs = []
    this.elementsToMoveZ = []

    this.idxBigBeat = 0
    stage.onUpdate.add( this.onUpdate )
    audio.onBeat.add( this.onBigBeat )
    audio.onBeat.add( this.onStandardBeat )
    // audio.onBigBeat.add( this.onBigBeat )
    // audio.onStandardBeat.add( this.onStandardBeat )
  }

  grabImageAvailables() {
    this.imagesAvailables = this.sequence.assets.imgs
    uArray.shuffle( this.imagesAvailables )
  }

  resetImageUsed() {
    this.imagesUsed = []
  }

  getNewImage( andCheckIfUsed = true ) {
    if( !andCheckIfUsed ) {
      return this.getRandomImage()
    }
    if( this.imagesUsed.length == this.imagesAvailables.length ) {
      return this.getRandomImage()
    } else {
      const imagesAvailables = uArray.clone( this.imagesAvailables )
      let tries = imagesAvailables.length
      while( tries >= 0 ) {
        let idx = imagesAvailables.length * random() >> 0
        if( this.imagesUsed.indexOf( this.imagesAvailables[ idx ] ) < 0 ) {
          const newImage = this.imagesAvailables[ idx ]
          this.imagesUsed.push( newImage )
          return newImage
        }
        imagesAvailables.splice( idx, 1 )
        tries--
      }
      return this.getRandomImage()
    }
  }

  getRandomImage() {
    return this.imagesAvailables[ this.imagesAvailables.length * random() >> 0 ]
  }

  onUpdate = () => {
    for( let i = 0, n = this.signs.length; i < n; i++ ) {
      let sign = this.signs[ i ]
      // sign.position.z = sign.__positionZ + vjVars.signs.zChange * audio.values[ 3 ]
      sign.position.z = sign.__positionZ + vjVars.signs.zChange * audio.volume
    }

    for( let i = 0, n = this.children.length; i < n; i++ ) {
      let c = this.children[ i ]
      if( c.z ) {
        if( !c.frictionZ ) {
          let pz = c.__positionZ || c.position.z || 0
          c.frictionZ = uMaths.remap( pz, -100, 150, .02, .125 )
        }
        c.z += ( 0 - c.z ) * c.frictionZ
        c.position.z = c.z + ( c.__positionZ || 0 )
      }
    }

    for( let i = 0, n = this.elementsToMoveZ.length; i < n; i++ ) {
      let element = this.elementsToMoveZ[ i ]
      let ratio = element.__ratio || 1
      // if( element.z ) {
      //   // element.z += ( 0 - element.z ) * .1
      //   element.position.z = element.z + element.__positionZ
      // } else {
      // element.position.z = element.z + element.__positionZ + ratio * vjVars.elements.zChange * audio.values[ 1 ]
      element.position.z = element.z + element.__positionZ + ratio * vjVars.elements.zChange * audio.volume
      // }
    }

    this.update()
  }

  update() {

  }

  onStandardBeat = () => {
    this.applyStandardBeatActions()
  }

  applyStandardBeatActions() {

  }

  onBigBeat = () => {
    this.idxBigBeat++
    if( this.idxBigBeat < 2 ) {
      return
    }
    this.idxBigBeat = 0
    for( let i = 0, n = this.signs.length; i < n; i++ ) {
      let sign = this.signs[ i ]
      sign.setColor( this.sequence.colorsShapes.get() )
    }
    this.applyBigBeatActions()
  }

  applyBigBeatActions() {

  }

  setStyle( id ) {
    this.sequence = sequences.getSequenceById( id )
    stage3d.setClearColor( this.sequence.colorsBg.get() )

    this.grabImageAvailables()
    this.resetImageUsed()

    for( let i = 0, n = this.signs.lenght; i < n; i++ ) {
      let sign = this.signs[ i ]
      sign.setColor( this.sequence.colorsShapes.get() )
    }
  }

  dispose() {
    stage.onUpdate.remove( this.onUpdate )
    audio.onBeat.remove( this.onBigBeat )
    audio.onBeat.remove( this.onStandardBeat )
    // audio.onBigBeat.remove( this.onBigBeat )
    // audio.onStandardBeat.remove( this.onStandardBeat )

    for( let i = 0, n = this.signs.length; i < n; i++ ) {
      this.signs[ i ].stop()
    }
  }

}

module.exports = Frame
