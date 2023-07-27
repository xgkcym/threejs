import React, { useEffect } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
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
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({
      color: '#FF0000'
    })
    const mesh = new THREE.Mesh(geometry, material)
    Scene.add(mesh);

    const axeshelp = new THREE.AxesHelper(3)
    Scene.add(axeshelp)
    const camera = new THREE.PerspectiveCamera(75, windowSize.width / windowSize.height);
    camera.position.z = 3
    // camera.position.x = 2
    // camera.position.y = 2
    const canvas = document.querySelector('#webgl')
    const renderer = new THREE.WebGL1Renderer({
      canvas
    })
    const controls = new OrbitControls(camera,canvas)
    // controls.target.y = 2;
    // controls.update()
    controls.enableDamping = true
    Scene.add(controls)
    renderer.setSize(windowSize.width, windowSize.height)

    renderer.render(Scene, camera)

    // gsap.to(mesh.position,{direction:1,delay:1,x:1,y:1})
    // const clock = new THREE.Clock()
    const frame = () => {
      // const elapsedTime = clock.getElapsedTime()
      // camera.position.x = Math.sin(elapsedTime)
      // camera.position.y = Math.cos(elapsedTime)
      // camera.lookAt(mesh.position)
      // mesh.position.x = pos.x;
      // mesh.position.y = pos.y;
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
