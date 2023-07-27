varying vec2 vUv;
varying vec3 vColor;
void main(){
    // Disc
    // float strength=distance(gl_PointCoord,vec2(.5));
    // strength=step(strength,.5);
    
    // Disc Point
    // float strength=distance(gl_PointCoord,vec2(.5));
    // strength*=2.;
    // strength=1.-strength;
    
    // Light Point
    float strength=distance(gl_PointCoord,vec2(.5));
    strength=1.-strength;
    strength=pow(strength,10.);
    
    vec3 color=mix(vec3(0.0),vColor,strength);
    gl_FragColor=vec4(color,1.);
}