const data = require( "./data" )
const textures = require( "./textures" )

const Signal = require( "mnf/events/Signal" )
const uString = require( "mnf/utils/string" )

const URL_BASE = "./imgs/"

class GlobalLoader {

  constructor() {
    this.onComplete = new Signal()

    this.loaders = []

    this.prepare()
  }

  prepare() {
    for( let i = 0, n = data.length; i < n; i++ ) {
      let vjData = data[ i ]
      if( vjData.assets.imgs ) {
        let baseURL = URL_BASE + ( vjData.id != "global" ? vjData.id : "" ) + "/"
        for( let j = 0, m = vjData.assets.imgs.length; j < m; j++ ) {
          let url = baseURL + vjData.assets.imgs[ j ]

          let loader = new THREE.TextureLoader()
          loader.__url = url
          loader.__id = uString.getFileNameFromURL( url )
          this.loaders.push( loader )
        }
      }
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
      texture.minFilter = THREE.LinearFilter
      texture.magFilter = THREE.NearestFilter

      textures[ loader.__id ] = texture

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

module.exports = GlobalLoader
