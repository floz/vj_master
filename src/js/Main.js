Projector

//

const VJManager = require( "vj/VJManager" )

const loader = new ( require( "vj/GlobalLoader" ) )()
loader.onComplete.add( () => {
  const hasMidi = false

  const manager = new VJManager()
  manager.onInit.add( () => {
    manager.play( "vzvs" )
  } )
  manager.init( hasMidi )
} )
loader.load()
