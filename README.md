## 字体转换

https://gero3.github.io/facetype.js/

## 环境贴图

https://hdri-haven.com/

## 环境贴图生成

https://matheowis.github.io/HDRI-to-CubeMap/

## 着色器语言文档

https://shaderific.com/glsl/common_functions.html

https://registry.khronos.org/

https://thebookofshaders.com/glossary/

## 着色器语言案例

https://www.shadertoy.com/

## 着色器函数

https://gist.github.com/patriciogonzalezvivo/670c22f3966e662d2f83

## 着色器案例

### 1.1

```glsl
  float strength = vUv.x;

  gl_FragColor=vec4(strength,strength,strength,1.);
```

### 1.2

```glsl
 float strength = vUv.y;

 gl_FragColor=vec4(strength,strength,strength,1.);
```

###  1.3

```glsl
 float  strength = 1.0 - vUv.y;

 gl_FragColor=vec4(strength,strength,strength,1.);
```

