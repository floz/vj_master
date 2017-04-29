const random = require( "mnf/utils/random" )
const stage = require( "mnf/core/stage" )
const audio2 = require( "mnf/core/audio2" )

class BaseCrazy extends THREE.Group {

  constructor( geomBase, mats ) {
    super()

    this.geomBase = geomBase
    this.mats = mats

    this.volToExceed = .9
  }

  createMesh( scaleOrigin = 1 ) {
    let type = this.getType()
    let m = new THREE.Mesh( this.geomBase, type.mat )
    m.scale.set( type.scale * scaleOrigin, type.scale * scaleOrigin, type.scale * scaleOrigin )
    m.__type = type
    m.__countExceeded = 0
    m.__countToExceed = 5 + Math.random() * 20 >> 0
    this.add( m )

    return m
  }

  getType() {
    let scale = 1
    let zRatio = 1
    const r = random() * 11 >> 0
    if( r == 0 ) {
      scale = 3
      zRatio = 3.5 + Math.random() * .5 - .25
    } else if ( r == 2 ) {
      scale = 2
      zRatio = 3 + Math.random() * .5 - .25
    } else if ( r == 7 ) {
      scale = 1.5
      zRatio = 2 + Math.random() * .5 - .25
    } else if ( r == 1 ) {
      zRatio = -1.5 + Math.random() * .5 - .25
    } else if ( r >= 9 ) {
      zRatio = -1 + Math.random() * .5 - .25
    }
    return {
      mat: this.mats[ r ],
      audioRange: r,
      scale: scale,
      zRatio: zRatio
    }
  }

  start() {
    stage.onUpdate.add( this.onUpdate )
  }

  onUpdate = () => {
    for( let i = 0, n = this.children.length; i < n; i++ ) {
      let c = this.children[ i ]
      let t = c.__type

      let vol = Math.min( audio2.values[ t.audioRange ], 1 )
      c.position.z += ( vol * 50 * t.zRatio - c.position.z ) * .91
      c.material.uniforms.vol.value = vol

      if( vol > this.volToExceed ) {
        c.__countExceeded += 1
        if( c.__countExceeded > c.__countToExceed ) {
          c.rotation.z += Math.PI * .25
          c.__countExceeded = 0
        }
      }
    }
  }

  dispose() {
    stage.onUpdate.remove( this.onUpdate )
  }
}

module.exports = BaseCrazy
