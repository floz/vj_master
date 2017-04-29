const textures = require( "vj/textures" )

const data = require( "vzvs/core/data" )

const vs = require( "./shaders/Particles.vs" )
const fs = require( "./shaders/Particles.fs" )

class ParticlesMaterial extends THREE.RawShaderMaterial {

  constructor( id, size, spacingX, spacingY ) {
    const uniforms = {
      tPic: { type: "t", value: textures[ id ] },
      tMask: { type: "t", value: textures[ id + "_mask" ] || textures[ id ] },
      size: { type: "f", value: size },
      sizeAdd: { type: "f", value: 0 },
      spacingX: { type: "f", value: spacingX },
      spacingY: { type: "f", value: spacingY },
      maskVisible: { type: "f", value: 0 },
      depthValue: { type: "f", value: 0 },
      depthInvert: { type: "f", value: 0 },
      onlyRight: { type: "f", value: 0 },
      uvDisp: { type: "v4", value: null }
    }

    super( {
      uniforms: uniforms,
      vertexShader: vs,
      fragmentShader: fs,
      side: THREE.DoubleSide,
      type: "VZVSParticles"
    } )
  }

  setData( size, spacingX, spacingY ) {
    this.uniforms.size.value = size
    this.uniforms.spacingX.value = spacingX
    this.uniforms.spacingY.value = spacingY
  }

  setMaskVisible( value ) {
    this.uniforms.maskVisible.value = value ? 0 : 1
  }

  setOnlyRight( value ) {
    this.uniforms.onlyRight.value = value ? 1 : 0
  }

  setDepthValue( value ) {
    this.uniforms.depthValue.value = value
  }

  setInvertDepth( value ) {
    this.uniforms.depthInvert.value = value ? 1 : 0
  }

  setUvDisp( value ) {
    this.uniforms.uvDisp.value = value
  }

}

module.exports = ParticlesMaterial
