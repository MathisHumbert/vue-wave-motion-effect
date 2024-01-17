precision mediump float;

uniform sampler2D uTexture;
uniform float uAlpha;

varying vec2 vUv;
varying float vHover;

void main(){
  float count = 10.;
  float smoothness = 0.5;

  float pr = smoothstep(-smoothness, 0., vUv.y - (1. - vHover) * (1. + smoothness));
  float s = 1. - step(pr, fract(count * vUv.y));

  vec4 texture = texture2D(uTexture, vUv * s);

  gl_FragColor = texture;
}