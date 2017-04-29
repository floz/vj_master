precision highp float;

uniform sampler2D tNormalMap;
uniform sampler2D tSimCurr;
uniform float angle;
uniform float time;
uniform float timeCoef;
uniform float kaleidRadius;
uniform float isInitiated;

varying vec2 vUv;

void main() {

  vec2 uv = vUv;

  vec2 uvKaleids = ( uv * vec2( 1., 1. ) - vec2( 1., 1. ) * .5 );
  float r = kaleidRadius;
  float a = angle + time*.1*timeCoef;
  float c = cos(a)*r;
  float s = sin(a)*r;
  for ( int i=0; i<8; i++ )
  {
  	uvKaleids = abs(uvKaleids);
    uvKaleids -= .5;
    uvKaleids = uvKaleids*c + s*uvKaleids.yx*vec2(1,-1);
  }
  uvKaleids = uvKaleids*vec2(1,-1)+.5;

  vec4 origin = texture2D( tNormalMap, vUv );
  vec4 kaleid = texture2D( tSimCurr, uvKaleids );

  vec4 color = origin * ( 1. - isInitiated ) + kaleid * isInitiated ;
  // color += origin * .025 * isInitiated;

	gl_FragColor = vec4( color.r, color.g, color.b, 1. );
	// gl_FragColor = vec4( uvKaleids, 0., 1. );

}
