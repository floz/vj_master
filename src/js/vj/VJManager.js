const keyboard = require( "mnf/utils/keyboard" )
const Signal = require( "mnf/events/Signal" )
const midi = require( "mnf/midi/midi" )
const stage3d = require( "mnf/core/stage3d" )
const OrbitControl = require( "mnf/3d/OrbitControl" )
// const audio = require( "mnf/core/audio2" )
const audio = require( "mnf/core/audio" )

const PostProcessManager = require( "./PostProcessManager" )

const data = require( "./data" )

class VJManager {

  constructor() {
    this.onInit = new Signal()

    stage3d.control = new OrbitControl( stage3d.camera, null, 1000 )

    new PostProcessManager()
  }

  init( hasMidi ) {
    this.vjsById = {}
    for( let i = 0, n = data.length; i < n; i++ ) {
      const dataVj = data[ i ]
      this.vjsById[ dataVj.id ] = dataVj
    }

    midi.onInit.add( () => {
      audio.start()
      this.onInit.dispatch()
    } )
    midi.init( { hasFallbackPG: true } )
  }

  play( id ) {
    const c = this.vjsById[ id ].class

    this.vj = new c()
    this.vj.start()
  }

}

module.exports = VJManager
