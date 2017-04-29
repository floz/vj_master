precision highp float;

uniform sampler2D texture;
uniform vec3 color;
uniform float alpha;
uniform float vol;

varying vec2 vUv;

void main() {

	vec4 c = texture2D( texture, vUv );
  if( c.a == 0. ) {
    discard;
  }
	c.rgb *= color + vec3( 1. ) * vol * .25;
	c.a *= alpha + vol * .1;
	gl_FragColor = c;

}
