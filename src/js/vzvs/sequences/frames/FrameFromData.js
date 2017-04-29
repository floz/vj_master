const random = require( "mnf/utils/random" )
const midi = require( "mnf/midi/midi" )
// const audio = require( "mnf/core/audio2" )
const audio = require( "mnf/core/audio" )
const uMath = require( "mnf/utils/maths" )

const textures = require( "vj/textures" )

const vjVars = require( "vzvs/core/vjVars" )
const data = require( "vzvs/core/data" )
const VZVSMesh = require( "vzvs/core/VZVSMesh" )
const Picture = require( "vzvs/picparts/Picture" )
const PictureParticular = require( "vzvs/picparts/PictureParticular" )
const SignsCircleSerie = require( "vzvs/sequences/signs/SignsCircleSerie" )
const SignCross = require( "vzvs/sequences/signs/SignCross" )
const SignRandomSerie = require( "vzvs/sequences/signs/SignRandomSerie" )

const frameStructures = require( "./frameStructures" )
const Frame = require( "./Frame" )

class FrameFromData extends Frame {

  constructor( dataStructure, idAssets ) {
    super( idAssets )

    this.idAssets = idAssets

    this.pictures = []
    this.meshs = []
    this.elementsToStyle = []
    this.elementsToDispose = []
    this.elementsCanMove = []
    this.targetsSliders = {}
    this.targetsDials = {}
    this.targetsButtons = {}

    this.dataStructure = dataStructure
    this.createFrame()
    this.createSigns()

    this.beatsCountToNextMove = 0
    this.beatsBeforeNextMove = 3

    vjVars.onReset.add( this.onReset )
  }

  createFrame() {
    const elements = this.dataStructure.elements
    for( let i = 0, n = elements.length; i < n; i++ ) {
      let element = elements[ i ]
      this[ "create" + element.type ]( element )
    }
  }

  createPictureParticular( data ) {
    const pp = new PictureParticular( this.getNewImage(), data.frame )
    pp.position.z = data.z
    pp.__positionZ = pp.position.z
    if( data.particles.has ) {
      const dp = data.particles
      pp.createParticles( dp.sizeMin + random() * dp.sizeRange, dp.spaceXMin + random() * dp.spaceXRange, dp.spaceYMin + random() * dp.spaceYRange )
      pp.setParticlesPositions( dp.xMin + random() * dp.xRange, dp.yMin + random() * dp.yRange, dp.z || 0 )
    }
    if( data.hasLineDisplacement ) {
      pp.picture.setLineDisplaced()
    }
    if( data.isMovingWithSound ) {
      this.elementsToMoveZ.push( pp )
    }
    this.add( pp )

    this.pictures.push( pp.picture )
    this.elementsToDispose.push( pp )
    this.elementsToStyle.push( pp )

    if( data.controllers ) {
      for( let i = 0, n = data.controllers.length; i < n; i++ ) {
        let controller = data.controllers[ i ]
        if( controller.type == "slider" ) {
          this.plugToSlider( pp, controller.color )
        } else if ( controller.type == "dial" ) {
          this.plugToDial( pp, controller.color )
        } else if ( controller.type == "button" ) {
          this.plugToButton( pp, controller.color )
        }
      }
    }

    if( data.canMove ) {
      this.elementsCanMove.push( pp )
      pp.__moveTo = data.canMove.to
    }
  }

  plugToSlider( target, idColor ) {
    this.targetsSliders[ idColor ] = target
    const p = this.targetsSliders[ idColor ].picture ? this.targetsSliders[ idColor ].picture : this.targetsSliders[ idColor ]
    p.setDisplacementLevel( midi.pg.sliders[ idColor ].percent )
    midi.pg.sliders[ idColor ].onPercentChange.add( this.onSliderChange )
  }

  plugToDial( target, idColor ) {
    this.targetsDials[ idColor ] = target
    const p = this.targetsDials[ idColor ].picture ? this.targetsDials[ idColor ].picture : this.targetsDials[ idColor ]
    p.setOffsetX( midi.pg.dials[ idColor ].percent )
    midi.pg.dials[ idColor ].onPercentChange.add( this.onDialChange )
  }

  plugToButton( target, idColor ) {
    this.targetsButtons[ idColor ] = target
    const p = target.picture ? target.picture : target
    p.__granularity = 0
    p.setGranularityX( p.__granularity )
    p.setGranularityY( p.__granularity )
    midi.pg.buttons[ idColor ].onAction.add( this.onButtonAction )
  }

