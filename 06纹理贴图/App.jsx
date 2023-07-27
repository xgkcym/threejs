import React, { useState } from 'react'
import { useEffect } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import doorColor from './static/door/color.jpg'
import doorAlpha from './static/door/alpha.jpg'
import doorHeight from './static/door/height.jpg'
import doorNormal from './static/door/normal.jpg'
import doorAmbientOcclusion from './static/door/ambientOcclusion.jpg'
import doorMetalness from './static/door/metalness.jpg'
import doorRoughness from './static/door/roughness.jpg'
import * as dat from 'dat.gui'
window.addEventListener('resize', (e) => {
  size.width = window.innerWidth
  size.height = window.innerHeight
})
const size = {
  width: window.innerWidth,
  height: window.innerHeight,
}
const gui = new dat.GUI()
const textureLoader = new THREE.TextureLoader();
const doorColorTexture = textureLoader.load(doorColor);
const doorAlphaTexture = textureLoader.load(doorAlpha);
const doorHeightTexture = textureLoader.load(doorHeight);
const doorNormalTexture = textureLoader.load(doorNormal);
const doorAmbientOcclusionTexture = textureLoader.load(doorAmbientOcclusion);
const doorMetalnessTexture = textureLoader.load(doorMetalness);
const doorRoughnessTexture = textureLoader.load(doorRoughness);
export default function App() {
  useEffect(() => {
    const Scene = new THREE.Scene()
    const ambient = new THREE.AmbientLight(0xffffff, 0.5)
    Scene.add(ambient)
    const light = new THREE.PointLight(0xffffff,0.5);
    light.position.set(0,3,3)
    Scene.add(light);
    const camera = new THREE.PerspectiveCamera(75, size.width / size.height, 0.1, 100)
    camera.position.z = 5
    const Box = new THREE.PlaneGeometry(1,1,100,100)
    Box.setAttribute('uv2',new THREE.BufferAttribute(Box.attributes.uv.array,2))
    const sphere = new THREE.SphereGeometry(0.5, 60, 60)
    sphere.setAttribute('uv2',new THREE.BufferAttribute(sphere.attributes.uv.array,2))
    const Torus = new THREE.TorusGeometry(0.5, 0.2, 64, 128)
    Torus.setAttribute('uv2',new THREE.BufferAttribute(Torus.attributes.uv.array,2))
    const material = new THREE.MeshStandardMaterial()
    material.metalness = 0
    material.roughness =1
    material.map = doorColorTexture
    material.aoMap = doorAmbientOcclusionTexture
    material.aoMapIntensity = 1
    material.displacementMap = doorHeightTexture
    material.displacementScale = 0.05
    material.metalnessMap = doorMetalnessTexture
    material.roughnessMap = doorRoughnessTexture
    material.normalMap = doorNormalTexture
    material.normalScale.set(1,1)
    material.alphaMap = doorAlphaTexture
    material.transparent  = true
    gui.add(material,'metalness').min(0).max(1).step(0.001)
    gui.add(material,'roughness').min(0).max(1).step(0.001)
    gui.add(material,'aoMapIntensity').min(0).max(10).step(0.001)
    gui.add(material,'displacementScale').min(0).max(1).step(0.001)
    // material.shininess = 100
    // material.color = new THREE.Color(0xffffff);
    // material.specular = new THREE.Color(0xffffff);
    // // material.wireframe = true
    // material.flatShading = true 
    // material.map = doorColorTexture
    // material.transparent = true
    // material.alphaMap = doorAlphaTexture
    // material.side = THREE.DoubleSide

    // const axes = new THREE.AxesHelper(3);
    // Scene.add(axes)
    const mesh = new THREE.Mesh(Box, material);
   
    Scene.add(mesh)
    const mesh1 = new THREE.Mesh(sphere, material);
    mesh1.position.x = -2
    Scene.add(mesh1)
    const mesh2 = new THREE.Mesh(Torus, material);
    mesh2.position.x = 2
    Scene.add(mesh2)
    const canvas = document.querySelector('#webgl')
    const renderer = new THREE.WebGL1Renderer({
      canvas,
    })
    camera.lookAt(mesh.position)
    renderer.setSize(size.width, size.height)
    renderer.setClearColor("#000")
    renderer.setPixelRatio(Math.min(window.devicePixelRatio), 2)
    renderer.render(Scene, camera)
    const controls = new OrbitControls(camera, canvas)
    controls.enableDamping = true
    const clock = new THREE.Clock()
    function rq() {
      const elapsedTime = clock.getElapsedTime()
      // mesh.rotation.x =   0.1*elapsedTime;
      // mesh.rotation.y =   0.1 * elapsedTime;
      // mesh1.rotation.x =   0.1 * elapsedTime;
      // mesh1.rotation.y =   0.05 * elapsedTime;
      // mesh2.rotation.x =   0.5*elapsedTime;
      // mesh2.rotation.y =   0.1 * elapsedTime;
      camera.aspect = size.width / size.height
      camera.updateProjectionMatrix()
      renderer.setSize(size.width, size.height)
      renderer.render(Scene, camera)
      requestAnimationFrame(rq)
      controls.update()
    }
    rq()

  }, [])
  return (
    <canvas id={'webgl'}></canvas>
  )
}
