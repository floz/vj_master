const fs = require( "./shaders/ParticlesSim.fs" )

const SimpleFBO = require( "mnf/3d/fbo/SimpleFBO" )
const random = require( "mnf/utils/random" )
const gui = require( "mnf/utils/gui" )
const uMaths = require( "mnf/utils/maths" )

const DATA = {
  lifeMax: 100,
  lifeMin: 20,
  speedMin: .5,
  speedMax: 5.5,
  optMov: 1
}

const lifeMax = 100
const lifeMin = 20

function poissonRandomNumber(lambda) {
    var L = Math.exp(-lambda),
        k = 0,
        p = 1;

    do {
        k = k + 1;
        p = p * Math.random();
    } while (p > L);

    return k - 1;
}

function newRand() {
  const unif = Math.random()
  return beta = Math.pow( Math.sin(unif*Math.PI/2), 2 )
}

let geom = new THREE.SphereBufferGeometry(100,32,32)
const countPoints = geom.attributes.position.count
console.log( countPoints )
function createRandomPoints(range, scale = 1) {

  var newArray = []

  let i= 0
  let i3 = 0

  while( i < countPoints ){

  	// if ( Math.random() < .75 ? 0 : Math.random() ) {

  		// let scale = Math.random() / 2

      let arr = [ geom.attributes.position.array[i3], geom.attributes.position.array[i3 + 1], geom.attributes.position.array[i3 + 2] ]
      newArray.push( arr )


  	// }
  	i++
  	i3+=3
  }

  return newArray
}

class ParticlesSim extends SimpleFBO {

  constructor( countSpheres, countParticles ) {
    const w = countSpheres
    const h = countPoints

    const count = w * h

    const count4 = count * 4
    let idxParticles = 0
    let idx = 0
    let ratio = 1

    let rAdd = 100

    const a = createRandomPoints( 1000 )

    const data = new Float32Array( count4 )
    const texture = new THREE.DataTexture( data, w, h, THREE.RGBAFormat, THREE.FloatType )
    for( let i = 0; i < count4; i += 4 ) {
      // let phi = Math.random() * Math.PI * 2
      // let theta = Math.random() * Math.PI * .75 - Math.PI * .35
      // let r = radius + Math.random() * 10 - 5

      let ar = a[ idxParticles ]
      let x = ( ar[ 0 ] * ratio + Math.random() * 10 - 5 )
      let y = ( ar[ 1 ] * ratio + Math.random() * 10 - 5 )
      let z = ( ar[ 2 ] * ratio + Math.random() )
      if( Math.random() < .2 ) {
      }

      texture.image.data[ i + 0 ] = x
      texture.image.data[ i + 1 ] = y
      texture.image.data[ i + 2 ] = z
      texture.image.data[ i + 3 ] = random() * 10000//random() * DATA.lifeMax + DATA.lifeMin // lifespan

      idxParticles++
      if( idxParticles > countPoints - 1 ) {
        idxParticles = 0

        ratio += 1 + Math.random() * 1
      }
    }
    texture.needsUpdate = true

    const uniforms = {
      tBaseData: { type: "t", value: texture },
      bounds: { type: "v2", value: new THREE.Vector2( 0, 0 ) },
      noiseZ: { type: "f", value: 0 },
      optMov: { type: "f", value: 0 }
    }

    super( w, h, uniforms, fs )
    this.tBaseData = texture
    this.count4 = count4
    this.wBound = 0
    this.hBound = 0


  }



  update( dt ) {
    // for( let i = 0; i < this.count4; i += 4 ) {
    //   this.tBaseData.image.data[ i + 3 ] -= 1
    //   // if( this.tBaseData.image.data[ i + 3 ] <= 0 ) {
    //   //   this.tBaseData.image.data[ i + 0 ] = random() * this.wBound - ( this.wBound * .5 )
    //   //   this.tBaseData.image.data[ i + 1 ] = random() * this.hBound - ( this.hBound * .5 )
    //   //   this.tBaseData.image.data[ i + 2 ] = DATA.speedMin + random() * DATA.speedMax // moveSpeed
    //   //   this.tBaseData.image.data[ i + 3 ] = random() * DATA.lifeMax + DATA.lifeMin // lifespan
    //   // }
    // }
    // this.tBaseData.needsUpdate = true

    this.simMaterial.uniforms.noiseZ.value += dt * .01
    // this.simMaterial.uniforms.optMov.value = DATA.optMov
    super.update()
  }

}

module.exports = ParticlesSim
module.exports.debug = () => {
  const fParticles = gui.addFolder( "Particles" )
  // fParticles.add( DATA, "lifeMin", 1, 100 ).step( 1 )
  // fParticles.add( DATA, "lifeMax", 1, 200 ).step( 1 )
  // fParticles.add( DATA, "speedMin", 0.05, 2 ).step( .01 )
  // fParticles.add( DATA, "speedMax", 0.05, 10 ).step( .01 )
  // fParticles.add( DATA, "optMov", 0., 1 ).step( .01 )
  fParticles.open()
}
