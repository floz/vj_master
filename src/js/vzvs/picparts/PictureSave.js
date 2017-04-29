const textures = require( "vj/textures" )

const data = require( "vzvs/core/data" )
const VZVSMesh = require( "vzvs/core/VZVSMesh" )

const gui = require( "mnf/utils/gui" )

const vs = require( "./shaders/Picture.vs" )
const fs = require( "./shaders/Picture.fs" )

// const GEO = new THREE.PlaneBufferGeometry( 1, 1, 10, 10 )

class Picture {

  constructor( id, dataImage ) {
    const uniforms = {
      tPic: { type: "t", value: textures[ id ] },
      maskVisible: { type: "f", value: 0 },
      onlyLeft: { type: "f", value: 0 },
      depthValue: { type: "f", value: 0 },
      depthInvert: { type: "f", value: 0 },
      uvDisp: { type: "v4", value: new THREE.Vector4( 0., 0., 1., 1. ) },
      time: { type: "f", value: 0 },
      dispDecal: { type: "v2", value: new THREE.Vector2( .5, .5 ) },
      dispDivide: { type: "v2", value: new THREE.Vector2( 40, 50 ) },
      dispOffset: { type: "v2", value: new THREE.Vector2( .5, .5 ) },
      dispFiRatio: { type: "v2", value: new THREE.Vector2( .03, .03 ) },
      dispSinProcessed: { type: "v2", value: new THREE.Vector2( 3., 3. ) },
      ratioDisp: { type: "f", value: 1 },
      customFI: { type: "f", value: 0 },
    }

    const fPictureDisp = gui.addFolder( "PictureDisp" )
    fPictureDisp.add( uniforms.time, "value", 0, 1000 ).step( 1 ).name( "Time" )
    fPictureDisp.add( uniforms.dispDecal.value, "x", 0, 2 ).step( .01 ).name( "DecalX" )
    fPictureDisp.add( uniforms.dispDecal.value, "y", 0, 2 ).step( .01 ).name( "DecalY" )
    fPictureDisp.add( uniforms.dispDivide.value, "x", 1, 200 ).step( 1 ).name( "DivideX" )
    fPictureDisp.add( uniforms.dispDivide.value, "y", 1, 200 ).step( 1 ).name( "DivideY" )
    fPictureDisp.add( uniforms.dispOffset.value, "x", 0, 2 ).step( .01 ).name( "OffsetX" )
    fPictureDisp.add( uniforms.dispOffset.value, "y", 0, 2 ).step( .01 ).name( "OffsetY" )
    fPictureDisp.add( uniforms.dispFiRatio.value, "x", 0, 2 ).step( .01 ).name( "FiRatioX" )
    fPictureDisp.add( uniforms.dispFiRatio.value, "y", 0, 2 ).step( .01 ).name( "FiRatioY" )
    fPictureDisp.add( uniforms.dispSinProcessed.value, "x", 0, 100 ).step( .1 ).name( "SinX" )
    fPictureDisp.add( uniforms.dispSinProcessed.value, "y", 0, 100 ).step( .1 ).name( "SinY" )
    fPictureDisp.add( uniforms.ratioDisp, "value", 0, 1 ).step( .01 ).name( "RatioDisp" )
    fPictureDisp.add( uniforms.customFI, "value", 0, 500 ).step( .01 ).name( "CustomFI" )
    fPictureDisp.open()

    this.material = new THREE.RawShaderMaterial( {
      uniforms: uniforms,
      vertexShader: vs,
      fragmentShader: fs,
      side: THREE.DoubleSide,
      type: "VZVSPicture"
    } )

    this.mesh = new VZVSMesh( dataImage, this.material )

    // super( dataImage, mat )

    // this.scale.set( size, size, 1 )
  }

  setMaskVisible( value ) {
    this.material.uniforms.maskVisible.value = value ? 0 : 1
  }

  setOnlyLeft( value ) {
    this.material.uniforms.onlyLeft.value = value ? 1 : 0
  }

  setDepthValue( value ) {
    this.material.uniforms.depthValue.value = value
  }

  setInvertDepth( value ) {
    this.material.uniforms.depthInvert.value = value ? 1 : 0
  }

  dispose() {
    this.mesh.dispose()
  }

}

module.exports = Picture
