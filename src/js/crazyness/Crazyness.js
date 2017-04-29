const vs = require( "./shaders/base.vs" )
const fs = require( "./shaders/base.fs" )

const textures = require( "vj/textures" )

const stage = require( "mnf/core/stage" )
const stage3d = require( "mnf/core/stage3d" )
const audio = require( "mnf/core/audio" )
const audio2 = require( "mnf/core/audio2" )
const ColorPool = require( "mnf/utils/ColorPool" )
const keyboard = require( "mnf/utils/keyboard" )
const colors = require( "./colors" )

const Rect = require( "./Rect")
const Circle = require( "./Circle")

class Crazyness {

  constructor() {
    this.geom = new THREE.PlaneBufferGeometry( 100, 100, 1, 1 )

    this.hue = 120

    this.idTexturesAvailable = [
      "sign_circle",
      "sign_dot",
      "sign_cross",
      "sign_circletriangletop",
      "sign_tilde",
      "sign_smallcircletop",
      "sign_halfcircleright",
      "sign_powerkindadown",
      "sign_powerkindaright",
      "sign_arrowbot",
      "sign_baton",
    ]
  }

  generateMats( alpha, lum ){
    const mats = []
    for( let i = 0, n = this.idTexturesAvailable.length; i < n; i++ ) {
      let texture = textures[ this.idTexturesAvailable[ i ] ]
      let uniforms = {
        texture: { type: "t", value: texture },
        // color: { type: "c", value: colorPool.get() },
        color: { type: "c", value: colors.get( lum ) },
        alpha: { type: "f", value: alpha },
        vol: { type: "f", value: 0 }
      }
      let mat = new THREE.RawShaderMaterial( {
        uniforms: uniforms,
        vertexShader: vs,
        fragmentShader: fs,
        side: THREE.DoubleSide,
        type: "CrazyMat",
        transparent: true
      } )
      mat.__id = this.idTexturesAvailable[ i ]

      mats.push( mat )
    }
    return mats
  }

  start() {
    audio2.start()


    // stage3d.setClearColor( 0x0a1739 )
    stage3d.control.radius = stage3d.control.__radius = 2000

    this.createNewSerie()

    stage.onUpdate.add( this.onUpdate )
    audio.onBeat.add( this.onBeat )
    keyboard.onDown.add( this.onDown )
  }

  onDown = ( touch ) => {
    if( touch == keyboard.touches[ "space" ] ) {
      this.clear()
      this.createNewSerie()
    }
  }

  clear() {
    for( let i = 0, n = this.elements.length; i < n; i++ ) {
      this.elements[ i ].dispose()
      stage3d.remove( this.elements[ i ] )
    }
  }

  createNewSerie() {
    this.elements = []

    this.hue += 30 + Math.random() * 30 >> 0

    colors.set( this.hue )
    stage3d.setClearColor( colors.getFog() )

    // for( let i = 0; i < 6; i++ ) {
    //   if( i % 2 == 0 ) {
    //     let c = new Circle( this.geom, this.generateMats( .5, .4 + .6 * i / 10 ) )
    //     c.create( 40, 32, 200, 100, .75 )
    //     c.position.z = i * 200
    //     c.start()
    //     c.__rotRatio = .5 + Math.random() * .5
    //     this.elements.push( c )
    //     stage3d.add( c )
    //   } else {
    //     let c = new Circle( this.geom, this.generateMats( .5, .4 + .6 * i / 10 ) )
    //     c.create( 30, 16, 400, 50, .5 )
    //     c.position.z = i * 200
    //     c.start()
    //     c.__rotRatio = -( .5 + Math.random() * .5 )
    //     this.elements.push( c )
    //     stage3d.add( c )
    //   }
    // }

    c = new Circle( this.geom, this.generateMats( .5, .6 ) )
    c.create( 30, 32, 75, 75, .25 )
    c.position.z = 0
    c.start()
    c.__rotRatio = .1 + Math.random() * .2
    this.elements.push( c )
    stage3d.add( c )

    let c = new Circle( this.geom, this.generateMats( .5, .7 ) )
    c.create( 40, 16, 75, 50, .75 )
    c.position.z = 200
    c.start()
    c.__rotRatio = .5 + Math.random() * .5
    this.elements.push( c )
    stage3d.add( c )

    c = new Circle( this.geom, this.generateMats( .75, .9 ) )
    c.create( 50, 16, 50, 125, .5 )
    c.position.z = 400
    c.start()
    c.__rotRatio = 1 + Math.random() * 1
    stage3d.add( c )
    this.elements.push( c )
  }

  onBeat = () => {
    for( let i = 0, n = this.elements.length; i < n; i++ ) {
      let el = this.elements[ i ]
      el.rotation.z += Math.PI * .02 * el.__rotRatio
    }
  }

  onUpdate = () => {
    for( let i = 0, n = this.elements.length; i < n; i++ ) {
      let el = this.elements[ i ]
      el.rotation.z += .0025 * el.__rotRatio
    }
  }

}

module.exports = Crazyness
