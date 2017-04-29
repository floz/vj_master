const geometries = require( "vzvs/core/geometries" )
const dimensions = require( "vzvs/core/dimensions" )

const coreData = require( "vzvs/core/data" )

const uImg = require( "mnf/utils/images" )

class VZVSMesh extends THREE.Mesh {

  constructor( data, mat, isSquare = false, isSimplified = false )
  {
    const geo = geometries.get( data.width >> 0, data.height >> 0, !isSimplified )
    super( geo, mat )

    this.data = data
    this.isSquare = isSquare

    this.isHavingPic = false
    if( mat.uniforms && mat.uniforms.uvDisp ) {
      this.isHavingPic = true

      this.wPic = mat.uniforms.tPic.value.image.width
      this.hPic = mat.uniforms.tPic.value.image.height
    }

    this.z = coreData.start.z

    dimensions.onUpdate.add( this.onDimensionsUpdate )
    this.onDimensionsUpdate()
  }

  forceRefreshDimensions() {
    if( this.material.uniforms && this.material.uniforms.uvDisp ) {
      this.isHavingPic = true

      this.wPic = this.material.uniforms.tPic.value.image.width
      this.hPic = this.material.uniforms.tPic.value.image.height
    }
    this.onDimensionsUpdate()
  }

  onDimensionsUpdate = () => {
    let w = this.data.width * dimensions.tiles.x
    let h = this.data.height * dimensions.tiles.y
    let x = this.data.x * dimensions.tiles.x - dimensions.width * .5 + w * .5
    let y = this.data.y * dimensions.tiles.y - dimensions.height * .5 + h * .5

    if( this.isSquare ) {
      if( w < h ) {
        h = w
      } else {
        w = h
      }
    }

    if( this.isHavingPic ) {
      const dataImg = uImg.fit( this.wPic, this.hPic, w, h )
      dataImg.width = 1 / ( dataImg.width / w )
      dataImg.height = 1 / ( dataImg.height / h )
      dataImg.x = Math.abs( ( dataImg.x / w ) * dataImg.width )
      dataImg.y = Math.abs( ( dataImg.y / h ) * dataImg.height )

      const dim = w > h ? w : h
      this.material.uniforms.dimensions.value.x = dim
      this.material.uniforms.dimensions.value.y = dim
      this.material.uniforms.uvDisp.value.x = dataImg.x
      this.material.uniforms.uvDisp.value.y = dataImg.y
      this.material.uniforms.uvDisp.value.z = dataImg.width
      this.material.uniforms.uvDisp.value.w = dataImg.height
    }

    this.scale.set( w, h, 1 )
    this.position.set( x, y, this.position.z )

    this.w = w
    this.h = h

    this.hasMoved = false
  }

  moveTo() {
    const toX = this.hasMoved ? this.data.x : this.__moveTo.x
    const toY = this.hasMoved ? this.data.y : this.__moveTo.y
    const toZ = this.hasMoved ? this.__positionZ : this.__moveTo.z

    this.move( toX, toY, toZ )

    this.hasMoved = !this.hasMoved
  }

  move( toX, toY, toZ ) {
    const w = this.data.width * dimensions.tiles.x
    const h = this.data.height * dimensions.tiles.y
    const x = toX * dimensions.tiles.x - dimensions.width * .5 + w * .5
    const y = toY * dimensions.tiles.y - dimensions.height * .5 + h * .5

    TweenLite.to( this.position, 1, {
      x: x,
      y: y,
      z: toZ,
      ease: Power4.easeInOut
    } )


  }

  animateScale( from, to, speed ) {
    let sWFrom = this.w * from
    let sHFrom = this.h * from
    let sWTo = this.w * to
    let sHTo = this.h * to

    this.scale.set( sWFrom, sHFrom, 1 )
    TweenLite.to( this.scale, speed, {
      x: sWTo,
      y: sHTo,
      ease: Power4.easeOut
    })
  }

  dispose() {
    dimensions.onUpdate.remove( this.onDimensionsUpdate )
    TweenLite.killTweensOf( this.position )
  }

}

module.exports = VZVSMesh
