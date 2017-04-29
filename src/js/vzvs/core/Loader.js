const data = require( "./data" )

const Signal = require( "mnf/events/Signal" )
const uString = require( "mnf/utils/string" )

const URL_BASE = "./imgs/"

class Loader {

  constructor() {
    this.onComplete = new Signal()

    this.loaders = []
    this.urls = []
    this.urlsFrames = []
    this.grabUrls()

    this.prepare()
  }

  grabUrls() {
    for( let i = 0, n = data.shapes.length; i < n; i++ ) {
      let shape = data.shapes[ i ]
      this.urls.push( URL_BASE + shape.filename )
    }

    for( let i = 0, n = data.sequences.length; i < n; i++ ) {
      let sequence = data.sequences[ i ]
      this.urls.push( URL_BASE + sequence.assets.image )
      this.urls.push( URL_BASE + sequence.assets.mask )
      if( sequence.assets.adds.length ) {
        for( let j = 0, m = sequence.assets.adds.length; j < m; j++ ) {
          this.urls.push( URL_BASE + sequence.assets.adds[ j ] )
        }
      }
    }

    for( let i = 0, n = data.frames; i < n; i++ ) {
      let id = uString.add0( i + 1, 2 )
      this.urlsFrames.push( URL_BASE + "frames/" + id + "_photos-main.png" )
      this.urlsFrames.push( URL_BASE + "frames/" + id + "_photos-secondary.png" )
      this.urlsFrames.push( URL_BASE + "frames/" + id + "_shapes.png" )
    }
  }

  prepare() {
    for( let i = 0, n = this.urls.length; i < n; i++ ) {
      let loader = new THREE.TextureLoader()
      loader.__url = this.urls[ i ]
      loader.__id = uString.getFileNameFromURL( loader.__url )
      this.loaders.push( loader )
    }

    for( let i = 0, n = this.urlsFrames.length; i < n; i++ ) {
      let loader = new THREE.TextureLoader()
      loader.__url = this.urlsFrames[ i ]
      loader.__id = "frames_" + uString.getFileNameFromURL( loader.__url )
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
      // texture.wrapS = THREE.RepeatWrapping
      // texture.wrapT = THREE.RepeatWrapping
      texture.minFilter = THREE.LinearFilter
      texture.magFilter = THREE.NearestFilter
      // texture.anisotropy = 2
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
