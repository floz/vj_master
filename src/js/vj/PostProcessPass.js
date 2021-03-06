const stage = require( "mnf/core/stage" )
const gui = require( "mnf/utils/gui" )
const textures = require( "./textures" )

class PostProcessPass extends WAGNER.Pass {

	constructor() {
		super()

		this.shader = WAGNER.processShader( WAGNER.basicVs, require( "./shaders/postprocess.fs" ) )
		this.mapUniforms( this.shader.uniforms )

		this.shader.uniforms.tInput.value.wrapS = THREE.RepeatWrapping
		this.shader.uniforms.tInput.value.wrapT = THREE.RepeatWrapping

    textures.noise.wrapS = THREE.RepeatWrapping
		textures.noise.wrapT = THREE.RepeatWrapping

		this.params.resolutionX = 1
		this.params.resolutionY = 1
		this.params.gamma = 1
		this.params.contrast = 1
		this.params.brightness = 0
		this.params.angle = 0
		this.params.mirrorX = false;
		this.params.mirrorY = false;
		this.params.divide4 = false;
		this.params.vignetteFallOff = .5;
		this.params.vignetteAmount = .2;
		this.params.invertRatio = 0;
		this.params.amount = .05;
		this.params.speed = 1;
		this.params.time = 0;
		this.params.sectionsKaleid = 0;
		this.params.kaleidActivated = 0;
		this.params.tNoise = textures.noise;
		this.params.glitchOffsetX = 2.
		this.params.glitchOffsetY = 2.
		// this.params.glitchRatio = .99
		this.params.glitchRatio = 0

		// const f = gui.addFolder( "PostProcess" )
		// f.add( this.params, "gamma", 0, 10, .1 )
		// f.add( this.params, "contrast", 0, 3, .1 )
		// f.add( this.params, "brightness", 0, 1, .1 )
		// f.add( this.params, "angle", -Math.PI, Math.PI, .01 )
		// f.add( this.params, "sectionsKaleid", 0, 10, 1 )
		// f.add( this.params, "glitchOffsetX", 0, 10, 1 )
		// f.add( this.params, "glitchOffsetY", 0, 10, 1 )
		// f.add( this.params, "glitchRatio", 0, 2, .01 )
		// f.add( this.params, "divide4" )
		// f.add( this.params, "mirrorX" )
		// f.add( this.params, "mirrorY" )
		// f.open()
	}

	run( c ) {
		this.shader.uniforms.resolutionX.value = this.params.sectionsKaleid >= 1 ? stage.width : 1
		this.shader.uniforms.resolutionY.value = this.params.sectionsKaleid >= 1 ? stage.height : 1
		this.shader.uniforms.glitchOffsetX.value = this.params.glitchOffsetX
		this.shader.uniforms.glitchOffsetY.value = this.params.glitchOffsetY
		this.shader.uniforms.glitchRatio.value = this.params.glitchRatio
		this.shader.uniforms.gamma.value = this.params.gamma
		this.shader.uniforms.contrast.value = this.params.contrast
		this.shader.uniforms.brightness.value = this.params.brightness
		this.shader.uniforms.sectionsKaleid.value = this.params.sectionsKaleid >> 0
		this.shader.uniforms.kaleidActivated.value = this.params.sectionsKaleid >= 1
		this.shader.uniforms.mirrorX.value = this.params.mirrorX ? 1 : 0
		this.shader.uniforms.mirrorY.value = this.params.mirrorY ? 1 : 0
		this.shader.uniforms.divide4.value = this.params.divide4 ? 1 : 0
		this.shader.uniforms.vignetteFallOff.value = this.params.vignetteFallOff
		this.shader.uniforms.vignetteAmount.value = this.params.vignetteAmount
		this.shader.uniforms.invertRatio.value = this.params.invertRatio
		this.shader.uniforms.time.value += .000001
		// this.shader.uniforms.mask.value = this.params.mask
		c.pass( this.shader )
	}

}

module.exports = PostProcessPass
