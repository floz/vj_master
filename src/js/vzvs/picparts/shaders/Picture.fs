precision highp float;

uniform sampler2D tPic;
uniform float maskVisible;
uniform float onlyLeft;
uniform vec4 uvDisp;
uniform vec2 dimensions;
uniform float time;
uniform vec2 dispDecal;
uniform vec2 dispDivide;
uniform vec2 dispOffset;
uniform vec2 dispFiRatio;
uniform vec2 dispSinProcessed;
uniform float ratioDisp;
uniform float customFI;
uniform float granularityX;
uniform float granularityY;
uniform float brightness;
uniform float contrast;
uniform float depthValue;

varying vec2 vUv;
varying float vDepth;

vec2 effect(vec2 uv)
{
  float granularity = granularityX + granularityY;
  if (granularity > 0.0)
  {
      float dx = granularityX / dimensions.y;
      float dy = granularityY / dimensions.x;
      uv = vec2(dx*(floor(uv.x/dx) + 0.5),
                dy*(floor(uv.y/dy) + 0.5));
  }
  return uv;
}

vec3 brightnessContrast(vec3 value, float brightness, float contrast)
{
    return (value - 0.5) * contrast + 0.5 + brightness;
}

const float gamma = 2.2;
vec3 toGamma(vec3 v) {
  return pow(v, vec3(1.0 / gamma));
}

void main() {

  vec2 uvRecalculated = vUv * uvDisp.zw + uvDisp.xy;
  // vec4 pic = texture2D( tPic, uvRecalculated );

  // if( onlyLeft == 1. && vUv.x > .5 ) {
	// 	discard;
	// }

  vec2 p = uvRecalculated;
  for( int i = 1; i < 20; i++ ) {
    float fi = float( i );
    if( customFI > 0. ) {
      fi = customFI;
    }
    p.x += dispDecal.x / fi * cos( fi * p.y + time * 0.3 / dispDivide.x + dispFiRatio.x * fi ) + dispOffset.x;
    p.y += dispDecal.y / fi * cos( fi * p.x + time * 0.3 / dispDivide.y + dispFiRatio.y * ( fi + 10. ) ) + dispOffset.y;
  }
  vec3 colProcessed = vec3( 0.5 * sin( dispSinProcessed.x * p.x ) + .5, 0.5 * sin( dispSinProcessed.y * p.y ) + .5, sin( p.x + p.y ) );

  vec2 uvProcessed = uvRecalculated * ( 1. - ratioDisp ) + colProcessed.xy * ratioDisp;
  vec4 picDisplacement = texture2D( tPic, effect( uvProcessed ) );


  // picDisplacement.r = smoothstep(0.0, 1.0, picDisplacement.r);
	// picDisplacement.g = smoothstep(0.0, 1.0, picDisplacement.g - 0.1);
	// picDisplacement.b = smoothstep(-0.3, 1.3, picDisplacement.b);

  picDisplacement.rgb = brightnessContrast( picDisplacement.rgb, brightness - vDepth * .1, contrast + vDepth * .25 );
  // picDisplacement.rgb = toGamma( picDisplacement.rgb );
  // picDisplacement.rgb = 1. - picDisplacement.rgb;

  gl_FragColor = vec4( picDisplacement.rgb, 1. );

}
