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

class FrameRight extends Frame {

  constructor( id ) {
    super( id )

    const dataImageRight = {
      x: 4, y: 6, width: 10, height: 12
    }
    this.imageRight = new PictureParticular( this.getNewImage(), dataImageRight )
    const r = random() * 10
    this.imageRight.createParticles( 1.25 + random() * 1, 12 + r, 12 + r )
    this.imageRight.setParticlesPositions( 0, 0, 80 )
    this.add( this.imageRight )

    const dataA = {
      x: 2, y: 5, width: 12, height: 3
    }
    const dataB = {
      x: 2, y: -2, width: 4, height: 20
    }
    this.matSquareLeftRight = new THREE.MeshBasicMaterial( {
      color: this.sequence.colorsBlocs.get()
    })

    let hasLeftRightTransparent = false

    let dataImageBg = null
    let dataSquareLeftRight = null
    let zImageBg = 0
    let zSquareLeftRight = 0
    if( random() < .5 ) {
      dataImageBg = dataA
      dataSquareLeftRight = dataB
      zImageBg = 20
      zSquareLeftRight = -40

    } else {
      dataImageBg = dataB
      dataSquareLeftRight = dataA
      zImageBg = -40
      zSquareLeftRight = 20

      hasLeftRightTransparent = random() < .5
      if( hasLeftRightTransparent ) {
        this.matSquareLeftRight.transparent = true
        this.matSquareLeftRight.opacity = .9
      }
    }
    this.imageBg = new Picture( this.getNewImage(), dataImageBg )
    this.imageBg.mesh.position.z = zImageBg
    this.imageBg.setLineDisplaced()
    this.imageBg.mesh.__positionZ = zImageBg
    this.imageBg.mesh.__ratio = zImageBg < 0 ? -1 : 1.5
    this.add( this.imageBg.mesh )
    this.elementsToMoveZ.push( this.imageBg.mesh )

    this.squareLeftRight = new VZVSMesh( dataSquareLeftRight, this.matSquareLeftRight, false, true )
    this.squareLeftRight.position.z = zSquareLeftRight
    this.squareLeftRight.__positionZ = this.squareLeftRight.position.z
    this.squareLeftRight.__ratio = zSquareLeftRight < 0 ? -1 : 1
    this.add( this.squareLeftRight )
    this.elementsToMoveZ.push( this.squareLeftRight )

    const dataSquareRight = {
      x: 12, y: 3, width: 5, height: 9
    }
    this.matSquareRight = new THREE.MeshBasicMaterial( {
      color: this.sequence.colorsBlocs.get()
    })
    if( !hasLeftRightTransparent ) {
      this.matSquareRight.transparent = true
      this.matSquareRight.blending = THREE.AdditiveBlending
      this.matSquareRight.opacity = .5
    }
    this.squareRight = new VZVSMesh( dataSquareRight, this.matSquareRight )
    this.squareRight.position.z = 10
    this.squareRight.__positionZ = 10
    this.add( this.squareRight )
    this.elementsToMoveZ.push( this.squareRight )

    let x = -1
    let y = -1
    for( let i = 0, n = 4; i < n; i++ ) {
      for( let j = 0, m = 4; j < m; j++ ) {
        let dataSign = {
          x: x, y: y, width: 4, height: 4
        }

        if( random() < .5 ) {
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
    this.imageRight.picture.reset()
  }

  onDialGreen = () => {
    this.imageRight.picture.setGranularityY( this.dialGreen.percent * 200 >> 0 )
  }

  onDialYellow = () => {
    this.imageRight.picture.setGranularityX( this.dialYellow.percent * 200 >> 0 )
  }

  onDialPurple = () => {
    this.imageRight.picture.setOffsetX( this.dialPurple.percent )
  }

  onDialCyan = () => {
    this.imageRight.picture.setOffsetY( this.dialCyan.percent )
  }

  onButtonGreen = ( ) => {
    if( this.buttonGreen.state == "released" ) {
      this.isAutoDispLevel = !this.isAutoDispLevel
      if( !this.isAutoDispLevel ) {
        this.imageRight.picture.setDisplacementLevel( 0 )
      }
    }
  }

  onButtonBlue = () => {
    if( this.customFI == 100 ) {
      this.customFI = -25
    }
    this.customFI += 25
    this.imageRight.picture.setCustomFI( this.customFI )
  }

  onSliderBlue = () => {
    this.imageRight.picture.setDisplacementLevel( this.sliderBlue.percent )
    this.isImageSwirling = this.sliderBlue.percent > .05
  }

  onSliderGreen = () => {
    this.imageRight.picture.setDepthValue( this.sliderGreen.percent )
  }

  applyStandardBeatActions() {
    if( vjVars.picture.canAutoGranularityX && random() < .5 ) {
      this.imageRight.picture.setGranularityX( random() * 200 >> 0 )
    }
    if( vjVars.picture.canAutoGranularityY && random() < .5 ) {
      this.imageRight.picture.setGranularityY( random() * 200 >> 0 )
    }
  }

  applyBigBeatActions() {
    if( vjVars.picture.canAutoUpdate ) {
      this.imageRight.picture.swirl( true )
    }

    if( vjVars.picture.canAutoSwirl ) {
      this.imageRight.picture.setDisplacementLevel( random() )
    }
  }

  update() {
    this.imageBg.swirl()

    if( this.isAutoDispLevel ) {
      this.imageRight.picture.setDisplacementLevel( audio.values[ 0 ] )
    }

    if( !vjVars.picture.canAutoUpdate ) {
      return
    }
    this.imageRight.picture.swirl()
  }

  setStyle( id ) {
    super.setStyle( id )

    this.imageBg.setStyle( id )
    this.imageRight.setStyle( id )
    this.squareLeftRight.material.color.set( this.sequence.colorsBlocs.get() )
    this.squareRight.material.color.set( this.sequence.colorsBlocs.get() )
  }

  dispose() {
    this.buttonBlue.onAction.remove( this.onButtonBlue )
    this.dialGreen.onPercentChange.remove( this.onDialGreen )
    this.dialYellow.onPercentChange.remove( this.onDialYellow )
    this.dialPurple.onPercentChange.remove( this.onDialPurple )
    this.dialCyan.onPercentChange.remove( this.onDialCyan )

    this.imageBg.dispose()
    this.imageRight.dispose()
    this.squareLeftRight.dispose()
    this.squareRight.dispose()

    super.dispose()
  }

}

module.exports = FrameRight
