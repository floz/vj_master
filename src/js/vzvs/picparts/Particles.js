const textures = require( "vj/textures" )

const data = require( "vzvs/core/data" )
const dimensions = require( "vzvs/core/dimensions" )
const vjVars = require( "vzvs/core/vjVars" )

const ParticlesGeometry = require( "./ParticlesGeometry" )

class Particles extends THREE.Mesh {

  constructor( id, dataImage, material, sizeParticle, spacingX, spacingY ) {
    const img = textures[ id ].image

    const w = dataImage.width * dimensions.tiles.x
    const h = dataImage.height * dimensions.tiles.y

    const countW = w / ( spacingX + sizeParticle ) >> 0
    const countH = h / ( spacingY + sizeParticle ) >> 0

    const geo = new ParticlesGeometry( countW, countH )
    const mat = material

    super( geo, mat )
    this.frustumCulled = false

    let wImage = dataImage.width * dimensions.tiles.x
    let hImage = dataImage.height * dimensions.tiles.y
    let xImage = dataImage.x * dimensions.tiles.x - dimensions.width * .5 //+ wImage * .5
    let yImage = dataImage.y * dimensions.tiles.y - dimensions.height * .5 //+ hImage * .5

    this.anchor = new THREE.Vector2()
    this.anchor.x = xImage + sizeParticle + spacingX * .5
    this.anchor.y = yImage + sizeParticle + spacingY

    this.position.x = this.anchor.x
    this.position.y = this.anchor.y

    this.dataImage = dataImage

    this._particulesPosX = 0
    this._particulesPosY = 0
    this._particulesPosZ = 0
  }

  move( toX, toY, toZ ) {
    return
    const w = this.dataImage.width * dimensions.tiles.x
    const h = this.dataImage.height * dimensions.tiles.y
    const x = toX * dimensions.tiles.x - dimensions.width * .5 + w * .5
    const y = toY * dimensions.tiles.y - dimensions.height * .5 + h * .5

    TweenLite.to( this.position, 1, {
      x: x,
      y: y,
      z: toZ + this._particulesPosZ,
      ease: Power4.easeInOut
    } )
  }

  setPositions( x, y, z ) {
    this.position.x = this.anchor.x + dimensions.tiles.x * x
    this.position.y = this.anchor.y + dimensions.tiles.y * y
    this.position.z = z
    this._particulesPosZ = z
  }

  setPower( valuea, valueb ) {
    this.material.uniforms.depthValue.value = valuea * vjVars.particles.depthValue
    this.material.uniforms.sizeAdd.value = valueb * vjVars.particles.sizeAdd
  }

  dispose() {

  }

}

module.exports = Particles
