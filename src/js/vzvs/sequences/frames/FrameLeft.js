const random = require( "mnf/utils/random" )
const midi = require( "mnf/midi/midi" )
const audio = require( "mnf/core/audio2" )

const vjVars = require( "vzvs/core/vjVars" )
const data = require( "vzvs/core/data" )
const VZVSMesh = require( "vzvs/core/VZVSMesh" )
const Picture = require( "vzvs/picparts/Picture" )
const PictureParticular = require( "vzvs/picparts/PictureParticular" )
const SignsCircleSerie = require( "vzvs/sequences/signs/SignsCircleSerie" )
const SignCross = require( "vzvs/sequences/signs/SignCross" )
const SignRandomSerie = require( "vzvs/sequences/signs/SignRandomSerie" )

const Frame = require( "./Frame" )

class FrameLeft extends Frame {

  constructor( id ) {
    super( id )

    this.isImageSwirling = false

    const dataImageLeft = {
      x: -3, y: 1, width: 18, height: 14
    }
    this.imageLeft = new PictureParticular( this.getNewImage(), dataImageLeft )
    const r = random() * 8 >> 0
    this.imageLeft.createParticles( 1.1 + random() * 1, 15 + r, 15 + r )
    this.imageLeft.setParticlesPositions( 0, 0, 80 )
    this.imageLeft.__positionZ = 0
    this.elementsToMoveZ.push( this.imageLeft )
    this.add( this.imageLeft )

    const dataSquareRight = {
      x: 2, y: 3, width: 18, height: 4
    }
    this.matSquareRight = new THREE.MeshBasicMaterial( {
      color: this.sequence.colorsBlocs.get()
    })
    this.matSquareRight.transparent = true
    this.matSquareRight.opacity = .5
    if( random() < .5 ) {
      this.matSquareRight.blending = THREE.AdditiveBlending
      this.matSquareRight.opacity = .25
    }
    this.squareRight = new VZVSMesh( dataSquareRight, this.matSquareRight, false, true )
    this.squareRight.position.z = 40
    this.squareRight.__positionZ = this.squareRight.position.z
    this.add( this.squareRight )
    this.elementsToMoveZ.push( this.squareRight )

    const dataBigSquare = {
      x: 4, y: -2, width: 16, height: 20
    }
    this.matBigSquare = new THREE.MeshBasicMaterial( {
      color: this.sequence.colorsBlocs.get()
    })
    // if( random() < .5 ) {
    //   this.matBigSquare.transparent = true
      // this.matBigSquare.blending = THREE.AdditiveBlending
    // }
    this.bigSquare = new VZVSMesh( dataBigSquare, this.matBigSquare, false, true )
    this.bigSquare.position.z = -40
    this.bigSquare.__positionZ = this.bigSquare.position.z
    this.bigSquare.__ratio = -1
    this.elementsToMoveZ.push( this.bigSquare )
    this.add( this.bigSquare )

    let x = -2
    let y = random() < .5 ? 1 : 13
    for( let i = 0, n = 4; i < n; i++ ) {
      let dataSign = {
        x: x, y: y, width: 4, height: 4
      }

      if( random() < .8 ) {
        let sign = new SignRandomSerie( dataSign, false )
        sign.position.z = 60
        sign.__positionZ = sign.position.z
        sign.setColor( this.sequence.colorsShapes.get() )
        sign.start()
        this.add( sign )

        this.signs.push( sign )
      }

      x += 4
    }

    this.sliderBlue = midi.pg.sliders.blue
    this.sliderBlue.onPercentChange.add( this.onSliderBlue )

    this.sliderGreen = midi.pg.sliders.green
    this.sliderGreen.onPercentChange.add( this.onSliderGreen )

    this.isAutoDispLevel = false
    this.buttonGreen = midi.pg.buttons.green
    this.buttonGreen.onAction.add( this.onButtonGreen )

    this.customFI = 0
    this.buttonBlue = midi.pg.buttons.blue
    this.buttonBlue.onAction.add( this.onButtonBlue )

    this.dialGreen = midi.pg.dials.green
    this.dialGreen.onPercentChange.add( this.onDialGreen )

    this.dialYellow = midi.pg.dials.yellow
    this.dialYellow.onPercentChange.add( this.onDialYellow )

    this.dialPurple = midi.pg.dials.purple
    this.dialPurple.onPercentChange.add( this.onDialPurple )

    this.dialCyan = midi.pg.dials.cyan
    this.dialCyan.onPercentChange.add( this.onDialCyan )

    vjVars.onReset.add( this.onReset )
  }

