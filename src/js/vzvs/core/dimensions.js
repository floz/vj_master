const stage = require( "mnf/core/stage" )
const stage3d = require( "mnf/core/stage3d" )
const Signal = require( "mnf/events/Signal" )

const data = require( "vzvs/core/data" )

const onUpdate = new Signal()
const dimensions = { width: -1, height: -1, tiles: { x: -1 , y: - 1 } }

function onResize() {
  const vFOV = stage3d.camera.fov * Math.PI / 180
  dimensions.height = 2 * Math.tan( vFOV / 2 ) * data.camera.distance
  const aspect = stage.width / stage.height
  dimensions.width = dimensions.height * aspect

  dimensions.tiles.x = dimensions.width / data.grid.cols
  dimensions.tiles.y = dimensions.height / data.grid.lines 

  onUpdate.dispatch()
}
stage.onResize.add( onResize )
onResize()

module.exports = dimensions
module.exports.onUpdate = onUpdate
