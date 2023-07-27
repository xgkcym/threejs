import React, { useState } from 'react'
import { useEffect } from 'react'
import * as THREE from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import fontType from './static/fonts/helvetiker_regular.typeface.json';
window.addEventListener('resize', (e) => {
  size.width = window.innerWidth
  size.height = window.innerHeight
})
const size = {
  width: window.innerWidth,
  height: window.innerHeight,
}
const textureLoader = new THREE.TextureLoader();
const matcapTexture  = textureLoader.load(require('./static/matcaps/4.png'))
const backgroundTexture = textureLoader.load(require('./static/matcaps/7.png'))
const fontLoader = new FontLoader()
const font = fontLoader.parse(fontType)
const Scene = new THREE.Scene()
const ambient = new THREE.AmbientLight(0xffffff, 0.5)
Scene.add(ambient)
const light = new THREE.PointLight(0xffffff, 0.5);
light.position.set(0, 3, 3)
Scene.add(light);
Scene.background = backgroundTexture

const textGeometroy = new TextGeometry('Avery Dennison', {
  font,
  size: 5,
  height: 2,
  curveSegments: 12,
  bevelEnabled: true,
  bevelThickness: 0.03,
  bevelSize: 0.02,
  bevelOffset: 0,
  bevelSegments: 5
})
textGeometroy.center()
const material = new THREE.MeshMatcapMaterial();
material.matcap = matcapTexture
const mesh = new THREE.Mesh(textGeometroy, material)
Scene.add(mesh)
const donutGeometry = new THREE.TorusGeometry(1, 0.5, 20, 45);
for (let i = 0; i < 700; i++) {
  const donut = new THREE.Mesh(donutGeometry, material);
  donut.position.x = (Math.random() - 0.5) * 200
  donut.position.y = (Math.random() - 0.5) * 200
  donut.position.z = (Math.random() - 0.5) * 200
  donut.rotation.x = Math.random() * Math.PI;
  donut.rotation.y = Math.random() * Math.PI;
  const scale = Math.random();
  donut.scale.x = scale;
  donut.scale.y = scale;
  donut.scale.z = scale;
  Scene.add(donut)
}



const camera = new THREE.PerspectiveCamera(75, size.width / size.height, 0.1, 300)
camera.position.z = 30
// camera.position.y = 5
// camera.position.x = -10

export default function App() {

  useEffect(() => {
    const canvas = document.querySelector('#webgl')
    const renderer = new THREE.WebGL1Renderer({
      canvas,
    })
    const controls = new OrbitControls(camera, canvas)
    controls.enableDamping = true
    renderer.setSize(size.width, size.height)
    renderer.setClearColor("#000")
    renderer.setPixelRatio(Math.min(window.devicePixelRatio), 2)
    renderer.render(Scene, camera)

    function rq() {
      camera.aspect = size.width / size.height
      camera.updateProjectionMatrix()
      renderer.setSize(size.width, size.height)
      renderer.render(Scene, camera)
      controls.update()
      requestAnimationFrame(rq)
    }
    rq()
  }, [])
  return (
    <canvas id={'webgl'}></canvas>
  )
}
