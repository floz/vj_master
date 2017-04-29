const random = require( "mnf/utils/random" )

class ParticlesGeometry extends THREE.BufferGeometry {

  constructor( countW, countH ) {
    super()

    this.countW = countW
    this.countH = countH

    this.count = this.countW * this.countH

    this.init()
  }

  init() {
    const count2 = this.count * 2
    const count3 = this.count * 3
    const count4 = this.count * 4

    let idx1 = 0
    let idx2 = 0
    let idx3 = 0
    let idx6 = 0
    let idx8 = 0

    let x = 0
    let y = 0

    const ids = new Float32Array( count4 * 2 )
    const uids = new Float32Array( count4 )
    const uvPics = new Float32Array( count4 * 2 )
    const positions = new Float32Array( count4 * 3 )
    for( let i = 0; i < count4; i++ ) {
      let uid = random() * 10000
      for( let j = 0; j < 4; j++ ) {
        uids[ idx1 ] = uid

        ids[ 0 ] = x;
        ids[ 1 ] = y;

        uvPics[ idx2 + 0 ] = x / ( this.countW - 1 )
        uvPics[ idx2 + 1 ] = y / ( this.countH - 1 )

        positions[ idx3 + 0 ] = x
        positions[ idx3 + 1 ] = y
        positions[ idx3 + 2 ] = 0

        idx1 += 1
        idx2 += 2
        idx3 += 3
      }

      x += 1
      if( x > this.countW - 1 ) {
        x = 0
        y += 1
      }
    }

    const sides = new Float32Array( count4 * 2 )
    for( let i = 0; i < count2; i++ ) {
      sides[ idx8 + 0 ] = -1
      sides[ idx8 + 1 ] = -1

      sides[ idx8 + 2 ] = -1
      sides[ idx8 + 3 ] = 1

      sides[ idx8 + 4 ] = 1
      sides[ idx8 + 5 ] = -1

      sides[ idx8 + 6 ] = 1
      sides[ idx8 + 7 ] = 1

      idx8 += 8
    }

    idx2 = 0
    idx6 = 0
    const index = new Uint32Array( count4 * 3 )
    for( let i = 0; i <  this.count; i++ ) {
      index[ idx6 + 0 ] = idx2
      index[ idx6 + 1 ] = index[ idx6 + 4 ] = idx2 + 1
      index[ idx6 + 2 ] = index[ idx6 + 3 ] = idx2 + 2
      index[ idx6 + 5 ] = idx2 + 3

      idx2 += 4
      idx6 += 12
    }

    this.addAttribute( "id", new THREE.BufferAttribute( ids, 1 ) )
    this.addAttribute( "uid", new THREE.BufferAttribute( uids, 1 ) )
    this.addAttribute( "uvPic", new THREE.BufferAttribute( uvPics, 2 ) )
    this.addAttribute( "position", new THREE.BufferAttribute( positions, 3 ) )
    this.addAttribute( "side", new THREE.BufferAttribute( sides, 2 ) )
    this.setIndex( new THREE.BufferAttribute( index, 1 ) )
  }

}

module.exports = ParticlesGeometry
