import React, { useState } from 'react'
import { useEffect } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { ArcballControls } from 'three/examples/jsm/controls/ArcballControls'
import { DragControls } from 'three/examples/jsm/controls/DragControls'
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls'
import { FlyControls } from 'three/examples/jsm/controls/FlyControls'
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls'
import * as dat from 'dat.gui'
window.addEventListener('resize', (e) => {
  size.width = window.innerWidth
  size.height = window.innerHeight
})
const size = {
  width: window.innerWidth,
  height: window.innerHeight,
}
const CubeLoader = new THREE.CubeTextureLoader();
const environmentTexture = CubeLoader.load([
  require('./static/environmentMaps/3/px.jpg'),
  require('./static/environmentMaps/3/nx.jpg'),
  require('./static/environmentMaps/3/py.jpg'),
  require('./static/environmentMaps/3/ny.jpg'),
  require('./static/environmentMaps/3/pz.jpg'),
  require('./static/environmentMaps/3/nz.jpg'),
]);
const gui = new dat.GUI()
const Scene = new THREE.Scene()
const ambient = new THREE.AmbientLight(0xffffff, 0.5)
Scene.add(ambient)
const light = new THREE.PointLight(0xffffff, 0.5);
light.position.set(0, 3, 3)
Scene.add(light);
Scene.background = environmentTexture
// const geometry = new THREE.BoxGeometry(100,100,100);
const geometry = new THREE.SphereGeometry(1, 20, 20);
const material = new THREE.MeshStandardMaterial()
material.envMap = environmentTexture
material.metalness = 1;
material.roughness = 0;
// const Axes = new THREE.AxesHelper(10);
// Scene.add(Axes)
const mesh = new THREE.Mesh(geometry, material)
Scene.add(mesh);


const camera = new THREE.PerspectiveCamera(75, size.width / size.height, 0.1, 100)
camera.position.z = 10


export default function App() {

  useEffect(() => {
    const canvas = document.querySelector('#webgl')
    const renderer = new THREE.WebGL1Renderer({
      canvas,
    })
    const controls = new OrbitControls (camera, canvas)
    renderer.setSize(size.width, size.height)
    renderer.setClearColor("#fff")
    renderer.setPixelRatio(Math.min(window.devicePixelRatio), 2)
    renderer.render(Scene, camera)
    const clock = new THREE.Clock()

    function rq() {
      // const elapsedTime = clock.getElapsedTime()
      camera.aspect = size.width / size.height
      camera.updateProjectionMatrix()
      renderer.setSize(size.width, size.height)
      renderer.render(Scene, camera)
      controls.update()
      requestAnimationFrame(rq)
    }
    rq()
    // window.addEventListener("mouseout",()=>{
    //   controls.enabled = false
    // })
    // window.addEventListener('mouseover',()=>{
    //   controls.enabled = true
    // })
  }, [])
  return (
    <canvas id={'webgl'}></canvas>
  )
}
