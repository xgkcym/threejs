#define PI 3.14159265359
varying vec2 vUv;

float random(vec2 st){
    return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453123);
}

vec2 rotate(vec2 uv,float rotation,vec2 mid){
    return vec2(
        cos(rotation)*(uv.x-mid.x)+sin(rotation)*(uv.y-mid.y)+mid.x,
        cos(rotation)*(uv.y-mid.y)-sin(rotation)*(uv.x-mid.x)+mid.y
    );
}

//	Classic Perlin 2D Noise
//	by Stefan Gustavson
//
vec2 fade(vec2 t){return t*t*t*(t*(t*6.-15.)+10.);}
vec4 permute(vec4 x){return mod(((x*34.)+1.)*x,289.);}
float cnoise(vec2 P){
    vec4 Pi=floor(P.xyxy)+vec4(0.,0.,1.,1.);
    vec4 Pf=fract(P.xyxy)-vec4(0.,0.,1.,1.);
    Pi=mod(Pi,289.);// To avoid truncation effects in permutation
    vec4 ix=Pi.xzxz;
    vec4 iy=Pi.yyww;
    vec4 fx=Pf.xzxz;
    vec4 fy=Pf.yyww;
    vec4 i=permute(permute(ix)+iy);
    vec4 gx=2.*fract(i*.0243902439)-1.;// 1/41 = 0.024...
    vec4 gy=abs(gx)-.5;
    vec4 tx=floor(gx+.5);
    gx=gx-tx;
    vec2 g00=vec2(gx.x,gy.x);
    vec2 g10=vec2(gx.y,gy.y);
    vec2 g01=vec2(gx.z,gy.z);
    vec2 g11=vec2(gx.w,gy.w);
    vec4 norm=1.79284291400159-.85373472095314*vec4(dot(g00,g00),dot(g01,g01),dot(g10,g10),dot(g11,g11));
    g00*=norm.x;
    g01*=norm.y;
    g10*=norm.z;
    g11*=norm.w;
    float n00=dot(g00,vec2(fx.x,fy.x));
    float n10=dot(g10,vec2(fx.y,fy.y));
    float n01=dot(g01,vec2(fx.z,fy.z));
    float n11=dot(g11,vec2(fx.w,fy.w));
    vec2 fade_xy=fade(Pf.xy);
    vec2 n_x=mix(vec2(n00,n01),vec2(n10,n11),fade_xy.x);
    float n_xy=mix(n_x.x,n_x.y,fade_xy.y);
    return 2.3*n_xy;
}

