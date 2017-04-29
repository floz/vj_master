const stage = require( "mnf/core/stage" )
const stage3d = require( "mnf/core/stage3d" )
const audio = require( "mnf/core/audio" )
const keyboard = require( "mnf/utils/keyboard" )

const PostProcessPass = require( "./PostProcessPass" )

class PostProcessManager {

  constructor() {
    stage3d.initPostProcessing()
    stage3d.addPass( this.postProcessPass = new PostProcessPass() )

    this.glitchRatio = 0
    this.ppp = this.postProcessPass.params

    keyboard.onDown.add( this.onKeyDown )
    stage.onUpdate.add( this.onUpdate )
  }

  onKeyDown = ( key ) => {
    if( key == keyboard.touches[ "1" ] ) {
      if( this.postProcessPass.params.gamma < .5 ) {
        this.ppp.gamma = 1
      } else {
        this.ppp.gamma = .1
      }
    } else if ( key == keyboard.touches[ "2" ] ) {
      this.ppp.sectionsKaleid = 4
      if( keyboard.special.altKey ) {
        this.ppp.sectionsKaleid = 0
      }
    } else if ( key == keyboard.touches[ "3" ] ) {
      this.ppp.sectionsKaleid = 6
      if( keyboard.special.altKey ) {
        this.ppp.sectionsKaleid = 0
      }
    } else if ( key == keyboard.touches[ "4" ] ) {
      this.ppp.sectionsKaleid = 8
      if( keyboard.special.altKey ) {
        this.ppp.sectionsKaleid = 0
      }
    } else if ( key == keyboard.touches[ "5" ] ) {
      this.ppp.mirrorX = !this.ppp.mirrorX
    } else if ( key == keyboard.touches[ "6" ] ) {
      this.ppp.mirrorY = !this.ppp.mirrorY
    } else if ( key == keyboard.touches[ "7" ] ) {
      this.ppp.divide4 = !this.ppp.divide4
    } else if ( key == keyboard.touches[ "8" ] ) {
      this.ppp.glitchOffsetX = 2
  		this.ppp.glitchOffsetY = 2
  		this.glitchRatio = .5
      if( keyboard.special.altKey ) {
        this.ppp.glitchOffsetX = 0
    		this.ppp.glitchOffsetY = 0
    		this.glitchRatio = 0
      }
    } else if ( key == keyboard.touches[ "9" ] ) {
      this.ppp.glitchOffsetX = 1 + Math.random() * 4
  		this.ppp.glitchOffsetY = 1 + Math.random() * 4
  		this.glitchRatio = 1
      if( keyboard.special.altKey ) {
        this.ppp.glitchOffsetX = 0
    		this.ppp.glitchOffsetY = 0
    		this.glitchRatio = 0
      }
    } else if ( key == keyboard.touches[ "0" ] ) {
      this.ppp.glitchOffsetX = 2 + Math.random() * 10
  		this.ppp.glitchOffsetY = 2 + Math.random() * 10
  		this.glitchRatio = 2
      if( keyboard.special.altKey ) {
        this.ppp.glitchOffsetX = 0
    		this.ppp.glitchOffsetY = 0
    		this.glitchRatio = 0
      }
    }
  }

  onUpdate = () => {
    this.ppp.glitchRatio = this.glitchRatio * audio.volume * .1
    // console.log( this.ppp.glitchRatio )
  }

}

module.exports = PostProcessManager
