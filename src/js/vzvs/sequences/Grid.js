const random = require( "mnf/utils/random" )

const data = require( "vzvs/core/data" )

const SHAPES_START = [ 0, 1, .5, 2, .5, 2 ]

class Grid {

  constructor() {
    this.generate()
  }

  generate() {
    this.generateImages()
    this.generateShapes()
    this.generateBlocs()
  }

  // ----------------------------------------- IMAGES

  generateImages() {
    this.images = {
      main: {},
      secondary: {},
    }

    this.isMainImageHorizontal = false
    this.generateMainImage( this.images.main )
    this.generateSecondaryImage( this.images.secondary )
  }

  generateMainImage( dataImage ) {
    let x, y, w, h
    let marginX = 3
    let marginY = 1

    let value = random()
    if( value < .5 ) { // Large photo
      marginX = 1 + random() * 3 >> 0
      x = marginX
      w = data.grid.cols * .7 + data.grid.cols * random() * .3 - marginX * 2

      value = random()
      marginY = 2
      if( value < .75 ) { // Horizontal Photo
        let hBase = 4
        let hVariable = random() * 2 >> 0
        h = hBase + hVariable
        // On remove les margins + le height au nombre de lines totales
        let hAvailable = data.grid.lines - marginY * 2 - h
        y = marginY + hAvailable * random() >> 0
      } else { // Photo full
        h = data.grid.lines - marginY * 2
        y = marginY
      }
      this.isMainImageHorizontal = true
    } else { // Vertical photo
      y = marginY
      w = 4
      h = data.grid.lines - marginY * 2
      value = random()
      if( value < .5 ) { // Left
        x = 4
      } else { // Right
        x = 8
      }
    }

    dataImage.x = x
    dataImage.y = y
    dataImage.width = w
    dataImage.height = h
  }

  generateSecondaryImage( dataImage ) {
    if( this.isMainImageHorizontal ) {
      this.generateSecondaryVerticalImage( dataImage )
    } else {
      this.generateSecondaryHorizontalImage( dataImage )
    }
  }

  generateSecondaryVerticalImage( dataImage ) {
    let x, y, w, h
    let marginY = 1
    y = marginY
    w = 4
    h = data.grid.lines * .5 + random() * data.grid.lines * .5 - marginY * 2
    const value = random()
    if( value < .5 ) { // Left
      x = 4
    } else { // Right
      x = 8
    }

    dataImage.x = x
    dataImage.y = y
    dataImage.width = w
    dataImage.height = h
  }

  generateSecondaryHorizontalImage( dataImage ) {
    let x, y, w, h
    let marginX = 1
    let marginY = 2

    x = marginX
    w = data.grid.cols - marginX * 2

    const value = random()
    if( value < .75 ) { // Horizontal Photo
      let hBase = 4
      let hVariable = random() * 2 >> 0
      h = hBase + hVariable
      // On remove les margins + le height au nombre de lines totales
      let hAvailable = data.grid.lines - marginY * 2 - h
      y = marginY + hAvailable * random() >> 0
    } else { // Photo full
      h = data.grid.lines - marginY * 2
      y = marginY
    }

    dataImage.x = x
    dataImage.y = y
    dataImage.width = w
    dataImage.height = h
  }

  // ----------------------------------------- SHAPES

  generateShapes() {
    this.shapes = []

    const startX = SHAPES_START[ data.grid.shapes.coefPlacementX - 1 ]//data.grid.shapes.coefPlacement % 2 == 0 ? 1 : 0
    const startY = SHAPES_START[ data.grid.shapes.coefPlacementY - 1 ]//data.grid.shapes.coefPlacement % 2 == 0 ? 1 : 0

    const addX = data.grid.shapes.coefPlacementX % 2 == 0 ? 0 : 1
    const addY = data.grid.shapes.coefPlacementY % 2 == 0 ? 0 : 1
    const gridX = ( data.grid.cols + addX ) >> 0
    const gridY = ( data.grid.lines + addY ) >> 0

    for( let y = 0; y < gridY; y += data.grid.shapes.coefPlacementY ) {
      for( let x = 0; x < gridX; x += data.grid.shapes.coefPlacementX ) {
        let currentChance = data.grid.shapes.baseFrequency + data.grid.shapes.chanceFrequency * random()
        let value = random()
        if( value > currentChance ) {
          continue
        }

        this.shapes.push( {
          x: startX + x - .5,
          y: startY + y - .5,
          width: data.grid.shapes.coefSize,
          height: data.grid.shapes.coefSize,
        } )
      }
    }
  }

  // ----------------------------------------- SQUARES

  generateBlocs() {
    this.blocs = []

    const possibilities = [ 2, 4, 8 ]
    const idx = possibilities.length * random() >> 0
    const step = possibilities[ idx ]

    for( let y = 0; y < data.grid.cols; y += step ) {
      for( let x = 0; x < data.grid.lines; x += step ) {
        let currentChance = data.grid.blocs.baseFrequency + data.grid.blocs.chanceFrequency * random()
        let value = random()
        if( value > currentChance ) {
          continue
        }

        this.blocs.push( {
          x: x,
          y: y,
          width: step,
          height: step
        } )
      }
    }

  }

}

module.exports = Grid