void main(){
    // float  strength = vUv.x;
    
    // float  strength = vUv.y;
    
    // float  strength = 1.0 - vUv.y;
    
    float  strength = vUv.y * 10.0;
    
    // float  strength = mod( vUv.y * 10.0,1.0 );
    
    // float strength=step(.5,mod(vUv.y*10.,1.));
    
    // float strength=step(.8,mod(vUv.y*10.,1.));
    
    // float strength=step(.8,mod(vUv.x*10.,1.));
    
    // float strength=step(.8,mod(vUv.x*10.,1.));
    // strength+=step(.8,mod(vUv.y*10.,1.));
    
    // float strength=step(.8,mod(vUv.x*10.,1.));
    // strength*=step(.8,mod(vUv.y*10.,1.));
    
    //  float strength=step(.4,mod(vUv.x*10.,1.));
    //  strength*=step(.8,mod(vUv.y*10.,1.));
    
    // float barX=step(.4,mod(vUv.x*10.,1.));
    // barX*=step(.8,mod(vUv.y*10.,1.));
    // float barY=step(.4,mod(vUv.y*10.,1.));
    // barY*=step(.8,mod(vUv.x*10.,1.));
    // float strength= barX + barY;
    
    // float barX=step(.4,mod(vUv.x*10.,1.));
    // barX*=step(.8,mod(vUv.y*10.+0.2,1.));
    // float barY=step(.4,mod(vUv.y*10.,1.));
    // barY*=step(.8,mod(vUv.x*10.+0.2,1.));
    // float strength= barX + barY;
    
    // float strength = abs(0.5 - vUv.x);
    
    // float strength=min(abs(.5-vUv.x),abs(.5-vUv.y));
    
    // float strength=max(abs(.5-vUv.x),abs(.5-vUv.y));
    
    // float strength=step(.25,max(abs(.5-vUv.x),abs(.5-vUv.y)));
    
    // float square1=step(.2,max(abs(.5-vUv.x),abs(.5-vUv.y)));
    // float square2=1.-step(.25,max(abs(.5-vUv.x),abs(.5-vUv.y)));
    // float strength=square1*square2;
    
    // float strength= floor(vUv.x * 10.0) / 10.0;
    
    // float strength= floor(vUv.x * 10.0) / 10.0 * (floor(vUv.y * 10.0) / 10.0);
    
    // float strength=random(vUv);
    
    // vec2 gridUv = vec2(floor(vUv.x * 10.0) / 10.0, (floor(vUv.y * 10.0) / 10.0));
    // float strength= random(gridUv);
    
    // vec2 gridUv=vec2(floor(vUv.x*10.)/10.,floor(vUv.y*10.+vUv.x*5.)/10.);
    // float strength=random(gridUv);
    
    // float strength=length(vUv);
    
    // float strength=distance(vUv,vec2(.5,.5));
    
    // float strength=1.0 - distance(vUv,vec2(.5,.5));
    
    // float strength=0.015/distance(vUv,vec2(.5)) ;
    
    // float strength=0.015/distance(vUv,vec2(.5)) + 0.25;
    
    // vec2 lightUv=vec2(
        //     vUv.x*.1+.45,
        //     vUv.y*.5+.25
    // );
    // float strength=.015/distance(lightUv,vec2(.5));
    
    // vec2 lightUvX=vec2(vUv.x*.1+.45,vUv.y*.5+.25);
    // float lightX=.015/distance(lightUvX,vec2(.5));
    // vec2 lightUvY=vec2(vUv.y*.1+.45,vUv.x*.5+.25);
    // float lightY=.015/distance(lightUvY,vec2(.5));
    // float strength=lightX * lightY;
    
    // vec2 ratetedUv=rotate(vUv,PI*0.25,vec2(.5));
    // vec2 lightUvX=vec2(ratetedUv.x*.1+.45,ratetedUv.y*.5+.25);
    // float lightX=.015/distance(lightUvX,vec2(.5));
    // vec2 lightUvY=vec2(ratetedUv.y*.1+.45,ratetedUv.x*.5+.25);
    // float lightY=.015/distance(lightUvY,vec2(.5));
    // float strength=lightX*lightY;
    
    // float strength=step(.25,distance(vUv,vec2(.5)));
    
    // float strength=abs(distance(vUv,vec2(.5))-.25);
    
    // float strength=step(.01,abs(distance(vUv,vec2(.5))-.25));
    
    // vec2 waveUv=vec2(
        //     vUv.x,
        //     vUv.y+sin(vUv.x*30.)*.1
    // );
    // float strength=1.-step(.01,abs(distance(waveUv,vec2(.5))-.25));
    
    // vec2 waveUv=vec2(
        //     vUv.x+sin(vUv.y*30.)*.1,
        //     vUv.y+sin(vUv.x*30.)*.1
    // );
    // float strength=1.-step(.01,abs(distance(waveUv,vec2(.5))-.25));
    
    // vec2 waveUv=vec2(
        //     vUv.x+sin(vUv.y*100.)*.1,
        //     vUv.y+sin(vUv.x*100.)*.1
    // )  ;
    // float strength=1.-step(.01,abs(distance(waveUv,Fvec2(.5))-.25));
    
    // float angle = atan(vUv.x,vUv.y );
    // float strength = angle;
    
    // float angle=atan(vUv.x-.5,vUv.y-.5);
    // float strength=angle;
    
    // float angle=atan(vUv.x-.5,vUv.y-.5);
    // angle/=PI*2.;
    // angle += 0.5;
    // float strength=angle;
    
    // float angle=atan(vUv.x-.5,vUv.y-.5);
    // angle/=PI*2.;
    // angle+=.5;
    // angle*=20.;
    // angle=mod(angle,1.);
    // float strength=angle;
    
    // float angle=atan(vUv.x-.5,vUv.y-.5);
    // angle/=PI*2.;
    // angle+=.5;
    // float strength=sin(angle * 100.0);
    
    // float angle=atan(vUv.x-.5,vUv.y-.5);
    // angle/=PI*2.;
    // angle+=.5;
    // float sinusoid=sin(angle*100.);
    // float radius=.25 + sinusoid * 0.02;
    // float strength=1.-step(.01,abs(distance(vUv,vec2(.5))-radius));
    
    // float strength=cnoise(vUv * 10.0);
    
    // float strength=step(0.01,cnoise(vUv * 10.0));
    
    // float strength=1.0 - abs(cnoise(vUv * 10.0));
    
    // float strength=sin(cnoise(vUv * 10.0) * 20.0);
    
    // float strength=step(.9,sin(cnoise(vUv*10.)*20.));
    
    // gl_FragColor=vec4(strength,strength,strength,1.);
    
    //设置最高最低颜色值以免多种颜色叠加
    // strength=clamp(strength,0.,1.);
    
    // color
    // vec3 blackColor=vec3(0,0,0);
    // vec3 uvColor=vec3(vUv,1.);
    // vec3 mixedColor=mix(blackColor,uvColor,strength);
    gl_FragColor=vec4(strength,strength,strength,1.);
    
}
