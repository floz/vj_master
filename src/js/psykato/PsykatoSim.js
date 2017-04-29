const data = require( "psykato/core/data" )
const fs = require( "psykato/shaders/PsykatoSim.fs" )

const gui = require( "mnf/utils/gui" )
const SimpleFBO = require( "mnf/3d/fbo/SimpleFBO" )

class PsykatoSim extends SimpleFBO {

  constructor( aAdd = 0 ) {
    const tNormalMap = data.textures.shinjuku

    const uniforms = {
      tNormalMap: { type: "t", value: tNormalMap },
      angle: { type: "f", value: Math.PI * .25 + aAdd },
      kaleidRadius: { type: "f", value: 1 },
      time: { type: "t", value: 0 },
      timeCoef: { type: "f", value: .0001 },
      isInitiated: { type: "f", value: 0 }
    }

    const ratio = 1
    // const w = tNormalMap.image.width * ratio
    // const h = tNormalMap.image.height * ratio
    const w = 500
    const h = 500
    super( w, h, uniforms, fs )

    // const f = gui.addFolder( "PsykatoSim" + aAdd )
    // f.add( this.simMaterial.uniforms.angle, "value", -Math.PI, Math.PI, .01 ).name( "angle" )
    // f.add( this.simMaterial.uniforms.kaleidRadius, "value", 1, 2, .001 ).name( "kaleidRadius")
    // f.add( this.simMaterial.uniforms.timeCoef, "value", 0, .1, .01 ).name( "timeCoef" )
    // f.open()

    this.update()
    this.update()
    this.simMaterial.uniforms.isInitiated.value = 1
  }

  update() {
    this.simMaterial.uniforms.time.value += 1
    if( this.simMaterial.uniforms.time.value >= 400 ) {
      this.simMaterial.uniforms.time.value = 20
      this.simMaterial.uniforms.isInitiated.value = 0
      this.update()
      this.update()
      this.simMaterial.uniforms.isInitiated.value = 1
    }

    super.update()
  }

}

module.exports = PsykatoSim
