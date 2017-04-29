const stage = require( "mnf/core/stage" )
const gui = require( "mnf/utils/gui" )

const data = require( "psykato/core/data" )
const vs = require( "psykato/shaders/PsykatoPlane.vs" )
const fs = require( "psykato/shaders/PsykatoPlane.fs" )

class PsykatoPlane extends THREE.Mesh {

  constructor() {
    const w = 595
    const h = 893

    const geo = new THREE.PlaneBufferGeometry( w, h, 1, 1 )

    const uniforms = {
      map: { type: "t", value: data.textures.shinjuku },
      angle: { type: "f", value: 0 },
      kaleidRadius: { type: "f", value: 1 },
      time: { type: "f", value: 0 },
      timeCoef: { type: "f", value: 0 }
    }

    const mat = new THREE.RawShaderMaterial( {
        uniforms: uniforms,
        vertexShader: vs,
        fragmentShader: fs,
        side: THREE.DoubleSide,
        type: "PsykatoPlane"
      }
    )

    super( geo, mat )

    const f = gui.addFolder( "PsykatoPlane" )
    f.add( uniforms.angle, "value", -Math.PI, Math.PI, .01 ).name( "angle" )
    f.add( uniforms.kaleidRadius, "value", 1, 2, .001 ).name( "kaleidRadius")
    f.add( uniforms.timeCoef, "value", 0, .1, .01 ).name( "timeCoef" )
    f.open()

    stage.onUpdate.add( this.onUpdate )
  }

  onUpdate = () => {
    this.material.uniforms.time.value += 1
  }

}

module.exports = PsykatoPlane
