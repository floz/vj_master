precision highp float;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
uniform sampler2D tPic;
uniform sampler2D tMask;
uniform float size;
uniform float sizeAdd;
uniform float spacingX;
uniform float spacingY;
uniform float depthValue;
uniform float depthInvert;

attribute float uid;
attribute vec2 id;
attribute vec2 side;
attribute vec2 uvPic;
attribute vec3 position;

varying vec2 vUvPic;

void main() {
  vUvPic = uvPic;

  vec4 pic = texture2D( tPic, vUvPic );
  vec4 mask = texture2D( tMask, vUvPic );
  float picValue = ( pic.r + pic.g + pic.b ) / 3.;

  float sizeFinal = min( size + sizeAdd * picValue, 2.5 );

  vec3 posBase = position;
  posBase.x = ( spacingX + size ) * posBase.x;
  posBase.x += -side.y * sizeFinal * .5;
  posBase.y = ( spacingY + size ) * posBase.y;
  posBase.y += side.x * sizeFinal * .5;
  posBase.z = ( picValue * depthValue * ( 1. - depthInvert ) + ( 1. - picValue ) * depthValue * depthInvert );

  mat4 m = projectionMatrix * modelViewMatrix;
  vec4 pos = m * vec4( posBase, 1. );

  gl_Position = pos;

}
