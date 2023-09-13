import React, { useEffect } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import pointVertex from './shader/point/vertex.glsl'
import pointFragment from './shader/point/fragment.glsl'
import bigLightVartex from './shader/bigLight/vertex.glsl'
import bigLightFragment from './shader/bigLight/fragment.glsl'
const windowSize = {
  width: window.innerWidth,
  height: window.innerHeight,
}



window.addEventListener('resize', () => {
  windowSize.width = window.innerWidth
  windowSize.height = window.innerHeight

})


const gltfloader = new GLTFLoader()
const textureLoader = new THREE.TextureLoader()

const baked = textureLoader.load(require('./blender/mybacked.jpg'))
baked.encoding = THREE.sRGBEncoding
baked.flipY = false
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/draco/')
gltfloader.setDRACOLoader(dracoLoader)



export default function App() {

  useEffect(() => {
    const Scene = new THREE.Scene()
    const baseMaterial = new THREE.MeshBasicMaterial({ map: baked })
    const pointLightMaterial = new THREE.MeshBasicMaterial({ color: "#ffffe7" })
    const bigLightMaterial = new THREE.ShaderMaterial({
      vertexShader:bigLightVartex,
      fragmentShader:bigLightFragment
    })
    // 添加粒子
    const count = 30;
    const positions = new Float32Array(count * 3)
    const scales = new Float32Array(count)
    const pointGeometry = new THREE.BufferGeometry()
    for (let i = 0; i < count; i++) {
      positions[i*3 + 0] = (Math.random() - 0.5) * 4
      positions[i*3 + 1] = Math.random() * 2
      positions[i*3 + 2] = (Math.random() - 0.5) * 4
      scales[i] = Math.random()
    }
    pointGeometry.setAttribute('position',new THREE.BufferAttribute(positions,3))
    pointGeometry.setAttribute('aScale',new THREE.BufferAttribute(scales,1))
    const pointMaterial = new THREE.ShaderMaterial({
      vertexShader:pointVertex,
      fragmentShader:pointFragment,
      uniforms:{
        uPixelRatio:{value:Math.min(window.devicePixelRatio,2)},
        uSize:{value:100},
        uTime:{value:0}
      },
      blending:THREE.AdditiveBlending,
      transparent:true,
      depthWrite:false
    })
    
    const point = new THREE.Points(pointGeometry,pointMaterial)
    Scene.add(point)

    gltfloader.load(require('./blender/render.glb'), (gltf) => {
      Scene.add(gltf.scene)
      gltf.scene.traverse((child) => {
        if (child.name === 'menged')
          child.material = baseMaterial
        else if (child.name.includes('pointLight'))
          child.material = pointLightMaterial
        else if (child.name === 'bigLight')
          child.material = bigLightMaterial
      })
    })

    const camera = new THREE.PerspectiveCamera(75, windowSize.width / windowSize.height);
    camera.position.set(3, 4,4)
    const canvas = document.querySelector('#webgl')
    const renderer = new THREE.WebGL1Renderer({
      canvas
    })
    renderer.setSize(windowSize.width, windowSize.height)
    renderer.outputEncoding = THREE.sRGBEncoding

    renderer.render(Scene, camera)
    const controls = new OrbitControls(camera, canvas)
    const clock = new THREE.Clock()
    const frame = () => {
      const elapsed = clock.getElapsedTime()
      pointMaterial.uniforms.uTime.value = elapsed;
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
