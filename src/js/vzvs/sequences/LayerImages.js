const textures = require( "vj/textures" )

const data = require( "vzvs/core/data" )
const VZVSMesh = require( "vzvs/core/VZVSMesh" )

const PictureParticular = require( "vzvs/picparts/PictureParticular" )
// const vs = require( "vzvs/picparts/shaders/Picture.vs" )
// const fs = require( "vzvs/picparts/shaders/Picture.fs" )

class LayerImages extends THREE.Group {

  constructor( dataFrames, idSequence ) {
    super()

    this.dataFrames = dataFrames
    this.idSequence = idSequence
    this.createMain()
    this.createSecondary()
  }

  createMain() {
    const img = textures[ this.idSequence ]

    const uniforms = {
      tPic: { type: "t", value: img },
      picWidth: { type: "f", value: img.width },
      picHeight: { type: "f", value: img.height },
      maskVisible: { type: "f", value: 0 },
      onlyLeft: { type: "f", value: 0 },
      depthValue: { type: "f", value: 0 },
      depthInvert: { type: "f", value: 0 }
    }
    // const mat = new THREE.MeshBasicMaterial( {
    //   color: 0x0000ff,
    //   opacity: .7,
    //   transparent: true,
    //   depthTest: true,
    //   depthWrite: true
    // } )
    // this.main = new VZVSMesh( this.dataImages.main, mat )
    // this.add( this.main )

    this.main = new PictureParticular( this.idSequence, this.dataFrames.photosMain[ 0 ] )
    this.add( this.main )
  }

  createSecondary() {
    for( let i = 0, n = this.dataFrames.photosSecondary.length; i < n; i++ ) {
      let dataPhotoSecondary = this.dataFrames.photosSecondary[ i ]

      const mat = new THREE.MeshBasicMaterial( {
        color: 0x00ff55,
        opacity: .4,
        transparent: true,
        depthTest: true,
        depthWrite: true
      } )
      this.secondary = new VZVSMesh( dataPhotoSecondary, mat )
      this.secondary.position.z = -1
      this.add( this.secondary )
    }
  }

  dispose() {
    this.main.dispose()
    this.secondary.dispose()
  }

}

module.exports = LayerImages
