import React, { useEffect } from 'react'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import dat from 'dat.gui'
const pos = {
  x:0,
  y:0
}
const windowSize = {
  width: window.innerWidth,
  height: window.innerHeight,
}
window.addEventListener('mousemove',(e)=>{
  pos.x = e.clientX/windowSize.width - 0.5
  pos.y = e.clientY/windowSize.height - 0.5
})

window.addEventListener('resize',()=>{
  windowSize.width = window.innerWidth
  windowSize.height = window.innerHeight
})

const box = {
  color:'#ff0000',
  handle:()=>{

  },
  bool:true
}

export default function App() {
  useEffect(() => {

   
    const Scene = new THREE.Scene()
    const geometry = new THREE.BoxGeometry(1,1,1) 
    const material = new THREE.MeshBasicMaterial({
      color: box.color,
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
    controls.enableDamping = box.bool
    const renderer = new THREE.WebGL1Renderer({
      canvas
    })
    renderer.setSize(windowSize.width, windowSize.height)
    renderer.render(Scene, camera)
    const frame = () => {
      controls.update()
      camera.aspect = windowSize.width /  windowSize.height
      camera.updateProjectionMatrix()
      renderer.setSize(windowSize.width, windowSize.height)
      renderer.render(Scene, camera)
      window.requestAnimationFrame(frame)
    }
    frame()
    const gui = new dat.GUI()
    gui.add(mesh.position,'x',-3,3).name('盒子的x轴')
    gui.add(mesh.position,'y',-3,3).name('盒子的Y轴')
    gui.add(mesh.position,'z',-3,3).name('盒子的Z轴')
    gui.addColor(box,'color').name('盒子颜色').onChange(()=>{
      mesh.material.color.set(box.color)
    })
    gui.add(box,'handle').name('按钮')
    gui.add(box,'bool').name('动画光滑').onChange(()=>{
      controls.enableDamping = box.bool
    })
  }, [])
  return (
    <canvas id={'webgl'}></canvas>
  )
}
