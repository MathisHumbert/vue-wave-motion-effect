precision mediump float;

uniform sampler2D uTexture;
uniform float uAlpha;

varying vec2 vUv;
varying float vWave;
varying float vHover;

void main(){
  vec2 uv = vec2(vUv.x, vUv.y + vWave * 0.25);

  vec2 rg = texture2D(uTexture, uv).rg;
  float b = texture2D(uTexture, uv + vec2(0, -0.02) * vHover).b;

  gl_FragColor = vec4(rg, b, 1.);
}