attribute vec3 position;
attribute vec2 uv;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
uniform float uHover;

varying vec2 vUv;
varying float vHover;

void main(){
  vec3 pos = position;

  pos.z += smoothstep(0., 0.5 - sin(pos.y), uHover) * 0.5;
  
  vUv = uv;
  vHover = uHover;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.); 
}