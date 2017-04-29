precision highp float;

uniform sampler2D tPic;
uniform sampler2D tMask;
uniform float maskVisible;
uniform float onlyRight;
uniform vec4 uvDisp;

varying vec2 vUvPic;

void main() {

  vec2 uvRecalculated = vUvPic * uvDisp.zw + uvDisp.xy;

	vec4 pic = texture2D( tPic, uvRecalculated );
	vec4 mask = texture2D( tMask, uvRecalculated );

	if( mask.r < .1 - maskVisible ) {
		discard;
	}

	// if( onlyRight == 1. && vUvPic.x < .5 ) {
	// 	discard;
	// }

  vec3 color = pic.rgb;
	gl_FragColor = vec4(color, 1.0);

}
