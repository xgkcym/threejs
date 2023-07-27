import React, { useEffect } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import dat from 'dat.gui'
import testVertex from './shaders/test/vertex.glsl'
import testFragment from './shaders/test/fragment.glsl'
const windowSize = {
  width: window.innerWidth,
  height: window.innerHeight,
}

const gui = new dat.GUI()

window.addEventListener('resize', () => {
  windowSize.width = window.innerWidth
  windowSize.height = window.innerHeight

})


const debugObject = {
  depthColor: "#186691",
  surfaceColor: '#9bd8ff'
}


const Scene = new THREE.Scene()
const geometry = new THREE.PlaneGeometry(20, 20, 512, 512);


const material = new THREE.ShaderMaterial({
  vertexShader: testVertex,
  fragmentShader: testFragment,
  transparent: true,
  uniforms: {
    waveNum: { value: new THREE.Vector2(4, 1.5) },
    waveHeight: { value: 0.1 },
    uTime: { value: 0.0 },
    uTimeSpeed: { value: 0.75 },
    uDepthColor: { value: new THREE.Color(debugObject.depthColor) },
    uSurfaceColor: { value: new THREE.Color(debugObject.surfaceColor) },
    uColorOffset: { value: 0.08 },
    uColorMultiplier: { value: 5.0 },
    smallWaveNum: { value: 3.0 },
    smallWaveSpeed: { value: 0.2 },
    smallWaveSize: { value: 3.0 },
    smallWaveHeight: { value: 0.15 },
  },

})
gui.add(material.uniforms.waveHeight, 'value').max(1).min(0).step(0.001).name('波浪高度')
gui.add(material.uniforms.waveNum.value, 'x').max(10).min(0).step(0.001).name('波浪X轴数量')
gui.add(material.uniforms.waveNum.value, 'y').max(10).min(0).step(0.001).name('波浪y轴数量')
gui.add(material.uniforms.uTimeSpeed, 'value').max(5).min(0).step(0.001).name('风浪的速度')
gui.add(material.uniforms.uColorOffset, 'value').max(1).min(0).step(0.001).name('渐变的范围')
gui.add(material.uniforms.uColorMultiplier, 'value').max(10).min(0).step(0.001).name('渐变的亮度')
gui.add(material.uniforms.smallWaveSize, 'value').max(30).min(0).step(0.001).name('小波浪尖度')
gui.add(material.uniforms.smallWaveSpeed, 'value').max(10).min(0).step(0.001).name('小波浪速度')
gui.add(material.uniforms.smallWaveNum, 'value').max(10).min(0).step(0.001).name('小波浪数量')
gui.add(material.uniforms.smallWaveHeight, 'value').max(1).min(0).step(0.001).name('小波浪深度')
gui.addColor(debugObject, 'depthColor').name('渐变颜色高').onChange(() => {
  material.uniforms.uDepthColor.value = new THREE.Color(debugObject.depthColor)
})
gui.addColor(debugObject, 'surfaceColor').name('渐变颜色低').onChange(() => {
  material.uniforms.uSurfaceColor.value = new THREE.Color(debugObject.surfaceColor)
})


const mesh = new THREE.Mesh(geometry, material)
mesh.rotation.x = Math.PI * -0.5
Scene.add(mesh);




const camera = new THREE.PerspectiveCamera(75, windowSize.width / windowSize.height);
camera.position.set(0.5, 1, 1);


export default function App() {
  useEffect(() => {
    const canvas = document.querySelector('#webgl')
    const renderer = new THREE.WebGL1Renderer({
      canvas
    })
    renderer.setSize(windowSize.width, windowSize.height)

    renderer.render(Scene, camera)
    const controls = new OrbitControls(camera, canvas)
    const clock = new THREE.Clock()
    const frame = () => {
      const elapsed = clock.getElapsedTime()
      material.uniforms.uTime.value = elapsed;
      controls.update()
      camera.aspect = windowSize.width / windowSize.height;
      camera.updateProjectionMatrix()
      renderer.setSize(windowSize.width, windowSize.height);
      renderer.render(Scene, camera)
      window.requestAnimationFrame(frame)
    }

    frame()

  }, [])
  return (
    <canvas id={'webgl'}></canvas>
  )
}