  onSliderChange = ( value, idColor ) => {
    const p = this.targetsSliders[ idColor ].picture ? this.targetsSliders[ idColor ].picture : this.targetsSliders[ idColor ]
    p.setDisplacementLevel( value )
  }

  onDialChange = ( value, idColor ) => {
    const p = this.targetsDials[ idColor ].picture ? this.targetsDials[ idColor ].picture : this.targetsDials[ idColor ]
    p.setOffsetX( value )
  }

  onButtonAction = ( value, idColor ) => {
    if( value != "released" ) {
      return
    }
    const p = this.targetsButtons[ idColor ].picture ? this.targetsButtons[ idColor ].picture : this.targetsButtons[ idColor ]
    p.__granularity += 10
    if( p.__granularity >= 50 ) {
      p.__granularity = 0
    }
    p.setGranularityX( p.__granularity )
    p.setGranularityY( p.__granularity )
  }

  createVZVSMesh( data ) {
    const mat = new THREE.MeshBasicMaterial( {
      color: this.sequence.colorsBlocs.get(),
      transparent: false
    } )
    const vm = new VZVSMesh( data.frame, mat, false, true )
    vm.__positionZ = data.z
    vm.position.z = data.z
    this.add( vm )

    this.elementsToDispose.push( vm )
    this.meshs.push( vm )

    if( data.canMove ) {
      this.elementsCanMove.push( vm )
      vm.__moveTo = data.canMove.to
    }
  }

  createPicture( data ) {
    const p = new Picture( this.getNewImage( !data.hasLineDisplacement ), data.frame )
    if( data.z ) {
      p.mesh.position.z = data.z
      p.mesh.__positionZ = data.z
    }
    if( data.hasLineDisplacement ) {
      p.setLineDisplaced()
    }
    if( data.isMovingWithSound ) {
      this.elementsToMoveZ.push( p.mesh )
    }
    this.add( p.mesh )

    this.pictures.push( p )
    this.elementsToDispose.push( p )
    this.elementsToStyle.push( p )

    if( data.canMove ) {
      this.elementsCanMove.push( p )
      p.__moveTo = data.canMove.to
    }
  }

  createSigns() {
    const datasSigns = this.dataStructure.signs
    for( let i = 0, n = datasSigns.length; i < n; i++ ) {
      let dataSigns = datasSigns[ i ]
      if( dataSigns.type == "set" ) {
        this.createSignsSet( dataSigns )
      } else {
        this.createSignsUnique( dataSigns )
      }
    }
  }

  createSignsSet( data ) {
    let x = data.x
    let y = data.y
    for( let i = 0, n = data.lines; i < n; i++ ) {
      for( let j = 0, m = data.cols; j < m; j++ ) {
        let size = random() < data.sizes.rnd ? data.sizes.max : data.sizes.min
        let frame = {
          x: x, y: y, width: size, height: size
        }

        if( random() < data.rndVisible ) {
          let sign = this.getSign( frame, data )
          sign.position.z = data.z
          sign.__positionZ = sign.position.z
          sign.setColor( this.sequence.colorsShapes.get() )
          sign.start()
          this.add( sign )

          this.signs.push( sign )
        }
        x += data.xStep
      }
      y += data.yStep
      x = data.x
    }
  }

  createSignsUnique( data ) {
    if( random() < data.rndVisible ) {
      return
    }
    let size = random() < data.sizes.rnd ? data.sizes.max : data.sizes.min
    let frame = {
      x: data.x, y: data.y, width: size, height: size
    }

    let sign = this.getSign( frame, data )
    sign.position.z = data.z
    sign.__positionZ = sign.position.z
    sign.setColor( this.sequence.colorsShapes.get() )
    sign.start()
    this.add( sign )

    this.signs.push( sign )
  }

  getSign( frame, data ) {
    if( random() < .25 ) {
      return sign = new SignsCircleSerie( frame, data.hasEmpty )
    } else if( random() < .5 ) {
      return sign = new SignRandomSerie( frame, data.hasEmpty )
    } else {
      return sign = new SignCross( frame, data.hasEmpty )
    }
  }

  onReset = () => {
    this.customFI = 0
    this.isAutoDispLevel = false

    for( let i = 0, n = this.pictures.length; i < n; i++ ) {
      this.pictures[ i ].reset()
    }
  }

