precision mediump float;

uniform sampler2D uTexture;
uniform float uAlpha;

varying vec2 vUv;
varying float vWave;
varying float vHover;

void main(){
  float wave = vWave * 2.;

  float r = texture2D(uTexture, vUv + vec2(0, 0) + vHover * wave * -0.05).r;
  float g = texture2D(uTexture, vUv + vec2(0, 0) + vHover * wave * 0.).g;
  float b = texture2D(uTexture, vUv + vec2(0, 0) + vHover * wave * -0.02).b;

  gl_FragColor = vec4(r, g, b, 1.);
}