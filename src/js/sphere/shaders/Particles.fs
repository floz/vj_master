precision highp float;

uniform sampler2D tColors;
uniform float alpha;
uniform float time;
uniform float dx;
uniform float dy;
uniform float dz;
uniform float tx;
uniform float ty;
uniform float coef;
uniform float hue;
uniform float sat;
uniform float val;
uniform sampler2D tParticle;

varying vec2 uvColors;

vec3 rgb2hsv(vec3 c)
{
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

vec2 sineWave( vec2 p ) {
  float x = sin( dx*p.y + dy*p.x + time * tx) * coef;
  float y = sin( dx*p.y + dy*p.x + time * ty) * coef;
  return vec2(p.x+x, p.y+y);
}

void main() {

  vec2 uv = sineWave( uvColors );
  // uv.x = sin( uv.x * 1. * time * .001 );
  // uv.y = cos( uv.y * 4. * time * .01 );
  //
  // float speed = 0.01;
  // float t0 = time*speed;
  // float t1 = sin(t0);
  // float phase=1.5;
  // float tho = length(uv)*phase+t1;
  // float thop = t0*3.2;

  // map spiral
 // 	uv+=vec2(tho*cos(tho-0.9*thop),tho*sin(tho-1.1*thop));

  vec4 colors = texture2D( tColors, uv );

  vec3 hsv = rgb2hsv( colors.rgb );
  float hOrigin = hsv.r * 360.;
  hsv.r = mod( hOrigin + hue, 360. ) / 360.;
  hsv.g = hsv.g + sat;
  hsv.b = hsv.b + val;
  colors.rgb = hsv2rgb( hsv );

	// gl_FragColor = vec4( colors.rgb, alpha );
	gl_FragColor = texture2D( tParticle, gl_PointCoord ) * vec4( vec3( 1., 0., 1. ), alpha );

}
