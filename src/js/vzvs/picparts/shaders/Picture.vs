precision highp float;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
uniform sampler2D tPic;
uniform float depthValue;
uniform float depthInvert;
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

attribute vec3 position;
attribute vec2 uv;

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

void main() {

  vUv = uv;

  vec3 pos = position;

  vec2 uvRecalculated = pos.xy;
  vec2 p = uvRecalculated;
  for( int i = 1; i < 10; i++ ) {
    float fi = float( i );
    if( customFI > 0. ) {
      fi = customFI;
    }
    p.x += dispDecal.x / fi * cos( fi * p.y + time * 0.3 / dispDivide.x + dispFiRatio.x * fi ) + dispOffset.x;
    p.y += dispDecal.y / fi * cos( fi * p.x + time * 0.3 / dispDivide.y + dispFiRatio.y * ( fi + 10. ) ) + dispOffset.y;
  }

  vec3 colProcessed = vec3( 0.5 * sin( dispSinProcessed.x * p.x ) + .5, 0.5 * sin( dispSinProcessed.y * p.y ) + .5, sin( p.x + p.y ) );

  float rd = ratioDisp * .1;
  vec2 uvProcessed = uvRecalculated * ( 1. - rd ) + colProcessed.xy * rd;
  // uvProcessed = effect( uvProcessed );

  pos.xy = uvProcessed;

  vec4 pic = texture2D( tPic, uv );
  float picValue = ( pic.r + pic.g + pic.b ) / 3.;

  float depth = picValue * depthValue;
  pos.z = depth * ( 1. - depthInvert ) + ( 1. - picValue ) * depth;
  vDepth = pos.z / 500.;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );

}
