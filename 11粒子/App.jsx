import React, { useEffect } from 'react'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
const windowSize = {
  width: window.innerWidth,
  height: window.innerHeight
}


window.addEventListener('resize', () => {
  windowSize.width = window.innerWidth
  windowSize.height = window.innerHeight
})

const TextureLoader = new THREE.TextureLoader();
const pointTexture = TextureLoader.load(require('./static/particles/3.png'))


const Scene = new THREE.Scene();



const camera = new THREE.PerspectiveCamera(75, windowSize.width / windowSize.height, 0.1, 1000);
camera.position.z = 20
// camera.position.z = 1
// const geometry = new THREE.SphereGeometry(1,32,32);

const count = 10000;

const positions = new Float32Array(count * 3);
const colors = new Float32Array(count * 3);
for (let i = 0; i < count * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 20;
  colors[i] = Math.random();
}
const geometry = new THREE.BufferGeometry()
geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

const material = new THREE.PointsMaterial()
// material.color = new THREE.Color('#ff88cc')
material.transparent = true
material.size = 0.2
material.alphaMap = pointTexture
material.alphaTest = 0.01
material.vertexColors = true

const mesh = new THREE.Points(geometry, material);
Scene.add(mesh)



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
      for (let i = 0; i < count; i++) {
        let n = i * 3
        let x =  mesh.geometry.attributes.position.array[n]
        geometry.attributes.position.array[n + 1] = Math.sin(elapsed + x) * 1.5
      }
      geometry.attributes.position.needsUpdate = true
      renderer.setSize(windowSize.width, windowSize.height);
      camera.aspect = windowSize.width / windowSize.height
      camera.updateProjectionMatrix()
      renderer.render(Scene, camera);
      controls.update()
      requestAnimationFrame(animate);
    }
    animate()
  })

  return (
    <canvas id={'webgl'}></canvas>
  )
}
