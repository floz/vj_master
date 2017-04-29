const fs = require( "psykato/shaders/PsykatoParticlesSim.fs" )

const SimpleFBO = require( "mnf/3d/fbo/SimpleFBO" )
const random = require( "mnf/utils/random" )
const gui = require( "mnf/utils/gui" )
const uMaths = require( "mnf/utils/maths" )

class PsykatoParticlesSim extends SimpleFBO {

  constructor( simKaleid, bounds ) {

    // const po2 = uMaths.findNextPowerOf2( count )
    // console.log( po2 )
    const w = 128
    const h = 128

    const count = w * h

    let a = 0
    let r = 100
    const count4 = count * 4
    const data = new Float32Array( count4 )
    const texture = new THREE.DataTexture( data, w, h, THREE.RGBAFormat, THREE.FloatType )
    for( let i = 0; i < count4; i += 4 ) {
      texture.image.data[ i + 0 ] = Math.cos( a ) * r
      texture.image.data[ i + 1 ] = Math.sin( a ) * r
      texture.image.data[ i + 2 ] = Math.tan( a ) * r
      texture.image.data[ i + 3 ] = random() * 1 - .5

      a = random() * Math.PI * 2
      r = random() * 200
    }
    texture.needsUpdate = true


    const uniforms = {
      tSimKaleid: { type: "t", value: simKaleid.getTexture() },
      tBasePos: { type: "t", value: texture },
      isInitialiazed: { type: "f", value: 0 },
      speedScale: { type: "f", value: 2 },
      bounds: { type: "f", value: bounds },
    }

    super( w, h, uniforms, fs )
    this.simKaleid = simKaleid

    this.update()
    this.update()
    this.simMaterial.uniforms.isInitialiazed.value = 1

  }

  update() {
    this.simMaterial.uniforms.tSimKaleid.value = this.simKaleid.getTexture()
    super.update()
  }

}

module.exports = PsykatoParticlesSim
