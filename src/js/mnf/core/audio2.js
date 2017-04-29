const stage = require( "mnf/core/stage" )
const uDom = require( "mnf/utils/dom" )
const Signal = require( "mnf/events/Signal" )

const H_CANVAS = 200
const MARGIN = 5
const W_BAR = 50
const H_BAR = H_CANVAS - MARGIN * 2
const SPACE_BAR = 1

class Audio {

  constructor() {
    this.audioContext = new AudioContext()
    this.masterGain = this.audioContext.createGain()
    this.fftSize = 512

    this.audioRange = 11
    // this.audioAmp = 9
    // this.audioIndex = .26
    // this.audioIndexStep = .02
    this.audioAmp = 3
    this.audioIndex = .5
    this.audioIndexStep = 1.2

    this.values = []
    this.base = 0
    this.snare = 0

    this.onBigBeat = new Signal()
    this.onStandardBeat = new Signal()

    this.showPreview = false

    this.standardBeatValue = .65
    this.bigBeatValue = .85

    this.canDispatchBigBeat = true
    this.canDispatchStandardBeat = true
    this.delayBetween2Beats = 10
    this.timeSinceLastStandardBeat = 0
    this.timeSinceLastBigBeat = 0

    this.isContrained = false
  }

  start( { live = true, analyse = true } = {} ) {
    if( !live ) {
      return
    }
    this.startLive()
    if( analyse ) {
      this.startAnalysing()
    }
  }

  startLive() {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia
    navigator.getUserMedia( { audio: true, video: false }, ( stream ) => {
      const mediaStream = this.audioContext.createMediaStreamSource( stream )
      const tracks = stream.getAudioTracks()
      mediaStream.connect( this.masterGain )
    }, ( e ) => {
      console.log( "Audio ~ Stream fail!", e )
    } )
  }

  startAnalysing() {
    this.analyser = this.audioContext.createAnalyser()
    this.analyser.smoothingTimeConstant = .3
    this.analyser.fftSize = this.fftSize

    this.binCount = this.analyser.frequencyBinCount
    this.levelBins = Math.floor( this.binCount / this.audioRange )

    // this.freqByteData = new Uint8Array( this.binCount )
    // this.timeByteData = new Uint8Array( this.binCount )
    this.freqByteData = new Uint8Array( this.binCount )
    this.byteTimeData = new Uint8Array( this.binCount )

    if( this.showPreview ) {
      this.canvas = document.createElement( "canvas" )
      this.canvas.width = this.audioRange * W_BAR + ( this.audioRange - 1 ) * SPACE_BAR + MARGIN * 2
      this.canvas.height = H_CANVAS
      this.ctx = this.canvas.getContext( "2d" )
      uDom.addAbsolute( this.canvas )
    }

    this.masterGain.connect( this.analyser )

    stage.onUpdate.add( this.onUpdate )
  }

  onUpdate = ( dt ) => {
    this.analyser.getByteFrequencyData( this.freqByteData )
		this.analyser.getByteTimeDomainData( this.byteTimeData )
    // console.log( this.byteTimeData, this.byteTimeData[ 0 ] )

    if( this.showPreview ) {
      this.ctx.fillStyle = "#444444"
      this.ctx.fillRect( 0, 0, this.canvas.width, this.canvas.height )
      this.ctx.beginPath()
    }

    let audioIndexAmp = this.audioIndex

    let x = MARGIN
    for( let i = 0; i < this.audioRange; i++ ) {
      let value = this.getAverage( i )
      value = ( value * this.audioAmp ) * audioIndexAmp
      if( this.isContrained ) {
        value = Math.min( value, 256 )
      }
      value /= 255

      let h = H_BAR * value
      this.values[ i ] = value

      if( this.showPreview ) {
        if( i == 2 ) {
          this.ctx.fillStyle = "#00ff00"
        } else {
          this.ctx.fillStyle = "#cccccc"
        }

        this.ctx.fillRect( x, H_CANVAS - MARGIN, W_BAR, -h )
        x += W_BAR + SPACE_BAR
      }

      audioIndexAmp += this.audioIndexStep
    }

    this.base = this.values[ 0 ]
    this.snare = this.values[ 2 ]

    this.timeSinceLastBigBeat++
    if( this.canDispatchBigBeat && this.snare > this.bigBeatValue && this.timeSinceLastBigBeat > this.delayBetween2Beats ) {
      this.onBigBeat.dispatch()
      this.timeSinceLastBigBeat = 0
      this.canDispatchBigBeat = false
    } else {
      if( this.snare < this.bigBeatValue ) {
        this.canDispatchBigBeat = true
      }
    }

    this.timeSinceLastStandardBeat++
    if( this.snare > this.standardBeatValue && this.timeSinceLastStandardBeat > this.delayBetween2Beats ) {
      this.onStandardBeat.dispatch()
      this.timeSinceLastStandardBeat = 0
      this.canDispatchStandardBeat = false
    } else {
      if( this.snare < this.standardBeatValue ) {
        this.canDispatchBigBeat = true
      }
    }
  }

  getAverage( idx ) {
    const step = this.binCount / this.audioRange >> 0

    let value = 0

    const start = idx * step
    const end = start + step
    for( let i = start; i < end; i++ ) {
      value += this.freqByteData[ i ]
    }

    return value / step
  }

}

module.exports = new Audio()
