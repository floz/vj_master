const uString = require( "mnf/utils/string" )
const uDom = require( "mnf/utils/dom" )

const data = require( "vzvs/core/data" )

const frames = []

const canvas = document.createElement( "canvas" )
canvas.width = data.grid.cols
canvas.height = data.grid.lines
const ctx = canvas.getContext( "2d" )
uDom.addAbsolute( canvas )

function process( idx ) {
  const idx0 = uString.add0( idx, 2 )

  const frame = {}
  frame.photosMain = processPart( data.textures[ "frames_" + idx0 + "_photos-main" ] )
  frame.photosSecondary = processPart( data.textures[ "frames_" + idx0 + "_photos-secondary" ] )
  frame.shapes = processPart( data.textures[ "frames_" + idx0 + "_shapes" ] )

  frames.push( frame )
}

function processPart( texture ) {
  const parts = []

  const img = texture.image
  ctx.clearRect( 0, 0, data.grid.cols, data.grid.lines )
  ctx.drawImage( img, 0, 0 )

  let dataImg = ctx.getImageData( 0, 0, data.grid.cols, data.grid.lines ).data

  let i4 = 0
  let hasFoundSomething = false
  for( let i = 0, n = dataImg.length; i < n; i += 4 ) {
    let x = i4 % data.grid.cols
    let y = Math.floor( i4 / data.grid.cols )

    let r = dataImg[ i + 0 ]
    let g = dataImg[ i + 1 ]
    let b = dataImg[ i + 2 ]

    if( r != 0 ) {
      let xStart = x
      let yStart = y
      let nx = xStart
      let ny = yStart

      let canSearch = true
      // x first
      while( canSearch ) {
        nx += 1
        let idxNew = ( ny * data.grid.cols + nx ) * 4

        let nr = dataImg[ idxNew + 0 ]
        let ng = dataImg[ idxNew + 1 ]
        let nb = dataImg[ idxNew + 2 ]

        if( nr != r || ng != g || nb != b ) {
          canSearch = false
        }
      }
      nx -= 1

      canSearch = true
      // y then
      while( canSearch ) {
        ny += 1
        let idxNew = ( ny * data.grid.cols + nx ) * 4

        let nr = dataImg[ idxNew + 0 ]
        let ng = dataImg[ idxNew + 1 ]
        let nb = dataImg[ idxNew + 2 ]

        if( nr != r || ng != g || nb != b ) {
          canSearch = false
        }
      }
      nx += 1

      let part = {
        x: xStart,
        y: yStart,
        width: nx - xStart,
        height: ny - yStart
      }
      parts.push( part )

      // update canvas to remove the infos we just parsed
      ctx.clearRect( part.x, part.y, part.width, part.height )
      dataImg = ctx.getImageData( 0, 0, data.grid.cols, data.grid.lines ).data
    }

    i4 += 1
  }

  return parts
}

module.exports.init = () => {
  for( let i = 0; i < data.frames; i++ ) {
    process( i + 1 )
  }
}

module.exports.get = ( idx ) => {
  return frames[ idx ]
}
