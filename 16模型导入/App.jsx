import React, { useEffect, useRef } from 'react'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as THREE from 'three'
import * as dat from 'dat.gui'
import './App.css';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
const windowParameter = {
  width: window.innerWidth,
  height: window.innerHeight,
}



window.addEventListener('resize', () => {
  windowParameter.width = window.innerWidth
  windowParameter.height = window.innerHeight

})
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/draco/')
const gltfloader = new GLTFLoader()
gltfloader.setDRACOLoader(dracoLoader)
let mixer
//静态文件需要移到pulibc下面
gltfloader.load('buster_drone/scene.gltf',
  // gltfloader.load('hamburger/hamburger.gltf',
  (gltf) => {
    gltf.scene.position.y = 2
    mixer = new THREE.AnimationMixer(gltf.scene)
    const action = mixer.clipAction(gltf.animations[0])
    action.play()
    Scene.add(gltf.scene)
  },
  () => {

  },
  (err) => {
    console.log(err);
    console.log('error');

  })
const gui = new dat.GUI()


const Scene = new THREE.Scene()






const ambientlight = new THREE.AmbientLight('#f2f2f2', 0.1);
Scene.add(ambientlight)

const directional = new THREE.DirectionalLight('#fff', 0.7)
directional.position.set(0, 5, 5)
directional.castShadow = true

Scene.add(directional)

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  new THREE.MeshStandardMaterial()
)
plane.receiveShadow = true
plane.rotation.x = -Math.PI / 2
Scene.add(plane)


const camera = new THREE.PerspectiveCamera(75, windowParameter.width / windowParameter.height, 0.1, 100);
camera.position.z = 10
camera.position.y = 7
export default function App() {
  const webgl = useRef();
  useEffect(() => {
    const canvas = webgl.current
    const controls = new OrbitControls(camera, canvas)
    const renderer = new THREE.WebGL1Renderer({
      canvas,
    })
    renderer.shadowMap.enabled = true
    renderer.setClearAlpha(1)
    renderer.setSize(windowParameter.width, windowParameter.height);
    renderer.render(Scene, camera)

    const clock = new THREE.Clock()
    let preTime = 0;
    const animate = () => {
      const elapsed = clock.getElapsedTime();
      const detalTime = elapsed - preTime;
      preTime = elapsed;
      controls.update()
      mixer && mixer.update(detalTime)
      camera.aspect = windowParameter.width / windowParameter.height;
      camera.updateProjectionMatrix()
      renderer.setSize(windowParameter.width, windowParameter.height);
      renderer.render(Scene, camera)
      requestAnimationFrame(animate)
    }
    animate()
    return () => {
      gui.destroy()
    }
  }, [])

  return (
    <>
      <canvas ref={webgl}></canvas>
    </>
  )
}
