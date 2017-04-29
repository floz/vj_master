precision highp float;

uniform sampler2D tPic;
uniform float maskVisible;
uniform float onlyLeft;
uniform vec4 uvDisp;
uniform float time;
uniform vec2 dispDecal;
uniform vec2 dispDivide;
uniform vec2 dispOffset;
uniform vec2 dispFiRatio;
uniform vec2 dispSinProcessed;
uniform float ratioDisp;
uniform float customFI;

varying vec2 vUv;

void main() {

  vec2 uvRecalculated = vUv * uvDisp.zw + uvDisp.xy;
  // vec4 pic = texture2D( tPic, uvRecalculated );

  // if( onlyLeft == 1. && vUv.x > .5 ) {
	// 	discard;
	// }

  vec2 p = uvRecalculated;
  for( int i = 1; i < 20; i++ ) {
    // vec2 newp = p;
    float fi = float( i );
    if( customFI > 0. ) {
      fi = customFI;
    }
    // p.x += dispDecal.x / fi * cos( fi * p.y + time * 0.3 / dispDivide.x + dispFiRatio.x * fi ) + dispOffset.x;
    // p.y += dispDecal.y / fi * cos( fi * p.x + time * 0.3 / dispDivide.y + dispFiRatio.y * ( fi + 10. ) ) + dispOffset.y;
    p.x += dispDecal.x / fi * cos( fi * p.y + time / dispDivide.x + dispFiRatio.x * fi ) + dispOffset.x;
    p.y += dispDecal.y / fi * cos( fi * p.x + time / dispDivide.y + dispFiRatio.y * fi ) + dispOffset.y;
    // p = newp;
  }

  vec3 colProcessed = vec3( 0.5 * sin( dispSinProcessed.x * p.x ) + .5, 0.5 * sin( dispSinProcessed.y * p.y ) + 0.5, sin( p.x + p.y ) );
  vec2 uvProcessed = uvRecalculated * ( 1. - ratioDisp ) + colProcessed.xy * ratioDisp;
  vec4 picDisplacement = texture2D( tPic, uvProcessed );
  // gl_FragColor = vec4( colProcessed, 1. );
  gl_FragColor = vec4( picDisplacement.rgb, 1. );

  // vec3 color = pic.rgb;
	// gl_FragColor = vec4(color, 1.0);

}
