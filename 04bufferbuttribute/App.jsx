import React, { useEffect } from 'react'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

const pos = {
  x:0,
  y:0
}
const windowSize = {
  width: 800,
  height: 600,
}
window.addEventListener('mousemove',(e)=>{
  pos.x = e.clientX/windowSize.width - 0.5
  pos.y = e.clientY/windowSize.height - 0.5
})


export default function App() {
  useEffect(() => {
    const Scene = new THREE.Scene()
    const FArray = new Float32Array([
      -0.5,0,0.5,
      0.5,0,0.5,
      0.5,1,0.5,
    ]);
    const bufferAttribute = new THREE.BufferAttribute(FArray,3)
    const geometry = new THREE.BufferGeometry() 
    geometry.setAttribute('position',bufferAttribute)
    const material = new THREE.MeshBasicMaterial({
      color: '#FF0000',
      // wireframe:true
    })
    const mesh = new THREE.Mesh(geometry, material)
    Scene.add(mesh);
    const axeshelp = new THREE.AxesHelper(3)
    Scene.add(axeshelp)
    const camera = new THREE.PerspectiveCamera(75, windowSize.width / windowSize.height,1,100);
    camera.position.z = 3
    const canvas = document.querySelector('#webgl')
    const controls = new OrbitControls(camera,canvas)
    controls.enableDamping = true
    const renderer = new THREE.WebGL1Renderer({
      canvas
    })
    renderer.setSize(windowSize.width, windowSize.height)
    renderer.render(Scene, camera)
    const frame = () => {
      controls.update()
      renderer.render(Scene, camera)
      window.requestAnimationFrame(frame)
    }

    frame()

  }, [])
  return (
    <canvas id={'webgl'}></canvas>
  )
}
