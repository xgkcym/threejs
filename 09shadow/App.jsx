
import React from 'react'
import { useEffect } from 'react'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import * as THREE from 'three'


const windowSize = {
  width:window.outerWidth,
  height:window.outerHeight
}
const Scene = new THREE.Scene()

const axes = new THREE.AxesHelper(10);
// Scene.add(axes)

const ambient = new THREE.AmbientLight('#fff',0.5);
Scene.add(ambient)

const directional = new THREE.DirectionalLight('#fff',0.5);
directional.position.y = 3
directional.position.z = 5
directional.castShadow = true
directional.shadow.camera.far = 100
directional.shadow.camera.near = 0.1
directional.shadow.camera.left = 10
directional.shadow.camera.right = -10
directional.shadow.camera.top = 10
directional.shadow.camera.bottom = -10
directional.shadow.mapSize.width = 1024
directional.shadow.mapSize.height = 1024
Scene.add(directional)

const directionalHelper = new THREE.DirectionalLightHelper(directional,5);
// Scene.add(directionalHelper)

const camera = new THREE.PerspectiveCamera(75,windowSize.width/windowSize.height,0.1,1000);
camera.position.z = 10
camera.position.y = 5
camera.position.x = -10

const directionalCameraHelper = new THREE.CameraHelper(directional.shadow.camera);
// Scene.add(directionalCameraHelper)


const spotLight = new THREE.SpotLight('#fff',0.5,10,Math.PI*0.3)
spotLight.position.set(-3,  5,1)
spotLight.castShadow = true
spotLight.shadow.camera.fov = 30
spotLight.shadow.camera.near = 1
spotLight.shadow.camera.far = 2
// Scene.add(spotLight)


const spotLightHelper = new THREE.SpotLightHelper(spotLight,'#f00');
// Scene.add(spotLightHelper)

const spotLightCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera);
// Scene.add(spotLightCameraHelper)

const sphereGeometry = new THREE.SphereGeometry(1,50,50);
const plane = new THREE.PlaneGeometry(10,10);

const material = new THREE.MeshStandardMaterial({color:'#fff'});
material.roughness = 0.7
const sphereMesh = new THREE.Mesh(sphereGeometry,material);
sphereMesh.position.y = 1
sphereMesh.castShadow = true
Scene.add(sphereMesh);

const planeMesh = new THREE.Mesh(plane,material);
planeMesh.rotation.x = -Math.PI / 2
planeMesh.receiveShadow = true
Scene.add(planeMesh);

window.addEventListener('resize',(e)=>{
  windowSize.width = window.outerWidth
  windowSize.height = window.outerHeight
})

export default function App() {
  useEffect(()=>{
    const canvas = document.querySelector('#webgl');
    const controls = new OrbitControls(camera,canvas);
    controls.enableDamping = true
    const renderer = new THREE.WebGL1Renderer({
      canvas
    })
    renderer.setSize(windowSize.width,windowSize.height)
    renderer.setClearColor('#000')
    renderer.shadowMap.enabled = true
    renderer.render(Scene,camera)
    const clock = new THREE.Clock()
    function animate(){
      const time = clock.getElapsedTime()
      window.requestAnimationFrame(animate)
      sphereMesh.position.x = Math.sin(time) * 3
      sphereMesh.position.z = Math.cos(time) * 3
      sphereMesh.position.y =  Math.abs(Math.sin(time * 2)*3) + 1
      camera.aspect = windowSize.width / windowSize.height
      camera.updateProjectionMatrix()
      controls.update()
      renderer.setSize(windowSize.width,windowSize.height)
      renderer.render(Scene,camera)
    }
    animate()
  },[])
  return (
    <canvas id={'webgl'}></canvas>
  )
}
