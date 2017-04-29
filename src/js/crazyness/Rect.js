const BaseCrazy = require( "./BaseCrazy" )

class Rect extends BaseCrazy {

  constructor( geomBase, mats ) {
    super( geomBase, mats )

    this.lines = 12
    this.cols = 12
    this.scaleOrigin = .5
    this.step = 100 * .75 * this.scaleOrigin

    this.create()
  }

  create() {
    let ox = -this.cols * this.step * .5
    let oy = -this.lines * this.step * .5

    let px = ox
    let py = oy
    let pz = 0
    for( let x = 0; x < this.cols; x++ ) {
      for( let y = 0; y < this.lines; y++ ) {
        if( Math.random() < .825 ) {
          let m = this.createMesh( this.scaleOrigin )
          m.position.set( px, py, pz )
        }

        py += this.step
      }
      px += this.step
      py = oy
    }
  }

}

module.exports = Rect
