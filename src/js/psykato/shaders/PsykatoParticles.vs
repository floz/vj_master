precision highp float;

// uniform mat4 projectionMatrix;
// uniform mat4 modelViewMatrix;

uniform sampler2D tSimParticles;
uniform float bounds;

attribute vec2 uvData;

varying vec2 vUv;

float map(float value, float inMin, float inMax, float outMin, float outMax) {
  return outMin + (outMax - outMin) * (value - inMin) / (inMax - inMin);
}

void main() {

  // vUv = uvData;

  vec3 pos = texture2D( tSimParticles, uvData ).xyz;
  float z = pos.z;
  pos.z = 0.;

  vUv = vec2( 0. );
  vUv.x = map( pos.x, -bounds * .5, bounds * .5, 0., 1. );
  vUv.y = map( pos.y, -bounds * .5, bounds * .5, 1., 0. );

  gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );
  //
  // gl_PointSize =  2. * ( ( bounds * .5 ) / - pos.z );
  gl_PointSize = map( z, -bounds * .5, bounds * .5, .25, 3. );
  // gl_PointSize = 10.0;
  // gl_Position = projectionMatrix * modelViewMatrix * vec4( vec3( 0. ), 1.0 );
  // gl_PointSize = 2.;
}