  applyStandardBeatActions() {
    for( let i = 0, n = this.pictures.length; i < n; i++ ) {
      let picture = this.pictures[ i ]
      if( picture.hasDisplacedLine ) {
        picture.setLineDisplaced( true )
      }
    }

    if( vjVars.picture.canAutoGranularityX && random() < .5 ) {
      for( let i = 0, n = this.pictures.length; i < n; i++ ) {
        let picture = this.pictures[ i ]
        picture.setGranularityX( random() * 200 >> 0 )
      }
    }
    if( vjVars.picture.canAutoGranularityY && random() < .5 ) {
      for( let i = 0, n = this.pictures.length; i < n; i++ ) {
        let picture = this.pictures[ i ]
        picture.setGranularityY( random() * 200 >> 0 )
      }
    }
  }

  applyBigBeatActions() {
    if( vjVars.picture.canAutoUpdate ) {
      for( let i = 0, n = this.pictures.length; i < n; i++ ) {
        let picture = this.pictures[ i ]
        picture.swirl( true )
      }
    }

    if( vjVars.picture.canAutoSwirl ) {
      for( let i = 0, n = this.pictures.length; i < n; i++ ) {
        let picture = this.pictures[ i ]
        picture.setDisplacementLevel( random() )
      }
    }

    this.beatsCountToNextMove++
    if( this.beatsCountToNextMove > this.beatsBeforeNextMove ) {
      this.moveElements()
      this.beatsCountToNextMove = 0
    }
  }

  moveElements() {
    for( let i = 0, n = this.elementsCanMove.length; i < n; i++ ) {
      this.elementsCanMove[ i ].moveTo()
    }
  }

  update() {
    // return
    // for( let i = 0, n = this.pictures.length; i < n; i++ ) {
    //   let picture = this.pictures[ i ]
    //   picture.coefDisplacement = random() * 4 - 2
    // }

    // ??
    // let coef = uMath.remap( audio.values[ 5 ], 0, 1, -1, 1 )
    let coef = uMath.remap( audio.volume, 0, 1, -1, 1 )
    // let coef = uMath.remap( audio.volume, 0, 1, -1, 1 )
    for( let i = 0, n = this.pictures.length; i < n; i++ ) {
      let picture = this.pictures[ i ]
      picture.coefDisplacement = coef
    }
    // console.log( audio.values[ 1 ] )

    if( this.isAutoDispLevel ) {
      for( let i = 0, n = this.pictures.length; i < n; i++ ) {
        let picture = this.pictures[ i ]
        // picture.setDisplacementLevel( audio.values[ 1 ] )
        picture.setDisplacementLevel( audio.volume )
      }
    }

    if( !vjVars.picture.canAutoUpdate ) {
      return
    }
    for( let i = 0, n = this.pictures.length; i < n; i++ ) {
      let picture = this.pictures[ i ]
      picture.swirl()
    }
  }

  setStyle( id ) {
    super.setStyle( id )

    for( let i = 0, n = this.elementsToStyle.length; i < n; i++ ) {
      this.elementsToStyle[ i ].setStyle( this.getNewImage() )
    }
    for( let i = 0, n = this.meshs.length; i < n; i++ ) {
      this.meshs[ i ].material.color.set( this.sequence.colorsBlocs.get() )
    }
  }

  dispose() {
    // this.buttonBlue.onAction.remove( this.onButtonBlue )
    // this.dialGreen.onPercentChange.remove( this.onDialGreen )
    // this.dialYellow.onPercentChange.remove( this.onDialYellow )
    // this.dialPurple.onPercentChange.remove( this.onDialPurple )
    // this.dialCyan.onPercentChange.remove( this.onDialCyan )

    for( let c in this.targetsSliders ) {
      midi.pg.sliders[ c ].onPercentChange.remove( this.onSliderChange )
    }
    for( let c in this.targetsDials ) {
      midi.pg.dials[ c ].onPercentChange.remove( this.onDialChange )
    }
    for( let c in this.targetsButtons ) {
      midi.pg.buttons[ c ].onAction.remove( this.onButtonAction )
    }

    for( let i = 0, n = this.elementsToDispose.length; i < n; i++ ) {
      this.elementsToDispose[ i ].dispose()
    }

    super.dispose()
  }

}

module.exports = FrameFromData
