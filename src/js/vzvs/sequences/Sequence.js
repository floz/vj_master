const stage3d = require( "mnf/core/stage3d" )
// const audio = require( "mnf/core/audio2" )
const audio = require( "mnf/core/audio" )

const data = require( "vzvs/core/data" )
const sequences = require( "vzvs/core/sequences" )
const frames = require( "vzvs/core/frames" )
const vjVars = require( "vzvs/core/vjVars" )

const Grid = require( "./Grid" )
const GridFrames = require( "./GridFrames" )
const LayerBlocs = require( "./LayerBlocs" )
const LayerImages = require( "./LayerImages" )
const LayerShapes = require( "./LayerShapes" )

const FrameMiddle = require( "./frames/FrameMiddle" )
const FrameMiddleNew = require( "./frames/FrameMiddleNew" )
const FrameRightNew = require( "./frames/FrameRightNew" )
const FrameLeftNew = require( "./frames/FrameLeftNew" )
const FrameFat = require( "./frames/FrameFat" )
const FrameDouble = require( "./frames/FrameDouble" )
const FrameDoubleBis = require( "./frames/FrameDoubleBis" )
const FrameTriple = require( "./frames/FrameTriple" )
const FrameTripleNew = require( "./frames/FrameTripleNew" )
const FrameSoloBigSquares = require( "./frames/FrameSoloBigSquares" )
const FrameTripleBordel = require( "./frames/FrameTripleBordel" )
const FrameMultiple = require( "./frames/FrameMultiple" )
const FrameMultipleVariante = require( "./frames/FrameMultipleVariante" )
const FrameTripleLine = require( "./frames/FrameTripleLine" )
const FrameWTF = require( "./frames/FrameWTF" )

const random = require( "mnf/utils/random" )

let IDX_FRAME = 0

class Sequence {

  constructor() {
    this.idCurrent = sequences.ids[ 0 ]

    this.idxFrame = 0
    this.cFrames = [
      FrameTripleNew,
      FrameMiddleNew,
      FrameLeftNew,
      FrameRightNew,
      FrameDouble,
      FrameDoubleBis,
      FrameSoloBigSquares,
      FrameTripleBordel,
      FrameMultiple,
      FrameMultipleVariante,
      FrameTripleLine,
      FrameWTF
    ]

    this.frame = new FrameWTF( this.idCurrent )
    stage3d.add( this.frame )

    this.beatsCurrent = 0
    this.beatsBeforeNextFrame = 4

    this.beatsStyleCurrent = 0
    this.beatsBeforeNextStyle = 2

    // audio.onBigBeat.add( this.onBigBeat )
    audio.onBeat.add( this.onBigBeat )
    vjVars.onChangeFrame.add( this.onChangeFrame )
    vjVars.onChangeStyle.add( this.onChangeStyle )
  }

  onChangeFrame = () => {
    this.nextFrame()
  }

  onChangeStyle = () => {
    this.nextStyle()
  }

  onBigBeat = () => {
    this.beatsCurrent++
    if( vjVars.sequence.autoChangeFrame && this.beatsCurrent > this.beatsBeforeNextFrame ) {
      this.nextFrame()
    }

    this.beatsStyleCurrent++
    if( vjVars.sequence.autoChangeStyle && this.beatsStyleCurrent > this.beatsBeforeNextStyle ) {
      this.nextStyle()
    }
  }

  nextFrame() {
    this.beatsCurrent = 0
    this.beatsBeforeNextFrame = 2 + random() * 8 >> 0

    TweenLite.killTweensOf( stage3d.control )
    if( vjVars.sequence.autoChangeCameraPos ) {
      const toPhi = Math.PI * .5 + Math.PI * ( Math.random() * .2 - .1 )
      const toTheta = Math.PI * .5 + Math.PI * ( Math.random() * .2 - .1 )
      TweenLite.to( stage3d.control, 1.5, {
        _phi: toPhi,
        _theta: toTheta,
        ease: Power4.easeOut
      })
    }

    stage3d.remove( this.frame )
    this.frame.dispose()

    this.idxFrame += 1
    if( this.idxFrame > this.cFrames.length -1 ) {
      this.idxFrame = 0
    }
    this.frame = new this.cFrames[ this.idxFrame ]( this.idCurrent )
    this.frame.onUpdate()
    stage3d.add( this.frame )
  }

  nextStyle() {
    this.beatsStyleCurrent = 0
    this.idCurrent = sequences.ids[ sequences.ids.length * random() >> 0 ]
    this.frame.setStyle( this.idCurrent )

    TweenLite.killTweensOf( stage3d.control )
    if( vjVars.sequence.autoChangeCameraPos ) {
      stage3d.control._phi = Math.PI * .5 + Math.PI * ( Math.random() * .2 - .1 )
      stage3d.control._theta = Math.PI * .5 + Math.PI * ( Math.random() * .2 - .1 )
    }

    // stage3d.control._phi = Math.PI * .5 + Math.PI * ( Math.random() * .2 - .1 )
    // stage3d.control._theta = Math.PI * .5 + Math.PI * ( Math.random() * .2 - .1 )
  }

  dispose() {
    stage3d.remove( this.frame )
    this.frame.dispose()

    audio.onBigBeat.remove( this.onBigBeat )
    vjVars.onChangeFrame.remove( this.onChangeFrame )
    vjVars.onChangeStyle.remove( this.onChangeStyle )
  }

}

module.exports = Sequence
