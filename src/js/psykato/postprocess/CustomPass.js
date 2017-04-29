const stage = require( "mnf/core/stage" )

const gui = require( "mnf/utils/gui" )

class CustomPostProcessPass extends WAGNER.Pass {

  constructor() {
    super()

    this.shader = WAGNER.processShader( WAGNER.basicVs, require( "./shaders/CustomPass.fs" ) )
    this.shader.uniforms.tInput.value.wrapS = THREE.RepeatWrapping
    this.shader.uniforms.tInput.value.wrapT = THREE.RepeatWrapping
    this.mapUniforms( this.shader.uniforms )

    this.guiParams = {
      mirrorX: false,
      mirrorY: false,
      divide4: false
    }

    this.params.angle = 0
    this.params.kaleid1Sections = 0
    this.params.kaleid1Activated = 0
    this.params.kaleid1RadiusCoef = 1
    this.params.resolution = new THREE.Vector2( 1, 1 );
    this.params.mirrorX = this.guiParams.mirrorX ? 1 : 0
    this.params.mirrorY = this.guiParams.mirrorY ? 1 : 0
    this.params.divide4 = this.guiParams.divide4 ? 1 : 0

    this.params.kaleidDivisions = 32
    this.params.kaleidRadius = 1

    this.params.time = 0
    this.params.timeCoef = 0
  }

  run( c ) {
    this.shader.uniforms.resolution.value.x = stage.width
		this.shader.uniforms.resolution.value.y = stage.height

    this.shader.uniforms.mirrorX.value = this.guiParams.mirrorX ? 1 : 0
		this.shader.uniforms.mirrorY.value = this.guiParams.mirrorY ? 1 : 0
		this.shader.uniforms.divide4.value = this.guiParams.divide4 ? 1 : 0

    this.shader.uniforms.kaleidDivisions.value = this.params.kaleidDivisions >> 0
    this.shader.uniforms.kaleidRadius.value = this.params.kaleidRadius

    this.params.time += 1
    this.shader.uniforms.time.value = this.params.time
    this.shader.uniforms.timeCoef.value = this.params.timeCoef

    this.shader.uniforms.kaleid1Activated.value = this.params.kaleid1Sections > 0 ? 1 : 0
    this.shader.uniforms.kaleid1Sections.value = this.params.kaleid1Sections >> 0
    this.shader.uniforms.kaleid1RadiusCoef.value = this.params.kaleid1RadiusCoef

    c.pass( this.shader )
  }

  debug() {
    const f = gui.addFolder( "CustomPass" )
    f.add( this.params, "angle", -Math.PI, Math.PI, .01 )
    f.add( this.params, "kaleidRadius", 1, 2, .001 )
    f.add( this.params, "kaleid1Sections", 0, 10, 1 )
    f.add( this.params, "kaleid1RadiusCoef", 0, 10, .01 )
    f.add( this.params, "timeCoef", 0, 1, .01 )
    f.add( this.guiParams, "mirrorX" )
    f.add( this.guiParams, "mirrorY" )
    f.add( this.guiParams, "divide4" )
    f.open()
  }

}

module.exports = CustomPostProcessPass
