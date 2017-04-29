precision highp float;

uniform sampler2D tSimCurr;
uniform sampler2D tBasePos;
uniform sampler2D tSimKaleid;
uniform float speedScale;
uniform float bounds;
uniform float isInitialiazed;

varying vec2 vUv;

float map(float value, float inMin, float inMax, float outMin, float outMax) {
  return outMin + (outMax - outMin) * (value - inMin) / (inMax - inMin);
}

void main() {

  vec4 basePos = texture2D( tBasePos, vUv );
  // vec2 uvNew = vec2( .5, .5 );
  // uvNew.x += map( basePos.x, -bounds * .5, bounds * .5, 0., 1. );
  // uvNew.y += map( basePos.y, -bounds * .5, bounds * .5, 0., 1. );
  vec3 signs = vec3( basePos.x < 0. ? -1. : 1., basePos.y < 0. ? -1. : 1., basePos.z < 0. ? -1. : 1. );
  // vec2 signs = vec2( 1., 1. );

  vec4 simCurr = texture2D( tSimCurr, vUv );
  simCurr.x += basePos.x * ( 1. - isInitialiazed );
  simCurr.y += basePos.y * ( 1. - isInitialiazed );
  simCurr.z += basePos.z * ( 1. - isInitialiazed );

  vec2 uvKaleids = vec2(
    map( simCurr.x, -bounds * .5, bounds * .5, 0., 1. ),
    map( simCurr.y, -bounds * .5, bounds * .5, 0., 1. )
  );
  vec4 simKaleid = texture2D( tSimKaleid, uvKaleids );

  float speed = 1. + basePos.w;
  speed *= 2.;

  simCurr.x += ( map( simKaleid.x, 0., 1., -1., 1. ) * speed * signs.x );
  if( simCurr.x < -bounds * .5 ) {
    // simCurr.x = 0.;
    // simCurr.y = 0.;
    simCurr.x = 0.;
    simCurr.y = 0.;
    simCurr.z = 0.;
  }
  if( simCurr.x > bounds * .5 ) {
    // simCurr.x = 0.;
    // simCurr.y = 0.;
    simCurr.x = 0.;
    simCurr.y = 0.;
    simCurr.z = 0.;
  }
  simCurr.y += ( map( simKaleid.y, 0., 1., -1., 1. ) * speed * signs.y );
  if( simCurr.y < -bounds * .5 ) {
    // simCurr.x = 0.;
    // simCurr.y = 0.;
    simCurr.x = 0.;
    simCurr.y = 0.;
    simCurr.z = 0.;
  }
  if( simCurr.y > bounds * .5 ) {
    // simCurr.x = 0.;
    // simCurr.y = 0.;
    simCurr.x = 0.;
    simCurr.y = 0.;
    simCurr.z = 0.;
  }
  simCurr.z += ( map( simKaleid.z, 0., 1., -1., 1. ) * speed * signs.z );
  if( simCurr.z < -bounds * .35 ) {
    // simCurr.x = 0.;
    // simCurr.y = 0.;
    simCurr.x = 0.;
    simCurr.y = 0.;
    simCurr.z = 0.;
  }
  if( simCurr.z > bounds * .35 ) {
    // simCurr.x = 0.;
    // simCurr.y = 0.;
    simCurr.x = 0.;
    simCurr.y = 0.;
    simCurr.z = 0.;
  }

	gl_FragColor = simCurr;

}
