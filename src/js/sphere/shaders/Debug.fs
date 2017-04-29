precision highp float;

uniform sampler2D tColors;
uniform float time;
uniform float speed;
uniform float dx;
uniform float dy;
uniform float dz;
uniform float tx;
uniform float ty;
uniform float coef;

varying vec2 vUv;

vec2 sineWave( vec2 p ) {
  float x = sin( dx*p.y + dy*p.x + time * tx) * coef;
  float y = sin( dx*p.y + dy*p.x + time * ty) * coef;
  return vec2(p.x+x, p.y+y);
}

void main() {

  vec2 uv = sineWave( vUv );

	vec3 color = texture2D( tColors, uv ).rgb;
	gl_FragColor = vec4(color, 1.0);

}
