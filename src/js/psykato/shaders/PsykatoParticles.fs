precision highp float;

uniform sampler2D tSimKaleid;
uniform float alpha;
uniform vec3 color;

varying vec2 vUv;

void main() {

  vec3 colorB = texture2D( tSimKaleid, vUv ).rgb;

	gl_FragColor = vec4( colorB, .06 * alpha );
	// gl_FragColor = vec4( colorB, .5 * alpha );

}
