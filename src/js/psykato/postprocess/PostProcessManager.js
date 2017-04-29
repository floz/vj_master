const stage3d = require( "mnf/core/stage3d" )
const gui = require( "mnf/utils/gui" )

const CustomPass = require( "./CustomPass" )

class PostProcessManager {

  constructor() {
    this.createBloomPass1()
    this.createBloomPass2()
    this.createFXAA()
    this.createCustom()
  }

  createBloomPass1() {
    this.bloomPass1 = new WAGNER.MultiPassBloomPass(512,512)
    this.bloomPass1.params.applyZoomBlur = false;
    this.bloomPass1.params.blurAmount = .9;
    this.bloomPass1.params.opacity = .7;
  }

  createBloomPass2() {
    this.bloomPass2 = new WAGNER.MultiPassBloomPass(256,256)
    this.bloomPass2.params.applyZoomBlur = true;
    this.bloomPass2.params.zoomBlurStrength = .1;
    this.bloomPass2.params.blurAmount = 1;
    this.bloomPass2.params.opacity = .6;
  }

  createFXAA() {
    this.fxaa = new WAGNER.FXAAPass()
  }

  createCustom() {
    this.custom = new CustomPass()
  }

  activate() {
    stage3d.initPostProcessing()
    stage3d.addPass( this.custom )
    // stage3d.addPass( this.fxaa )
  }

  debug() {
    const bloom1gui = gui.addFolder( "bloom1" )
    bloom1gui.add(this.bloomPass1.blendPass.params, "opacity", 0, 1 )
    bloom1gui.add(this.bloomPass1.blendPass.params, "mode", 0, 23, 1 )
    bloom1gui.add(this.bloomPass1.params, "applyZoomBlur" )
    bloom1gui.add(this.bloomPass1.params, "zoomBlurStrength", 0, 1 )
    bloom1gui.add(this.bloomPass1.params, "blurAmount",0,1)

    const bloom2gui = gui.addFolder( "bloom2" )
    bloom2gui.add(this.bloomPass2.blendPass.params, "opacity", 0, 1 )
    bloom2gui.add(this.bloomPass2.blendPass.params, "mode", 0, 23, 1 )
    bloom2gui.add(this.bloomPass2.params, "applyZoomBlur" )
    bloom2gui.add(this.bloomPass2.params, "zoomBlurStrength", 0, 1)
    bloom2gui.add(this.bloomPass2.params, "blurAmount", 0, 1 )

    this.custom.debug()
  }

}

module.exports = PostProcessManager
