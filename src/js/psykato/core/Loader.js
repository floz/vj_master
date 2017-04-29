const data = require( "psykato/core/data" )

const Signal = require( "mnf/events/Signal" )
const uString = require( "mnf/utils/string" )

class Loader {

  constructor() {
    this.onComplete = new Signal()

    this.loaders = []
    this.urls = [
      // ...
      "./imgs/hands.jpg",
      "./imgs/hands_mask.jpg",
    ]

    this.prepare()
  }

  prepare() {
    for( let i = 0, n = this.urls.length; i < n; i++ ) {
      let loader = new THREE.TextureLoader()
      loader.__url = this.urls[ i ]
      loader.__id = uString.getFileNameFromURL( loader.__url )
      this.loaders.push( loader )
    }
  }

  load() {
    const l = this.loaders.length
    if( l == 0 ) {
      this.onComplete.dispatch()
      return
    }

    this.idxLoaded = 0
    for( let i = 0; i < l; i++ ) {
      this.loadTexture( this.loaders[ i ] )
    }
  }

  loadTexture( loader ) {
    loader.load( loader.__url, ( texture ) => {
      data.textures[ loader.__id ] = texture

      this.idxLoaded++
      this.checkIfComplete()
    } )
  }

  checkIfComplete() {
    if( this.idxLoaded < this.loaders.length ) {
      return
    }
    this.onComplete.dispatch()
  }

}

module.exports = Loader
