precision mediump float;

uniform sampler2D uCurrentTexture;
uniform sampler2D uNextTexture;
uniform sampler2D uDispTexture;
uniform vec2 uMeshSize;
uniform vec2 uImageSize;
uniform float uProgress;
uniform float uTime;
uniform float uAlpha;

varying vec2 vUv;

vec2 backgroundCoverUv(vec2 uv, vec2 canvasSize, vec2 textureSize){
  vec2 ratio = vec2(
    min((canvasSize.x / canvasSize.y) / (textureSize.x / textureSize.y), 1.0),
    min((canvasSize.y / canvasSize.x) / (textureSize.y / textureSize.x), 1.0)
  );

  vec2 uvWithRatio = uv * ratio;

  return vec2(
    uvWithRatio.x + (1.0 - ratio.x) * 0.5,
    uvWithRatio.y  + (1.0 - ratio.y) * 0.5
  );
}

void main(){
  vec2 uv = vUv;
  vec2 textureUv = backgroundCoverUv(uv, uMeshSize, uImageSize);

  vec4 dispTexture = texture2D(uDispTexture, uv);

  float wipe = step(1.0 - uv.x, uProgress);
  float scale = 0.7 + 0.3 * uProgress;

  vec4 currentTexture = texture2D(uCurrentTexture, textureUv + vec2(dispTexture.r * uProgress, 0));
  vec4 nextTexture = texture2D(uNextTexture, textureUv * scale + vec2(0.15) * (1. - uProgress));

  vec4 finalTexture = mix(currentTexture, nextTexture, wipe);

  gl_FragColor = finalTexture;
}