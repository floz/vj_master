const data = require( "vzvs/core/data" )
const VZVSMesh = require( "vzvs/core/VZVSMesh" )

class LayerShapes extends THREE.Group {

  constructor( dataShapes, colors ) {
    super()

    this.dataShapes = dataShapes
    this.colors = colors
    this.create()
  }

  create() {
    this.meshs = []
    for( let i = 0, n = this.dataShapes.length; i < n; i++ ) {
      let dataShape = this.dataShapes[ i ]

      let mat = new THREE.MeshBasicMaterial( {
        map: data.textures.shapes_cross,
        color: this.colors.get(),
        transparent: true,
        depthTest: true,
        depthWrite: true
      } )

      let mesh = new VZVSMesh( dataShape, mat, true, true )
      this.add( mesh )
      this.meshs.push( mesh )
    }
  }

  dispose() {
    for( let i = 0, n = this.meshs.length; i < n; i++ ) {
      this.meshs[ i ].dispose()
    }
    this.meshs = null
  }

}

module.exports = LayerShapes
