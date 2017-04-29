const data = require( "vzvs/core/data" )
const VZVSMesh = require( "vzvs/core/VZVSMesh" )

class LayerBlocs extends THREE.Group {

  constructor( dataBlocs, colors ) {
    super()

    this.dataBlocs = dataBlocs
    this.colors = colors
    this.create()
  }

  create() {
    this.meshs = []
    for( let i = 0, n = this.dataBlocs.length; i < n; i++ ) {
      let dataBloc = this.dataBlocs[ i ]

      let mat = new THREE.MeshBasicMaterial( {
        color: this.colors.get(),
        transparent: true,
        depthTest: true,
        depthWrite: true
      } )

      let mesh = new VZVSMesh( dataBloc, mat, false, true )
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

module.exports = LayerBlocs
