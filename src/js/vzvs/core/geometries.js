const data = require( "vzvs/core/data" )

const geosPerWidthDetailed = []
const geosPerWidthNotDetailed = []

function build() {
  for( let x = 1; x < 24; x++ ) {
    let geosPerHeightDetailed = []
    let geosPerHeightNotDetailed = []
    for( let y = 1; y < 24; y++ ) {
      let verticesX = x * data.geos.vertices
      let verticesY = y * data.geos.vertices
      // ( x, y, verticesX, verticesY ) ?
      geosPerHeightDetailed[ y - 1 ] = new THREE.PlaneBufferGeometry( 1, 1, verticesX, verticesY )
      geosPerHeightNotDetailed[ y - 1 ] = new THREE.PlaneBufferGeometry( 1, 1, 1, 1 )
    }
    geosPerWidthDetailed[ x - 1 ] = geosPerHeightDetailed
    geosPerWidthNotDetailed[ x - 1 ] = geosPerHeightNotDetailed
  }
}
build()

module.exports.get = ( width, height, detailed = true ) => {
  if( detailed ) {
    return geosPerWidthDetailed[ width - 1 ][ height - 1 ]
  }
  return geosPerWidthNotDetailed[ width - 1 ][ height - 1 ]
}

module.exports.build = build
