// uniform mat4 modelMatrix;
// uniform mat4 viewMatrix;
// uniform mat4 projectionMatrix;
uniform vec2 uFrequency;
uniform float uTime;

// attribute vec3 position;
attribute float aRandom;
// attribute vec2 uv;

varying float vRandom;
varying vec2 vUv;
varying float vElevation;

void main(){
    vec4 modelPosition=modelMatrix*vec4(position,1.);
    float elevation=sin(modelPosition.x*uFrequency.x-uTime)*.1;
    elevation+=sin(modelPosition.y*uFrequency.y-uTime)*.1;
    modelPosition.z+=elevation;
    // modelPosition.z+=aRandom * 0.1;
    vec4 viewPosition=viewMatrix*modelPosition;
    vec4 projectionPosition=projectionMatrix*viewPosition;
    gl_Position=projectionPosition;
    // gl_Position=projectionMatrix*viewMatrix*modelMatrix*vec4(position,1.);
    vRandom=aRandom;
    vUv=uv;
    vElevation=elevation;
}