const stage = require( "mnf/core/stage" )
// const audio = require( "mnf/core/audio2" )
const audio = require( "mnf/core/audio" )

const Picture = require( "./Picture" )
const Particles = require( "./Particles" )
const ParticlesMaterial = require( "./ParticlesMaterial" )
const dimensions = require( "vzvs/core/dimensions" )
const data = require( "vzvs/core/data" )

const gui = require( "mnf/utils/gui" )

class PictureParticular extends THREE.Group {

  constructor( idPic, dataImage ) {
    super()

    // this.idPic = idPic
    this.idPic = idPic
    this.dataImage = dataImage

    this.picture = new Picture( idPic, this.dataImage )
    this.add( this.picture.mesh )

    this.PARAMS = {
      pictureDepthValue: 0,
      pictureDepthInverted: true,
      particlesZ: 1,
      particlesSize: 3,
      particlesSpacingX: 10,
      particlesSpacingY: 10,
      particlesOnlyMaskVisible: false,
      particlesDepthValue: 100,
      particlesDepthInverted: false,
      showLeftPictureOnly: false
    }

    this.hasMoved = false

    // const f = gui.addFolder( "PictureParticular" + Math.random() )
    // f.add( this.PARAMS, "pictureDepthValue", 0, 500, .1 ).onChange( this.updatePicture )
    // f.add( this.PARAMS, "pictureDepthInverted" ).onChange( this.updatePicture )
    // f.add( this.PARAMS, "particlesZ", 0, 100, .1 ).onChange( this.updateParticlesPosition )
    // f.add( this.PARAMS, "particlesSpacingX", 0, 20, 1 ).onChange( this.createParticles )
    // f.add( this.PARAMS, "particlesSpacingY", 0, 20, 1 ).onChange( this.createParticles )
    // f.add( this.PARAMS, "particlesSize",1, 20, .1 ).onChange( this.createParticles )
    // f.add( this.PARAMS, "particlesDepthValue", 0, 500, .1 ).onChange( this.updateMaterial )
    // f.add( this.PARAMS, "particlesDepthInverted" ).onChange( this.updateMaterial )
    // f.add( this.PARAMS, "particlesOnlyMaskVisible" ).onChange( this.updateMaterial )
    // f.add( this.PARAMS, "showLeftPictureOnly" ).onChange( this.updateSides )
    // f.open()

    this.z = data.start.z

    stage.onUpdate.add( this.onUpdate )
  }

  updateImage = () => {
    this.picture.setMaskVisible( this.PARAMS.imageOnlyMaskVisible )
  }

  updatePicture = () => {
    this.picture.setDepthValue( this.PARAMS.pictureDepthValue )
    this.picture.setInvertDepth( this.PARAMS.pictureDepthInverted)
  }

  createParticles = ( size = 2, spacingX = 12, spacingY = 12 ) => {
    if( this.particles ) {
      this.remove( this.particles )
      this.particles.dispose()
      this.particles = null
    } else {
      // this.particlesScale = scale // to implement
      this.PARAMS.particlesSize = size
      this.PARAMS.particlesSpacingX = spacingX
      this.PARAMS.particlesSpacingY = spacingY
      this.particlesPositions = { x: 0, y: 0, z: 0 }
      dimensions.onUpdate.add( this.onDimensionsUpdate )
    }

    if( !this.particlesMaterial ) {
      this.particlesMaterial = new ParticlesMaterial( this.idPic, this.PARAMS.particlesSize, this.PARAMS.particlesSpacingX, this.PARAMS.particlesSpacingY )
    }
    this.updateMaterial()

    this.particles = new Particles( this.idPic, this.dataImage, this.particlesMaterial, this.PARAMS.particlesSize, this.PARAMS.particlesSpacingX, this.PARAMS.particlesSpacingY )
    this.particles.setPositions( this.particlesPositions.x, this.particlesPositions.y, this.particlesPositions.z )
    this.updateParticlesPosition()
    this.add( this.particles )
  }

  onDimensionsUpdate = () => {
    this.createParticles()
  }

  setParticlesPositions( x, y, z = 0 ) {
    this.particlesPositions.x = x
    this.particlesPositions.y = y
    this.particlesPositions.z = z
    this.particles.setPositions( x, y, z )
  }

  updateParticlesPosition = () => {
    this.particles.position.z = this.PARAMS.particlesZ
  }

  updateMaterial = () => {
    this.particlesMaterial.setData( this.PARAMS.particlesSize, this.PARAMS.particlesSpacingX, this.PARAMS.particlesSpacingY )
    this.particlesMaterial.setMaskVisible( this.PARAMS.particlesOnlyMaskVisible )
    this.particlesMaterial.setDepthValue( this.PARAMS.particlesDepthValue )
    this.particlesMaterial.setInvertDepth( this.PARAMS.particlesDepthInverted )
    this.particlesMaterial.setUvDisp( this.picture.material.uniforms.uvDisp.value )
  }

  updateSides = () => {
    this.particlesMaterial.setOnlyRight( this.PARAMS.showLeftPictureOnly )
    this.picture.setOnlyLeft( this.PARAMS.showLeftPictureOnly )
  }

  onUpdate = () => {
    if( this.particles ) {
      // this.particles.setPower( audio.values[ 1 ], audio.values[ 3 ] )
      this.particles.setPower( audio.volume, audio.volume / 3 )
    }
  }

  setStyle( id ) {
    this.idPic = id

    this.picture.setStyle( this.idPic )

    if( this.particles ) {
      this.particlesMaterial = null

      this.createParticles()
    }
  }

  moveTo() {
    const toX = this.hasMoved ? this.dataImage.x : this.__moveTo.x
    const toY = this.hasMoved ? this.dataImage.y : this.__moveTo.y
    const toZ = this.hasMoved ? this.__positionZ : this.__moveTo.z

    this.picture.move( toX, toY, toZ )
    if( this.particles ) {
      this.particles.move( toX, toY, toZ )
    }

    this.hasMoved = !this.hasMoved
  }

  update() {

  }

  dispose() {
    if( this.particles ) {
      dimensions.onUpdate.remove( this.onDimensionsUpdate )
      this.particles.dispose()
    }
    this.picture.dispose()

    TweenLite.killTweensOf( this.position )

    stage.onUpdate.remove( this.onUpdate )
  }

}

module.exports = PictureParticular
