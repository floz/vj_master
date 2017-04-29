const stage = require( "mnf/core/stage" )
const stage3d = require( "mnf/core/stage3d" )
// const audio = require( "mnf/core/audio2" )
const audio = require( "mnf/core/audio" )
const gui = require( "mnf/utils/gui" )
const midi = require( "mnf/midi/midi" )

const dimensions = require( "vzvs/core/dimensions" )
const data = require( "vzvs/core/data" )
const vjVars = require( "vzvs/core/vjVars" )
// const frames = require( "vzvs/core/frames" )

const PictureParticular = require( "./picparts/PictureParticular" )
const Sequence = require( "./sequences/Sequence" )

class VZVS {

  constructor() {
    stage3d.control.radius = stage3d.control.__radius = data.camera.distance + 300
    stage3d.control._phi = Math.PI * .5
    stage3d.control._theta = Math.PI * .5
    stage3d.camera.fov = 50
    stage3d.camera.updateProjectionMatrix()

    // this.pictureParticular = new PictureParticular( "hands", 500 )
    // stage3d.add( this.pictureParticular )

    const fSequence = gui.addFolder( "Sequence" )
    // const fShapes = fSequence.addFolder( "Shapes" )
    // fShapes.add( data.grid.shapes, "baseFrequency", 0, 1 ).step( .01 )
    // fShapes.add( data.grid.shapes, "chanceFrequency", 0, 1 ).step( .01 )
    // fShapes.add( data.grid.shapes, "coefPlacementX", 1, 6 ).step( 1 )
    // fShapes.add( data.grid.shapes, "coefPlacementY", 1, 6 ).step( 1 )
    // fShapes.add( data.grid.shapes, "coefSize", .5, 5 ).step( 1 )
    // fShapes.open()
    // const fBlocs = fSequence.addFolder( "Blocs" )
    // fBlocs.add( data.grid.blocs, "baseFrequency", 0, 1 ).step( .01 )
    // fBlocs.add( data.grid.blocs, "chanceFrequency", 0, 1 ).step( .01 )
    // fBlocs.open()
    fSequence.add( this, "createNewSequence" )
    fSequence.open()

    // audio.start()
  }

  start() {
    this.sequence = new Sequence()
    vjVars.activate()
  }

  createNewSequence = () => {
    if( this.sequence ) {
      this.sequence.dispose()
    }
    this.sequence = new Sequence( "timwu_01" )
  }

  onUpdate = () => {
    // this.pictureParticular.update()
  }

  dispose() {
    this.sequence.dispose()
    vjVars.dispose()
  }

}

module.exports = VZVS
