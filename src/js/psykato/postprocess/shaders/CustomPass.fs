#define PI 3.14159265359
#define TAU 2. * 3.14159265359

uniform sampler2D tInput;
varying vec2 vUv;

// uniform float resolutionX;
// uniform float resolutionY;
uniform vec2 resolution;

uniform float mirrorX;
uniform float mirrorY;
uniform float divide4;
uniform float angle;
uniform float kaleid1Sections;
uniform float kaleid1Activated;
uniform float kaleid1RadiusCoef;
uniform float time;
uniform float timeCoef;

uniform int kaleidDivisions;
uniform float kaleidRadius;

// https://www.shadertoy.com/view/4lsGWj
// https://www.shadertoy.com/view/4sfGzs

const vec2 origin = vec2( .5, .5 );

vec2 kaleid1( vec2 uvBase ) {
  float sin_factor = sin( angle );
  float cos_factor = cos( angle );

  vec2 temp = ( uvBase - origin );
  temp = temp * mat2( cos_factor, sin_factor, -sin_factor, cos_factor );
  uvBase = ( temp + origin );

	vec2 pos = vec2( uvBase - .5 );
	float rad = length( pos ) * kaleid1RadiusCoef;
  float a = atan( pos.y, pos.x );

  float ma = mod( a, TAU / kaleid1Sections );
  ma = abs( ma - PI / kaleid1Sections );

  float x = cos( ma ) * rad;
  float y = sin( ma ) * rad;

	return vec2( x, y ) * kaleid1Activated + uvBase * ( 1. - kaleid1Activated );
}

void main() {
  float aspect = resolution.x / resolution.y;

  vec2 uv = vUv;
  if(divide4>0.){ uv *= 2.; uv = mod(uv,vec2(1.)); }
	if(mirrorX>0.){ uv.x = abs(uv.x*aspect-.5*aspect)+.5; }
	if(mirrorY>0.){ uv.y = abs(uv.y-.5)+.5; }

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

  // vec2 coord = uv - ( resolution.xy / resolution.x ) * 0.5;
  //
  // float phi = atan(coord.y, coord.x + 1e-6);
  // phi = phi / PI * 0.5 + 0.5;
  // float seg = floor(phi * 6.);
  //
  // float theta = (seg + 0.5) / 6. * PI * 2.;
  // vec2 dir1 = vec2(cos(theta), sin(theta));
  // vec2 dir2 = vec2(-dir1.y, dir1.x);
  //
  // float l = dot(dir1, coord);
  // float w = sin(seg * 31.374) * 18. + 20.;
  // float prog = l / w + time * 2.;
  // float idx = floor(prog);
  //
  // float phase = time * 0.8;
  // float th1 = fract(273.84937 * sin(idx * 54.67458 + floor(phase    )));
  // float th2 = fract(273.84937 * sin(idx * 54.67458 + floor(phase + 1.)));
  // float thresh = mix(th1, th2, smoothstep(0.75, 1., fract(phase)));
  //
  // float l2 = dot(dir2, coord);
  // float slide = fract(idx * 32.74853) * 200. * time;
  // float w2 = fract(idx * 39.721784) * 500.;
  // float prog2 = (l2 + slide) / w2;
  //
  // float c = clamp((fract(prog) - thresh) * w * 0.3, 0., 1.);
  // c *= clamp((fract(prog2) - 1. + thresh) * w2 * 0.3, 0., 1.);
  // vec4 color = vec4( vec3( c ), 1. );



  // // kaleidParts
  // uvKaleids = kaleid1( uvKaleids );
  // uvKaleids.x *= aspect;

	vec4 color = texture2D( tInput, uvKaleids );

  gl_FragColor = color;

}
