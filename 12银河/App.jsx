import React, { useEffect } from 'react'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import dat from 'dat.gui'
const windowSize = {
  width: window.innerWidth,
  height: window.innerHeight
}

const gui = new dat.GUI()

window.addEventListener('resize', () => {
  windowSize.width = window.innerWidth
  windowSize.height = window.innerHeight
})



const Scene = new THREE.Scene();

const parameters = {
  count: 30000,
  side: 3,
  radius: 2,
  spin: 0,
  random: 0.2,
  randomPower: 1,
  size: 0.01,
  colorInSide: '#ff6030',
  colorOutSide: "#1b3984",
  randomness:0.5,
}
let geometry = null;
let material = null;
let point = null;

const galaxy = () => {
  const positions = new Float32Array(parameters.count * 3);
  const colors = new Float32Array(parameters.count * 3);
  if (point != null) {
    geometry.dispose();
    material.dispose();
    Scene.remove(point)
  }
  const ColorInsize = new THREE.Color(parameters.colorInSide)
  const ColorOutsize = new THREE.Color(parameters.colorOutSide)
  geometry = new THREE.BufferGeometry();
  for (let i = 0; i < parameters.count; i++) {
    const radius = Math.random() * parameters.radius
    const spin = radius * parameters.spin
    const randomX = Math.pow(Math.random(), parameters.randomPower) * (Math.random() > 0.5 ? 1 : -1) * parameters.randomness * radius
    const randomY = Math.pow(Math.random(), parameters.randomPower) * (Math.random() > 0.5 ? 1 : -1) * parameters.randomness * radius
    const randomZ = Math.pow(Math.random(), parameters.randomPower) * (Math.random() > 0.5 ? 1 : -1) * parameters.randomness * radius

    const n = i * 3;
    // 在圆对应的方向
    const sideface = (i % parameters.side) / parameters.side * Math.PI * 2
    positions[n] = Math.cos(sideface + spin) * radius + randomX
    positions[n + 1] = 0 + randomY;
    positions[n + 2] = Math.sin(sideface + spin) * radius + randomZ;

    const mixedColor = ColorInsize.clone()
    mixedColor.lerp(ColorOutsize, radius / parameters.radius)
    colors[n] = mixedColor.r
    colors[n + 1] = mixedColor.g
    colors[n + 2] = mixedColor.b
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))
  material = new THREE.PointsMaterial({
    size: parameters.size,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    // color: "#ff5588",
    vertexColors: true
  });
  point = new THREE.Points(geometry, material);
  Scene.add(point)
}

galaxy()

gui.add(parameters, 'size').name('粒子大小').min(0).max(0.1).step(0.001).onFinishChange(galaxy)
gui.add(parameters, 'count').name('粒子个数').min(0).max(100000).step(1).onFinishChange(galaxy)
gui.add(parameters, 'side').name('side').min(0).max(20).step(1).onFinishChange(galaxy)
gui.add(parameters, 'radius').name('半径').min(0).max(20).step(0.01).onFinishChange(galaxy)
gui.add(parameters, 'spin').name('spin').min(-5).max(5).step(0.01).onFinishChange(galaxy)
gui.add(parameters, 'randomPower').name('randomPower').min(0).max(10).step(0.01).onFinishChange(galaxy)
gui.addColor(parameters, 'colorInSide').name('colorInSize').onFinishChange(galaxy)
gui.addColor(parameters, 'colorOutSide').name('colorInSize').onFinishChange(galaxy)
gui.add(parameters, 'randomness').min(0).max(2).step(0.001).onFinishChange(galaxy)


const camera = new THREE.PerspectiveCamera(75, windowSize.width / windowSize.height, 0.1, 1000);
camera.position.z = 2;
camera.lookAt(point.position)




export default function App() {
  useEffect(() => {
    const canvas = document.querySelector('#webgl');
    const controls = new OrbitControls(camera, canvas)
    const renderer = new THREE.WebGL1Renderer({
      canvas
    })
    renderer.setSize(windowSize.width, windowSize.height);
    renderer.render(Scene, camera);
    const clock = new THREE.Clock()
    function animate() {
      const elapsed = clock.getElapsedTime()
      renderer.setSize(windowSize.width, windowSize.height);
      camera.aspect = windowSize.width / windowSize.height
      camera.updateProjectionMatrix()
      renderer.render(Scene, camera);
      controls.update()
      requestAnimationFrame(animate);
    }
    animate()
    return () => {
      gui.destroy()
    }
  })

  return (
    <canvas id={'webgl'}></canvas>
  )
}
