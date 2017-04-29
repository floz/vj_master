const random = require( "mnf/utils/random" )
const midi = require( "mnf/midi/midi" )
const audio = require( "mnf/core/audio2" )

const textures = require( "vj/textures" )

const vjVars = require( "vzvs/core/vjVars" )

const data = require( "vzvs/core/data" )
const VZVSMesh = require( "vzvs/core/VZVSMesh" )
const Picture = require( "vzvs/picparts/Picture" )
const PictureParticular = require( "vzvs/picparts/PictureParticular" )
const SignsCircleSerie = require( "vzvs/sequences/signs/SignsCircleSerie" )
const SignCross = require( "vzvs/sequences/signs/SignCross" )
const SignRandomSerie = require( "vzvs/sequences/signs/SignRandomSerie" )

const Frame = require( "./Frame" )

class FrameTriple extends Frame {

  constructor( id ) {
    super( id )

    const dataImageLeft = {
      x: 0, y: 0, width: 8, height: 16
    }
    let percentLuck = 1
    if( random() < .65 ) {
      this.imageLeft = new PictureParticular( this.getNewImage(), dataImageLeft )
      this.imageLeft.createParticles( 1 + random() * .5, 10 + random() * 10, 10 + random() * 10 )
      this.imageLeft.setParticlesPositions( 0, 0, 60 )
      if( random() < .3 ) {
        this.imageLeft.picture.setLineDisplaced()
      }
      this.isImageLeftOK = true
      // this.imageLeft.createParticles( 2 + random() * 2, 20 + random() * 8 >> 0, 26 + random() * 8 )
      // this.imageLeft.setParticlesPositions( 3, 0, 40 )
    } else {
      let mat = new THREE.MeshBasicMaterial( {
        color: this.sequence.colorsBlocs.get()
      })
      this.imageLeft = new VZVSMesh( dataImageLeft, mat, false, true )
      percentLuck = 1.5
    }
    this.imageLeft.__positionZ = this.imageLeft.position.z
    this.imageLeft.__ratio = -1
    this.add( this.imageLeft )
    this.elementsToMoveZ.push( this.imageLeft )

    const dataImageRight = {
      x: 9, y: 0, width: 8, height: 8
    }
    if( random() < .65 * percentLuck ) {
      this.imageRight = new PictureParticular( this.getNewImage(), dataImageRight )
      this.imageRight.createParticles( 2 + random() * 1, 16 + random() * 10, 16 + random() * 10 )
      this.imageRight.setParticlesPositions( 0, 0, 60 )
      if( random() < .25 ) {
        this.imageRight.picture.setLineDisplaced()
      }
      this.isImageRightOK = true
      percentLuck = 1
    } else {
      let mat = new THREE.MeshBasicMaterial( {
        color: this.sequence.colorsBlocs.get()
      })
      this.imageRight = new VZVSMesh( dataImageRight, mat, false, true )

      if( percentLuck == 1.5 ) {
        percentLuck = 4
      }
    }
    this.imageRight.__positionZ = this.imageRight.position.z
    this.imageRight.__ratio = -1
    this.add( this.imageRight )
    this.elementsToMoveZ.push( this.imageRight )

    const dataImageTopRight = {
      x: 9, y: 9, width: 8, height: 7
    }
    if( random() < .65 * percentLuck ) {
      this.imageTopRight = new PictureParticular( this.getNewImage(), dataImageTopRight )
      this.imageTopRight.createParticles( 1 + random() * .7, 15 + random() * 8 >> 0, 15 + random() * 8 )
      this.imageTopRight.setParticlesPositions( -2, 0, 80 )
      if( random() < .25 ) {
        this.imageTopRight.picture.setLineDisplaced()
      }
      this.isImageTopRightOK = true
    } else {
      let mat = new THREE.MeshBasicMaterial( {
        color: this.sequence.colorsBlocs.get()
      })
      this.imageTopRight = new VZVSMesh( dataImageTopRight, mat, false, true )
    }
    this.imageTopRight.__positionZ = this.imageTopRight.position.z
    this.imageTopRight.__ratio = 1
    this.add( this.imageTopRight )
    this.elementsToMoveZ.push( this.imageTopRight )

    let dataSign = {
      x: 2, y: 12, width: 4, height: 4
    }
    let sign = new SignRandomSerie( dataSign )
    sign.position.z = 20
    sign.setColor( this.sequence.colorsShapes.get() )
    sign.start()
    this.add( sign )
    this.signs.push( sign )

    if( random() < .5 ) {
      let mat = new THREE.MeshBasicMaterial( {
        color: this.sequence.colorsBlocs.get(),
        transparent: true,
        opacity: .2,
      })
      const dataImageLongRight = {
        x: 10, y: -2, width: 2, height: 20
      }
      this.imageLongRight = new VZVSMesh( dataImageLongRight, mat, false, true )
      this.imageLongRight.position.z = 20
      this.imageLongRight.__positionZ = this.imageLongRight.position.z
      this.add( this.imageLongRight )
      this.elementsToMoveZ.push( this.imageLongRight)
    }

    let x = 0
    let y = 0
    for( let i = 0, n = 2; i < n; i++ ) {
      for( let j = 0, m = 6; j < m; j++ ) {
        let size = random() < .1 ? 2 : 1
        let dataSign = {
          x: x, y: y, width: size, height: size
        }

        if( random() < .85 ) {
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
        // if( j == 1 ) {
        //   x += 6
        // } else {
          x += 3
        // }
      }
      y += 3
      x = 3
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
    if( this.isImageLeftOK ) this.imageLeft.picture.reset()
    if( this.isImageRightOK ) this.imageRight.picture.reset()
    if( this.isImageTopRightOK ) this.imageTopRight.picture.reset()
  }

  onDialGreen = () => {
    if( this.isImageLeftOK ) this.imageLeft.picture.setGranularityY( this.dialGreen.percent * 200 >> 0 )
    if( this.isImageRightOK ) this.imageRight.picture.setGranularityY( this.dialGreen.percent * 200 >> 0 )
    if( this.isImageTopRightOK ) this.imageTopRight.picture.setGranularityY( this.dialGreen.percent * 200 >> 0 )
  }

  onDialYellow = () => {
    if( this.isImageLeftOK ) this.imageLeft.picture.setGranularityX( this.dialYellow.percent * 200 >> 0 )
    if( this.isImageRightOK ) this.imageRight.picture.setGranularityX( this.dialYellow.percent * 200 >> 0 )
    if( this.isImageTopRightOK ) this.imageTopRight.picture.setGranularityX( this.dialYellow.percent * 200 >> 0 )
  }

  onDialPurple = () => {
    if( this.isImageLeftOK ) this.imageLeft.picture.setOffsetX( this.dialPurple.percent )
    if( this.isImageRightOK ) this.imageRight.picture.setOffsetX( this.dialPurple.percent )
    if( this.isImageTopRightOK ) this.imageTopRight.picture.setOffsetX( this.dialPurple.percent )
  }

  onDialCyan = () => {
    if( this.isImageLeftOK ) this.imageLeft.picture.setOffsetY( this.dialCyan.percent )
    if( this.isImageRightOK ) this.imageRight.picture.setOffsetY( this.dialCyan.percent )
    if( this.isImageTopRightOK ) this.imageTopRight.picture.setOffsetY( this.dialCyan.percent )
  }

  onButtonGreen = ( ) => {
    if( this.buttonGreen.state == "released" ) {
      this.isAutoDispLevel = !this.isAutoDispLevel
      if( !this.isAutoDispLevel ) {
        if( this.isImageLeftOK ) this.imageLeft.picture.setDisplacementLevel( 0 )
        if( this.isImageRightOK ) this.imageRight.picture.setDisplacementLevel( 0 )
        if( this.isImageTopRightOK ) this.imageTopRight.picture.setDisplacementLevel( 0 )
      }
    }
  }

  onButtonBlue = () => {
    if( this.customFI == 100 ) {
      this.customFI = -25
    }
    this.customFI += 25
    if( this.isImageLeftOK ) this.imageLeft.picture.setCustomFI( this.customFI )
    if( this.isImageRightOK ) this.imageRight.picture.setCustomFI( this.customFI )
    if( this.isImageTopRightOK ) this.imageTopRight.picture.setCustomFI( this.customFI )
  }

  onSliderBlue = () => {
    if( this.isImageLeftOK ) this.imageLeft.picture.setDisplacementLevel( this.sliderBlue.percent )
    if( this.isImageRightOK ) this.imageRight.picture.setDisplacementLevel( this.sliderBlue.percent )
    if( this.isImageTopRightOK ) this.imageTopRight.picture.setDisplacementLevel( this.sliderBlue.percent )
    this.isImageSwirling = this.sliderBlue.percent > .05
  }

  onSliderGreen = () => {
    if( this.isImageLeftOK ) this.imageLeft.picture.setDepthValue( this.sliderGreen.percent )
    if( this.isImageRightOK ) this.imageRight.picture.setDepthValue( this.sliderGreen.percent )
    if( this.isImageTopRightOK ) this.imageTopRight.picture.setDepthValue( this.sliderGreen.percent )
  }

  applyStandardBeatActions() {
    if( vjVars.picture.canAutoGranularityX && random() < .5 ) {
      if( this.isImageLeftOK ) this.imageLeft.picture.setGranularityX( random() * 200 >> 0 )
      if( this.isImageRightOK ) this.imageRight.picture.setGranularityX( random() * 200 >> 0 )
      if( this.isImageTopRightOK ) this.imageTopRight.picture.setGranularityX( random() * 200 >> 0 )
    }
    if( vjVars.picture.canAutoGranularityY && random() < .5 ) {
      if( this.isImageLeftOK ) this.imageLeft.picture.setGranularityY( random() * 200 >> 0 )
      if( this.isImageRightOK ) this.imageRight.picture.setGranularityY( random() * 200 >> 0 )
      if( this.isImageTopRightOK ) this.imageTopRight.picture.setGranularityY( random() * 200 >> 0 )
    }
  }

  applyBigBeatActions() {
    if( vjVars.picture.canAutoUpdate ) {
      if( this.isImageLeftOK ) this.imageLeft.picture.swirl( true )
      if( this.isImageRightOK ) this.imageRight.picture.swirl( true )
      if( this.isImageTopRightOK ) this.imageTopRight.picture.swirl( true )
    }

    if( vjVars.picture.canAutoSwirl ) {
      if( this.isImageLeftOK ) this.imageLeft.picture.setDisplacementLevel( random() )
      if( this.isImageRightOK ) this.imageRight.picture.setDisplacementLevel( random() )
      if( this.isImageTopRightOK ) this.imageTopRight.picture.setDisplacementLevel( random() )
    }
  }

  update() {
    if( this.isAutoDispLevel ) {
      if( this.isImageLeftOK ) this.imageLeft.picture.setDisplacementLevel( audio.values[ 0 ] )
      if( this.isImageRightOK ) this.imageRight.picture.setDisplacementLevel( audio.values[ 0 ] )
      if( this.isImageTopRightOK ) this.imageTopRight.picture.setDisplacementLevel( audio.values[ 0 ] )
    }

    if( !vjVars.picture.canAutoUpdate ) {
      return
    }
    if( this.isImageLeftOK ) this.imageLeft.picture.swirl()
    if( this.isImageRightOK ) this.imageRight.picture.swirl()
    if( this.isImageTopRightOK ) this.imageTopRight.picture.swirl()
  }

  setStyle( id ) {
    super.setStyle( id )
    if( this.isImageLeftOK ) {
      this.imageLeft.setStyle( id )
    } else {
      this.imageLeft.material.color.set( this.sequence.colorsBlocs.get() )
    }
    if( this.isImageRightOK ) {
      this.imageRight.setStyle( id )
    } else {
      this.imageRight.material.color.set( this.sequence.colorsBlocs.get() )
    }
    if( this.isImageTopRightOK ) {
      this.imageTopRight.setStyle( id )
    } else {
      this.imageTopRight.material.color.set( this.sequence.colorsBlocs.get() )
    }
  }

  dispose() {
    this.buttonBlue.onAction.remove( this.onButtonBlue )
    this.dialGreen.onPercentChange.remove( this.onDialGreen )
    this.dialYellow.onPercentChange.remove( this.onDialYellow )
    this.dialPurple.onPercentChange.remove( this.onDialPurple )
    this.dialCyan.onPercentChange.remove( this.onDialCyan )

    this.imageLeft.dispose()
    this.imageRight.dispose()
    this.imageTopRight.dispose()
    if( this.imageLongRight ) {
      this.imageLongRight.dispose()
    }

    super.dispose()
  }



}

module.exports = FrameTriple
