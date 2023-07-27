import React, { useEffect } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'


const windowSize = {
  width: window.innerWidth,
  height: window.innerHeight,
}



window.addEventListener('resize', () => {
  windowSize.width = window.innerWidth
  windowSize.height = window.innerHeight

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

    const camera = new THREE.PerspectiveCamera(75, windowSize.width / windowSize.height);
    camera.position.z = 3
    const canvas = document.querySelector('#webgl')
    const renderer = new THREE.WebGL1Renderer({
      canvas
    })
    renderer.setSize(windowSize.width, windowSize.height)

    renderer.render(Scene, camera)
    const controls = new OrbitControls(camera,canvas)
 
    const frame = () => {
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
