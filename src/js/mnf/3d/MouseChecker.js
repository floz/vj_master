const stage = require( "mnf/core/stage" )
const stage3d = require( "mnf/core/stage3d" )

class MouseChecker {

  constructor( returnNull = false ) {
    this.ray = new THREE.Raycaster()
    this.projector = new THREE.Projector()
    this.mouse = new THREE.Vector2()

    this.dummy = returnNull ? null : new THREE.Vector3( -9999, -9999, -9999 )
  }

  setMouse( x, y ) {
    this.mouse.x = ( x / stage.width ) * 2 - 1
    this.mouse.y = -( y / stage.height ) * 2 + 1
  }

  getIntersectForObject( object ) {
    this.ray.setFromCamera( this.mouse, stage3d.camera )
    const intersects = this.ray.intersectObject( object )
    if( intersects.length ) {
      return intersects[ 0 ].point
    }
    return this.dummy
  }

}

module.exports = MouseChecker
