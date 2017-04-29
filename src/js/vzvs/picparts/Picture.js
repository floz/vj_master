const textures = require( "vj/textures" )

const data = require( "vzvs/core/data" )
const VZVSMesh = require( "vzvs/core/VZVSMesh" )
const gui = require( "mnf/utils/gui" )
const random = require( "mnf/utils/random" )

const vs = require( "./shaders/Picture.vs" )
const fs = require( "./shaders/Picture.fs" )

const vjVars = require( "vzvs/core/vjVars" )

// const GEO = new THREE.PlaneBufferGeometry( 1, 1, 10, 10 )

let ID = 0

class Picture {

  constructor( idPic, dataImage ) {
    const uniforms = {
      tPic: { type: "t", value: textures[ idPic ] },
      maskVisible: { type: "f", value: 0 },
      onlyLeft: { type: "f", value: 0 },
      depthValue: { type: "f", value: 0 },
      depthInvert: { type: "f", value: 0 },
      uvDisp: { type: "v4", value: new THREE.Vector4( 0., 0., 1., 1. ) },
      dimensions: { type: "v2", value: new THREE.Vector2( 1., 1. ) },
      time: { type: "f", value: 0 },
      dispDecal: { type: "v2", value: new THREE.Vector2( .5, .5 ) },
      dispDivide: { type: "v2", value: new THREE.Vector2( 40, 50 ) },
      dispOffset: { type: "v2", value: new THREE.Vector2( .5, .5 ) },
      dispFiRatio: { type: "v2", value: new THREE.Vector2( .03, .03 ) },
      dispSinProcessed: { type: "v2", value: new THREE.Vector2( 3., 3. ) },
      ratioDisp: { type: "f", value: 0 },
      customFI: { type: "f", value: 0 },
      granularityX: { type: "f", value: 0 },
      granularityY: { type: "f", value: 0 },
      brightness: { type: "f", value: 0 },
      contrast: { type: "f", value: 1 },
    }

    this.coefDisplacement = 1

    // const fPictureDisp = gui.addFolder( "PictureDisp" + ID )
    // fPictureDisp.add( uniforms.time, "value", 0, 1000 ).step( 1 ).name( "Time" )
    // fPictureDisp.add( uniforms.dispDecal.value, "x", 0, 2 ).step( .01 ).name( "DecalX" )
    // fPictureDisp.add( uniforms.dispDecal.value, "y", 0, 2 ).step( .01 ).name( "DecalY" )
    // fPictureDisp.add( uniforms.dispDivide.value, "x", 1, 200 ).step( 1 ).name( "DivideX" )
    // fPictureDisp.add( uniforms.dispDivide.value, "y", 1, 200 ).step( 1 ).name( "DivideY" )
    // fPictureDisp.add( uniforms.dispOffset.value, "x", -2, 20 ).step( .01 ).name( "OffsetX" )
    // fPictureDisp.add( uniforms.dispOffset.value, "y", -2, 2 ).step( .01 ).name( "OffsetY" )
    // fPictureDisp.add( uniforms.dispFiRatio.value, "x", 0, 2 ).step( .01 ).name( "FiRatioX" )
    // fPictureDisp.add( uniforms.dispFiRatio.value, "y", 0, 2 ).step( .01 ).name( "FiRatioY" )
    // fPictureDisp.add( uniforms.dispSinProcessed.value, "x", 0, 100 ).step( .1 ).name( "SinX" )
    // fPictureDisp.add( uniforms.dispSinProcessed.value, "y", 0, 100 ).step( .1 ).name( "SinY" )
    // fPictureDisp.add( uniforms.ratioDisp, "value", 0, 1 ).step( .01 ).name( "RatioDisp" )
    // fPictureDisp.add( uniforms.customFI, "value", 0, 100 ).step( .01 ).name( "CustomFI" )
    // fPictureDisp.add( uniforms.granularityX, "value", 0, 200 ).step( 1 ).name( "GranularityX" )
    // fPictureDisp.add( uniforms.granularityY, "value", 0, 200 ).step( 1 ).name( "GranularityY" )
    // fPictureDisp.open()

    this.material = new THREE.RawShaderMaterial( {
      uniforms: uniforms,
      vertexShader: vs,
      fragmentShader: fs,
      side: THREE.DoubleSide,
      type: "VZVSPicture"
    } )

    this.mesh = new VZVSMesh( dataImage, this.material )
    this.mesh.z = data.start.z

    this.dataImg = dataImage

    // super( dataImage, mat )

    // this.scale.set( size, size, 1 )

    ID ++
  }

  moveTo() {
    const toX = this.hasMoved ? this.dataImg.x : this.__moveTo.x
    const toY = this.hasMoved ? this.dataImg.y : this.__moveTo.y
    const toZ = this.hasMoved ? this.__positionZ : this.__moveTo.z

    this.move( toX, toY, toZ )

    this.hasMoved = !this.hasMoved
  }

  move( toX, toY, toZ ) {
    this.mesh.move( toX, toY, toZ )
  }

  setMaskVisible( value ) {
    this.material.uniforms.maskVisible.value = value ? 0 : 1
  }

  setOnlyLeft( value ) {
    this.material.uniforms.onlyLeft.value = value ? 1 : 0
  }

