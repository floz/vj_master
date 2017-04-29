precision highp float;

uniform sampler2D tBaseData;
uniform sampler2D tSimParticles;
uniform sampler2D tColors;
uniform vec2 bounds;

attribute vec2 uvData;

varying vec2 uvColors;

float map(float value, float inMin, float inMax, float outMin, float outMax) {
  return outMin + (outMax - outMin) * (value - inMin) / (inMax - inMin);
}

void main() {

  vec4 baseData = texture2D( tBaseData, uvData );
  vec4 simData = texture2D( tSimParticles, uvData );
  vec4 colors = texture2D( tColors, uvData );

  vec3 pos = vec3( baseData.x, baseData.y, baseData.z );

  float bwh = bounds.x * .5;
  float bhh = bounds.y * .5;

  uvColors = vec2( 0. );
  uvColors.x = map( baseData.x, -bwh, bwh, 0., 1. );
  uvColors.y = map( baseData.y, -bhh, bhh, 0., 1. );

  gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );
  gl_PointSize = 20.;

}
