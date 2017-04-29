const BaseCrazy = require( "./BaseCrazy" )

class Circle extends BaseCrazy {

  constructor( geomBase, mats ) {
    super( geomBase, mats )
  }

  create( countStep = 40, countCircles = 16, rBase = 75, rAdd = 50, baseScale = 1 ) {
    let x = 0
    let y = 0

    let aStep = Math.PI  * 2 / countStep
    let a = 0
    let r = rBase
    for( let i = 0, n = countCircles ; i < n; i++ ) {
      for( let j = 0; j < countStep; j++ ) {
        x = Math.cos( a ) * r
        y = Math.sin( a ) * r

        let m = this.createMesh( baseScale )
        m.position.set( x, y, 0 )
        a += aStep
      }
      a = 0
      r += rAdd
    }
  }

}

module.exports = Circle