  setDepthValue( value ) {
    this.material.uniforms.depthValue.value = value
    // this.mesh.position.z = value * .5
  }

  setInvertDepth( value ) {
    this.material.uniforms.depthInvert.value = value ? 1 : 0
  }

  setLineDisplaced( randomized = false ) {
    this.hasDisplacedLine = true
    if( randomized ) {
      this.material.uniforms.dispDecal.value.x = .5 + random() * .4
      this.material.uniforms.dispDecal.value.y = .25 + random() * .75
      this.material.uniforms.dispDivide.value.x = 25 + random() * 50
      this.material.uniforms.dispDivide.value.y = 25 + random() * 50
      this.material.uniforms.ratioDisp.value = .1 + random() * .4
      this.material.uniforms.time.value = random() * 1000
    } else {
      this.material.uniforms.granularityX.value = 2
      this.material.uniforms.dispDecal.value.x = .71
      this.material.uniforms.dispDecal.value.y = .49
      this.material.uniforms.dispDivide.value.x = 54
      this.material.uniforms.dispDivide.value.y = 47
      this.material.uniforms.ratioDisp.value = .25
      this.material.uniforms.time.value = 66
    }
    // this.material.uniforms.brightness.value = -.01
    // this.material.uniforms.contrast.value = 1.05
  }

  startSwirl() {
    let endValue = vjVars.picture.funnyMode ? .3 : 1

    this.material.uniforms.dispOffset.value.x = 0
    this.material.uniforms.dispOffset.value.y = 0

    this.material.uniforms.ratioDisp.value = 0
    TweenLite.to( this.material.uniforms.ratioDisp, .2, {
      value: .3 * endValue,
      ease: Power4.easeIn
    })
    TweenLite.to( this.material.uniforms.ratioDisp, .6, {
      delay: .2,
      value: 1 * endValue,
      ease: Power4.easeOut,
      onStart: () => {
        this.material.uniforms.ratioDisp.value = .8
      }
    })
  }

  setDisplacementLevel( value ) {
    this.material.uniforms.ratioDisp.value = value
  }

  swirl( bigSwirl = false ) {
    let coef = 1
    if( this.hasDisplacedLine || this.material.uniforms.ratioDisp.value > 0 ) {
      coef = this.coefDisplacement
    }
    this.material.uniforms.time.value += 10 * coef

    if( bigSwirl ) {
      this.material.uniforms.time.value += 40 * ( 1 + random() * 4 - 3 >> 0 )
      // TweenLite.to( this.material.uniforms.time, .3, {
      //   value: this.material.uniforms.time.value + 10,
      //   ease: Power4.easeInOut
      // } )
      // this.material.uniforms.dispDecal.value.x = .5 + random() * .2 - .1
      // this.material.uniforms.dispDecal.value.y = .5 + random() * .2 - .1
      if( vjVars.picture.canDisplaceOffsetX ) {
        this.material.uniforms.dispOffset.value.x += random() * 1 - .5
      }
      if( vjVars.picture.canDisplaceOffsetY ) {
        this.material.uniforms.dispOffset.value.y += random() * 1 - .5
      }

      if( vjVars.picture.crazyMode ) {
        console.log( "crazyMode" )
        if( random() < .25 ) {
          // this.material.uniforms.customFI.value = random() * 100 >> 0
          TweenLite.to( this.material.uniforms.customFI, .6, {
            value: random() * 100 >> 0,
            ease: Power4.easeOut
          } )
        } else {
          // this.material.uniforms.customFI.value = 0
          TweenLite.to( this.material.uniforms.customFI, .6, {
            value: 0,
            ease: Power4.easeOut
          } )
        }
      }
    }
  }

  stopSwirl() {
    this.material.uniforms.ratioDisp.value = .4
    TweenLite.to( this.material.uniforms.ratioDisp, .4, {
      value: 0,
      ease: Power4.easeOut,
    })
  }

  setCustomFI( value) {
    this.material.uniforms.customFI.value = value
  }

  reset() {
    this.material.uniforms.time.value = 0
    this.material.uniforms.customFI.value = 0
    this.material.uniforms.dispOffset.value.x = .5
    this.material.uniforms.dispOffset.value.y = .5
    this.material.uniforms.ratioDisp.value = 0
    this.material.uniforms.granularityX.value = 0
    this.material.uniforms.granularityY.value = 0
  }

  setGranularityX( value ) {
    this.material.uniforms.granularityX.value = value
  }

  setGranularityY( value ) {
    this.material.uniforms.granularityY.value = value
  }

  setOffsetX( value ) {
    this.material.uniforms.dispOffset.value.x = value
  }

  setOffsetY( value ) {
    this.material.uniforms.dispOffset.value.y = value
  }

  setDepthValue( value ) {
    this.material.uniforms.depthValue.value = value * 200
  }

  setStyle( id ) {
    this.material.uniforms.tPic.value = textures[ id ]
    this.mesh.forceRefreshDimensions()
  }

  dispose() {
    this.mesh.dispose()
    TweenLite.killTweensOf( this.material.uniforms.ratioDisp )
    TweenLite.killTweensOf( this.material.uniforms.customFI )
  }

}

module.exports = Picture
