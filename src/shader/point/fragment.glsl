void main(){
    float strength=distance(gl_PointCoord,vec2(.5));
    strength=.05/strength - 0.1  ;
    
    gl_FragColor=vec4(1.0,1.0,1.0,strength);
}