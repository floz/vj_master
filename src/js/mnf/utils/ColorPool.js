const random = require( "mnf/utils/random" )

class ColorPool {

  constructor( colors = null, toTHREEColor = false ) {
    this.toTHREEColor = toTHREEColor

    this.colors = []
    if( colors ) {
      for( let i = 0, n = colors.length; i < n; i++ ) {
        this.add( colors[ i ] )
      }
    }
  }

  add( color ) {
    if( this.toTHREEColor ) {
      if( !( color instanceof THREE.Color ) ) {
        color = new THREE.Color( color )
      }
    }
    this.colors.push( color )
  }

  get() {
    const idx = random() * this.colors.length >> 0
    return this.colors[ idx ]
  }

}

module.exports = ColorPool
