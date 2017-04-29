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

class FrameFat extends Frame {

  constructor( id ) {
    super( id )

    const dataFat = {
      x: 0, y: -2, width: 20, height: 20
    }
    this.imageFat = new PictureParticular( this.getNewImage(), dataFat )
    const r = random() * 30 >> 0
    this.imageFat.createParticles( 1.15 + random() * 1.5, 26 + r, 26 + r )
    this.imageFat.setParticlesPositions( -4, 2, 80 )
    this.add( this.imageFat )

    let sign = null
    let xs = [ -4, 0, 11 ]
    let ys = [ 10, 10, -3 ]
    let sizes = [ 8, 8, 12 ]
    for( let i = 0; i < 3; i++ ) {
      let dataSign = {
        x: xs[ i ], y: ys[ i ], width: sizes[ i ], height: sizes[ i ]
      }
      if( i < 2 ) {
        sign = new SignRandomSerie( dataSign )
      } else {
        sign = new SignsCircleSerie( dataSign )
      }
      sign.position.z = 20 + 20 * ( i == 1 ? 1 : 0 )
      sign.setColor( this.sequence.colorsShapes.get() )
      sign.start()
      sign.__positionZ = sign.position.z
      this.add( sign )

      this.signs.push( sign )
    }

    let x = -1
    let y = -1
    for( let i = 0, n = 7; i < n; i++ ) {
      for( let j = 0, m = 6; j < m; j++ ) {
        let size = random() < .1 ? 2 : 1
        let dataSign = {
          x: x, y: y, width: size, height: size
        }

        if( random() < .9 ) {
          let sign = null
          if( random() < .25 ) {
            sign = new SignsCircleSerie( dataSign )
          } else if( random() < .5 ) {
            sign = new SignRandomSerie( dataSign )
          } else {
            sign = new SignCross( dataSign )
          }
          sign.position.z = 60
          sign.__positionZ = sign.position.z
          sign.setColor( this.sequence.colorsShapes.get() )
          sign.start()
          this.add( sign )

          this.signs.push( sign )
        }
        if( j == 1 ) {
          x += 6
        } else {
          x += 3
        }
      }
      y += 3
      x = -1
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
      this.imageFat.picture.reset()
    }

    onDialGreen = () => {
      this.imageFat.picture.setGranularityY( this.dialGreen.percent * 200 >> 0 )
    }

    onDialYellow = () => {
      this.imageFat.picture.setGranularityX( this.dialYellow.percent * 200 >> 0 )
    }

    onDialPurple = () => {
      this.imageFat.picture.setOffsetX( this.dialPurple.percent )
    }

    onDialCyan = () => {
      this.imageFat.picture.setOffsetY( this.dialCyan.percent )
    }

    onButtonGreen = ( ) => {
      if( this.buttonGreen.state == "released" ) {
        this.isAutoDispLevel = !this.isAutoDispLevel
        if( !this.isAutoDispLevel ) {
          this.imageFat.picture.setDisplacementLevel( 0 )
        }
      }
    }

    onButtonBlue = () => {
      if( this.customFI == 100 ) {
        this.customFI = -25
      }
      this.customFI += 25
      this.imageFat.picture.setCustomFI( this.customFI )
    }

    onSliderBlue = () => {
      this.imageFat.picture.setDisplacementLevel( this.sliderBlue.percent )
      this.isImageSwirling = this.sliderBlue.percent > .05
    }

    onSliderGreen = () => {
      this.imageFat.picture.setDepthValue( this.sliderGreen.percent )
    }

    applyStandardBeatActions() {
      if( vjVars.picture.canAutoGranularityX && random() < .5 ) {
        this.imageFat.picture.setGranularityX( random() * 200 >> 0 )
      }
      if( vjVars.picture.canAutoGranularityY && random() < .5 ) {
        this.imageFat.picture.setGranularityY( random() * 200 >> 0 )
      }
    }

    applyBigBeatActions() {
      if( vjVars.picture.canAutoUpdate ) {
        this.imageFat.picture.swirl( true )
      }

      if( vjVars.picture.canAutoSwirl ) {
        this.imageFat.picture.setDisplacementLevel( random() )
      }
    }

    update() {
      if( this.isAutoDispLevel ) {
        this.imageFat.picture.setDisplacementLevel( audio.values[ 0 ] )
      }

      if( !vjVars.picture.canAutoUpdate ) {
        return
      }
      this.imageFat.picture.swirl()
    }

    setStyle( id ) {
      super.setStyle( id )
      this.imageFat.setStyle( id )
    }

  dispose() {
    this.buttonBlue.onAction.remove( this.onButtonBlue )
    this.dialGreen.onPercentChange.remove( this.onDialGreen )
    this.dialYellow.onPercentChange.remove( this.onDialYellow )
    this.dialPurple.onPercentChange.remove( this.onDialPurple )
    this.dialCyan.onPercentChange.remove( this.onDialCyan )

    this.imageFat.dispose()

    super.dispose()
  }

}

module.exports = FrameFat