  onReset = () => {
    this.customFI = 0
    this.isAutoDispLevel = false
    this.imageLeft.picture.reset()
  }

  onDialGreen = () => {
    this.imageLeft.picture.setGranularityY( this.dialGreen.percent * 200 >> 0 )
  }

  onDialYellow = () => {
    this.imageLeft.picture.setGranularityX( this.dialYellow.percent * 200 >> 0 )
  }

  onDialPurple = () => {
    this.imageLeft.picture.setOffsetX( this.dialPurple.percent )
  }

  onDialCyan = () => {
    this.imageLeft.picture.setOffsetY( this.dialCyan.percent )
  }

  onButtonGreen = ( ) => {
    if( this.buttonGreen.state == "released" ) {
      this.isAutoDispLevel = !this.isAutoDispLevel
      if( !this.isAutoDispLevel ) {
        this.imageLeft.picture.setDisplacementLevel( 0 )
      }
    }
  }

  onButtonBlue = () => {
    if( this.customFI == 100 ) {
      this.customFI = -25
    }
    this.customFI += 25
    this.imageLeft.picture.setCustomFI( this.customFI )
  }

  onSliderBlue = () => {
    this.imageLeft.picture.setDisplacementLevel( this.sliderBlue.percent )
    this.isImageSwirling = this.sliderBlue.percent > .05
  }

  onSliderGreen = () => {
    this.imageLeft.picture.setDepthValue( this.sliderGreen.percent )
  }

  applyStandardBeatActions() {
    if( vjVars.picture.canAutoGranularityX && random() < .5 ) {
      this.imageLeft.picture.setGranularityX( random() * 200 >> 0 )
    }
    if( vjVars.picture.canAutoGranularityY && random() < .5 ) {
      this.imageLeft.picture.setGranularityY( random() * 200 >> 0 )
    }
  }

  applyBigBeatActions() {
    if( vjVars.picture.canAutoUpdate ) {
      this.imageLeft.picture.swirl( true )
    }

    if( vjVars.picture.canAutoSwirl ) {
      this.imageLeft.picture.setDisplacementLevel( random() )
    }
  }

  update() {
    if( this.isAutoDispLevel ) {
      this.imageLeft.picture.setDisplacementLevel( audio.values[ 0 ] )
    }

    if( !vjVars.picture.canAutoUpdate ) {
      return
    }
    this.imageLeft.picture.swirl()
  }

  setStyle( id ) {
    super.setStyle( id )

    this.imageLeft.setStyle( id )
    this.bigSquare.material.color.set( this.sequence.colorsBlocs.get() )
    this.squareRight.material.color.set( this.sequence.colorsBlocs.get() )
  }

  dispose() {
    this.buttonBlue.onAction.remove( this.onButtonBlue )
    this.dialGreen.onPercentChange.remove( this.onDialGreen )
    this.dialYellow.onPercentChange.remove( this.onDialYellow )
    this.dialPurple.onPercentChange.remove( this.onDialPurple )
    this.dialCyan.onPercentChange.remove( this.onDialCyan )

    this.imageLeft.dispose()
    this.squareRight.dispose()
    this.bigSquare.dispose()

    super.dispose()
  }

}

module.exports = FrameLeft
