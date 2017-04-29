const midi = require( "mnf/midi/midi" )
const audio = require( "mnf/core/audio2" )
const random = require( "mnf/utils/random" )

const vjVars = require( "vzvs/core/vjVars" )

const data = require( "vzvs/core/data" )
const VZVSMesh = require( "vzvs/core/VZVSMesh" )
const Picture = require( "vzvs/picparts/Picture" )
const PictureParticular = require( "vzvs/picparts/PictureParticular" )
const SignsCircleSerie = require( "vzvs/sequences/signs/SignsCircleSerie" )

const Frame = require( "./Frame" )

class FrameMiddle extends Frame {

  constructor( id ) {
    super( id )

    const dataImageMiddle = {
      x: 2, y: 3, width: 12, height: 10
    }
    this.imageMiddle = new PictureParticular( this.getNewImage(), dataImageMiddle )
    this.imageMiddle.createParticles()
    this.imageMiddle.setParticlesPositions( -3, 2 )
    this.add( this.imageMiddle )

    const dataImageBg = {
      x: 0, y: 0, width: 16, height: 16
    }
    this.imageBg = new Picture( this.getNewImage(), dataImageBg )
    this.imageBg.mesh.position.z = -40
    this.imageBg.setLineDisplaced()
    this.imageBg.mesh.__positionZ = this.imageBg.mesh.position.z
    this.imageBg.mesh.__ratio = -1
    this.add( this.imageBg.mesh )
    this.elementsToMoveZ.push( this.imageBg.mesh )

    const dataSquareBottom = {
      x: -2, y: -2, width: 8, height: 8
    }
    this.matSquareBottom = new THREE.MeshBasicMaterial( {
      color: this.sequence.colorsBlocs.get()
    })
    this.squareBottom = new VZVSMesh( dataSquareBottom, this.matSquareBottom, false, false )
    this.squareBottom.position.z = -30
    this.squareBottom.__positionZ = this.squareBottom.position.z
    this.squareBottom.__ratio = -1
    this.add( this.squareBottom )
    this.elementsToMoveZ.push( this.squareBottom )

    const dataSquareRight = {
      x: 12, y: 5, width: 10, height: 2
    }
    this.matSquareRight = new THREE.MeshBasicMaterial( {
      color: this.sequence.colorsBlocs.get()
    })
    this.squareRight = new VZVSMesh( dataSquareRight, this.matSquareRight )
    this.squareRight.position.z = 10
    this.squareRight.__positionZ = this.squareRight.position.z
    this.add( this.squareRight )
    this.elementsToMoveZ.push( this.squareRight )

    const dataSerieTopRight = {
      x: 12, y: 13, width: 6, height: 6
    }
    this.serieTopRight = new SignsCircleSerie( dataSerieTopRight )
    this.serieTopRight.position.z = 10
    this.serieTopRight.setColor( this.sequence.colorsShapes.get() )
    this.serieTopRight.start()
    this.serieTopRight.__positionZ = this.serieTopRight.position.z
    this.add( this.serieTopRight )

    const serieMiddleBot = {
      x: 6, y: 1, width: 4, height: 4
    }
    this.serieMiddleBot = new SignsCircleSerie( serieMiddleBot )
    this.serieMiddleBot.position.z = 15
    this.serieMiddleBot.setColor( this.sequence.colorsShapes.get() )
    this.serieMiddleBot.start()
    this.serieMiddleBot.__positionZ = this.serieMiddleBot.position.z
    this.add( this.serieMiddleBot )

    this.signs.push( this.serieMiddleBot, this.serieTopRight )

    //

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
    this.imageMiddle.picture.reset()
  }

  onDialGreen = () => {
    this.imageMiddle.picture.setGranularityY( this.dialGreen.percent * 200 >> 0 )
  }

  onDialYellow = () => {
    this.imageMiddle.picture.setGranularityX( this.dialYellow.percent * 200 >> 0 )
  }

  onDialPurple = () => {
    this.imageMiddle.picture.setOffsetX( this.dialPurple.percent )
  }

  onDialCyan = () => {
    this.imageMiddle.picture.setOffsetY( this.dialCyan.percent )
  }

  onButtonGreen = ( ) => {
    if( this.buttonGreen.state == "released" ) {
      this.isAutoDispLevel = !this.isAutoDispLevel
      if( !this.isAutoDispLevel ) {
        this.imageMiddle.picture.setDisplacementLevel( 0 )
      }
    }
  }

  onButtonBlue = () => {
    if( this.customFI == 100 ) {
      this.customFI = -25
    }
    this.customFI += 25
    this.imageMiddle.picture.setCustomFI( this.customFI )
  }

  onSliderBlue = () => {
    this.imageMiddle.picture.setDisplacementLevel( this.sliderBlue.percent )
    this.isImageSwirling = this.sliderBlue.percent > .05
  }

  onSliderGreen = () => {
    this.imageMiddle.picture.setDepthValue( this.sliderGreen.percent )
  }

  applyStandardBeatActions() {
    if( vjVars.picture.canAutoGranularityX && random() < .5 ) {
      this.imageMiddle.picture.setGranularityX( random() * 200 >> 0 )
    }
    if( vjVars.picture.canAutoGranularityY && random() < .5 ) {
      this.imageMiddle.picture.setGranularityY( random() * 200 >> 0 )
    }
  }

  applyBigBeatActions() {
    if( vjVars.picture.canAutoUpdate ) {
      this.imageMiddle.picture.swirl( true )
    }

    if( vjVars.picture.canAutoSwirl ) {
      this.imageMiddle.picture.setDisplacementLevel( random() )
    }
  }

  update() {
    this.imageBg.swirl()

    if( this.isAutoDispLevel ) {
      this.imageMiddle.picture.setDisplacementLevel( audio.values[ 0 ] )
    }

    if( !vjVars.picture.canAutoUpdate ) {
      return
    }
    this.imageMiddle.picture.swirl()
  }

  setStyle( id ) {
    return
    super.setStyle( id )

    this.imageBg.setStyle( id )
    this.imageMiddle.setStyle( id )
    this.squareBottom.material.color.set( this.sequence.colorsBlocs.get() )
    this.squareRight.material.color.set( this.sequence.colorsBlocs.get() )
  }

  dispose() {
    this.buttonBlue.onAction.remove( this.onButtonBlue )
    this.dialGreen.onPercentChange.remove( this.onDialGreen )
    this.dialYellow.onPercentChange.remove( this.onDialYellow )
    this.dialPurple.onPercentChange.remove( this.onDialPurple )
    this.dialCyan.onPercentChange.remove( this.onDialCyan )

    this.imageBg.dispose()
    this.imageMiddle.dispose()
    this.squareBottom.dispose()
    this.squareRight.dispose()

    super.dispose()
  }

}

module.exports = FrameMiddle
