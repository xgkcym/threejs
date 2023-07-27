uniform float uSize;
uniform float uTime;
uniform float uRotationSpeed;
uniform float uRevolutionSpeed;
attribute float aScale;
varying vec2 vUv;
varying vec3 vColor;

void main(){
    vec4 modelPosition=modelMatrix*vec4(position,1.);
    float angle=atan(modelPosition.x,modelPosition.z);
    float distanceTocenter=length(modelPosition.xz);
    float angleOffset=(1./distanceTocenter)*uTime*.2;
    angle+=angleOffset;
    modelPosition.x=cos(angle);
    modelPosition.z=sin(angle);
    // modelPosition.x = cos(angle) * distanceTocenter;
    // modelPosition.z = sin(angle) * distanceTocenter;
    vec4 viewPosition=viewMatrix*modelPosition;
    vec4 projectionPosition=projectionMatrix*viewPosition;
    gl_Position=projectionPosition;
    gl_PointSize=uSize*aScale;
    gl_PointSize*=(1./-viewPosition.z);
    
    vUv=uv;
    vColor=color;
}
