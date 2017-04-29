const ColorPool = require( "mnf/utils/ColorPool" )

const data = require( "vzvs/core/data" )
const dataSequences = data.sequences

const ids = []

const sequences = []
const sequencesById = {}
for( let i = 0, n = dataSequences.length; i < n; i++ ) {
  dataSequence = dataSequences[ i ]
  dataSequence.colorsBlocs = new ColorPool( dataSequence.colorsBlocs, true )
  dataSequence.colorsShapes = new ColorPool( dataSequence.colorsShapes, true )
  dataSequence.colorsBg = new ColorPool( dataSequence.colorsBg, true )
  sequencesById[ dataSequence.id ] = dataSequence
  sequences.push( dataSequence )

  ids.push( dataSequence.id )
}

module.exports.getSequenceById = ( id ) => {
  return sequencesById[ id ]
}

module.exports.ids = ids
