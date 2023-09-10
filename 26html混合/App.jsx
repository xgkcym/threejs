import React, { useEffect } from 'react'
import './App.css';
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { gsap } from 'gsap'
function init() {
  const windowSize = {
    width: window.innerWidth,
    height: window.innerHeight,
  }


  window.addEventListener('resize', () => {
    windowSize.width = window.innerWidth
    windowSize.height = window.innerHeight
    camera.aspect = windowSize.width / windowSize.height;
    renderer.setSize(windowSize.width, windowSize.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  })
  const Scene = new THREE.Scene()


  const camera = new THREE.PerspectiveCamera(75, windowSize.width / windowSize.height, 0.1, 100)
  camera.position.set(4, 1, - 4)


  const loaderDomEle = document.querySelector('.load-line')

  const loadingManager = new THREE.LoadingManager(
    () => {
      gsap.delayedCall(0.5, () => {
        gsap.to(plane.material.uniforms.uAplpha, { value: 0, duration: 3, direction: 1 })
        loaderDomEle.classList.add('enter')
        loaderDomEle.style.transform = ''
        gsap.delayedCall(1,()=>{
          sceneReady = true
        })
      })
    }, (url, loaded, total) => {
      loaderDomEle.style.transform = `scaleX(${loaded / total})`
    })

  const cubeTexteLoader = new THREE.CubeTextureLoader()
  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('/draco')
  const gltfloader = new GLTFLoader(loadingManager)
  gltfloader.setDRACOLoader(dracoLoader)

  const environmentMap = cubeTexteLoader.load([
    require('./textures/environmentMaps/0/px.jpg'),
    require('./textures/environmentMaps/0/nx.jpg'),
    require('./textures/environmentMaps/0/py.jpg'),
    require('./textures/environmentMaps/0/ny.jpg'),
    require('./textures/environmentMaps/0/pz.jpg'),
    require('./textures/environmentMaps/0/nz.jpg'),
  ])

  Scene.environmentMap = environmentMap
  Scene.background = environmentMap


  /**
   * Lights
   */
  const directionalLight = new THREE.DirectionalLight('#fff', 3)
  directionalLight.castShadow = true
  directionalLight.shadow.mapSize.set(1024, 1024)
  directionalLight.shadow.camera.far = 15
  directionalLight.shadow.normalBias = 0.05
  directionalLight.position.set(0.25, 3, - 2.25)
  Scene.add(directionalLight)




  const updateAllMaterials = () => {
    Scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
        child.material.envMapIntensity = 2.5
        child.material.needsUpdate = true
        child.castShadow = true
        child.receiveShadow = true
      }
    })
  }


  let sceneReady = false
  const raycaster = new THREE.Raycaster()
  const pointList = [
    {
      position: new THREE.Vector3(1.55, 0.3, -0.6),
      element: document.querySelector('.point-0')
    },
    {
      position: new THREE.Vector3(0.5, 0.8, -1.6),
      element: document.querySelector('.point-1')
    },
    {
      position: new THREE.Vector3(1.6, -1.3, -0.7),
      element: document.querySelector('.point-2')
    }
  ]


  gltfloader.load('DamagedHelmet/glTF/DamagedHelmet.gltf', (gltf) => {
    gltf.scene.scale.set(2, 2, 2)
    gltf.scene.rotation.y = Math.PI * 0.5
    Scene.add(gltf.scene)
    updateAllMaterials()
  })


  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2, 1, 1),
    new THREE.ShaderMaterial({
      transparent: true,
      uniforms: { uAplpha: { value: 1 } },
      vertexShader: `
        void main(){
          gl_Position =  vec4(position,1.0);
        }
      `,
      fragmentShader: `
      uniform float uAplpha;
        void main(){
          gl_FragColor = vec4(0,0,0,uAplpha);
        }
      
      `,
    })
  )
  Scene.add(plane)

  const canvas = document.querySelector('#webgl')
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true
  })
  renderer.setSize(windowSize.width, windowSize.height)

  renderer.render(Scene, camera)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFShadowMap
  renderer.useLegacyLights = false
  // renderer.toneMapping = THREE.ReinhardToneMapping
  renderer.toneMappingExposure = 1.5
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))




  const controls = new OrbitControls(camera, canvas)
  controls.enableDamping = true
  const clock = new THREE.Clock()

  const frame = () => {
    const elapsedTime = clock.getElapsedTime()

    if (sceneReady) {
      for (const point of pointList) {
        const position = point.position.clone();
        position.project(camera)

        raycaster.setFromCamera(position, camera)


        const intersecs = raycaster.intersectObjects(Scene.children, true);
        if (intersecs.length === 0) {
          point.element.classList.add('visible')
        } else {
          const intersectionDistance = intersecs[0].distance
          const pointDistance = point.position.distanceTo(camera.position);
          if (intersectionDistance < pointDistance) {
            point.element.classList.remove('visible')
          } else {
            point.element.classList.add('visible')
          }
        }
        const transLateX = position.x * windowSize.width * 0.5;
        const transLateY = -position.y * windowSize.height * 0.5;
        point.element.style.transform = `translate(${transLateX}px,${transLateY}px)`
      }

    }


    controls.update()
    camera.updateProjectionMatrix()
    renderer.render(Scene, camera)
    window.requestAnimationFrame(frame)
  }

  frame()
}


export default function App() {

  useEffect(() => {
    init()
  }, [])
  return (
    <>
      <canvas id={'webgl'}></canvas>
      <div className={'load-line'}></div>
      <div className='point point-0'>
        <div className='label'>1</div>
        <div className='text'>Lorem ipsum,dolor sit amet consectetur adipisicing elit</div>
      </div>
      <div className='point point-1'>
        <div className='label'>2</div>
        <div className='text'>Lorem ipsum,dolor sit amet consectetur adipisicing elit</div>
      </div>
      <div className='point point-2'>
        <div className='label'>3</div>
        <div className='text'>Lorem ipsum,dolor sit amet consectetur adipisicing elit</div>
      </div>
    </>
  )
}
