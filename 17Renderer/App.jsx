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

const Scene = new THREE.Scene()


const gui = new dat.GUI()
const degObj = {
  envMapIntensity:3,
  toneMapping:THREE.NoToneMapping
}

const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/draco/')
const gltfloader = new GLTFLoader()
gltfloader.setDRACOLoader(dracoLoader)
let mixer
//静态文件需要移到pulibc下面
gltfloader.load('flightHelmet/FlightHelmet.gltf',
// gltfloader.load('hamburger/hamburger.gltf',
  (gltf) => {
    gltf.scene.scale.x = 0.2
    gltf.scene.scale.y = 0.2
    gltf.scene.scale.z = 0.2
    gltf.scene.rotation.y = Math.PI *0.25
    Scene.add(gltf.scene)
    gui.add(degObj,'envMapIntensity').max(10).min(0).name('envMapIntensity').onChange(updateMaterial)
    updateMaterial()
},
  () => {

  },
  (err) => {
    console.log(err);
    console.log('error');

  })


const cubuLoader = new THREE.CubeTextureLoader()
const cubuText = cubuLoader.load([
  require('./static/environmentMaps/0/px.jpg'),
  require('./static/environmentMaps/0/nx.jpg'),
  require('./static/environmentMaps/0/py.jpg'),
  require('./static/environmentMaps/0/ny.jpg'),
  require('./static/environmentMaps/0/pz.jpg'),
  require('./static/environmentMaps/0/nz.jpg'),
])

cubuText.encoding = THREE.sRGBEncoding


Scene.background = cubuText
Scene.environment = cubuText


const updateMaterial = () => {
  Scene.traverse(child => {
    if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial){
      // child.material.envMap = cubuText
      child.material.envMapIntensity = degObj.envMapIntensity 
      child.material.needsUpdate = true
      child.receiveShadow = true
      child.castShadow = true
      // renderer
      Scene.updateMatrix()
    }
  })
}



const ambientlight = new THREE.AmbientLight('#f2f2f2', 0.1);
Scene.add(ambientlight)

const directional = new THREE.DirectionalLight('#fff', 5)
directional.position.set(0, 1, 1)
directional.castShadow = true
directional.shadow.mapSize.width = 4096
directional.shadow.mapSize.height = 4096
directional.shadow.normalBias = 0.01
Scene.add(directional)

gui.add(directional.position,'x').min(-10).max(10).step(0.001).name('lightX');
gui.add(directional.position,'y').min(-10).max(10).step(0.001).name('lightY');
gui.add(directional.position,'z').min(-10).max(10).step(0.001).name('lightZ');
gui.add(directional,'intensity').min(0).max(10).step(0.001).name('lightIntensity');


const directionalHelp = new THREE.DirectionalLightHelper(directional);
Scene.add(directionalHelp)



const camera = new THREE.PerspectiveCamera(75, windowParameter.width / windowParameter.height, 0.1, 100);
camera.position.z = 1
camera.position.y = 1
export default function App() {
  const webgl = useRef();
  useEffect(() => {
    const canvas = webgl.current
    const controls = new OrbitControls(camera, canvas)
    const renderer = new THREE.WebGL1Renderer({
      canvas,
      antialias:true
    })
    renderer.shadowMap.enabled = true
    renderer.physicallyCorrectLights = true
    renderer.outputEncoding = THREE.sRGBEncoding
    renderer.toneMapping = THREE.CineonToneMapping //风格
    renderer.toneMappingExposure = 3 //曝光

    renderer.setClearAlpha(1)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
    renderer.setSize(windowParameter.width, windowParameter.height);
    renderer.render(Scene, camera)
    gui.add(renderer,'toneMapping',{
      No:THREE.NoToneMapping,
      Line:THREE.LinearToneMapping,
      Reinhard:THREE.ReinhardToneMapping,
      Cineon:THREE.CineonToneMapping,
      ACESFilmic:THREE.ACESFilmicToneMapping,
    }).onFinishChange(()=>{
      renderer.toneMapping = Number(renderer.toneMapping)
      updateMaterial()
    })
    const clock = new THREE.Clock()
    let preTime = 0;
    const animate = () => {
      const elapsed = clock.getElapsedTime();
      const detalTime = elapsed - preTime;
      preTime = elapsed;
      mixer && mixer.update(detalTime)
      controls.update()
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
