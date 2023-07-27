import React, { useEffect } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { DotScreenPass } from 'three/examples/jsm/postprocessing/DotScreenPass'
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { RGBShiftShader } from 'three/examples/jsm/shaders/RGBShiftShader'
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader'


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
    effectComposer.setSize(windowSize.width, windowSize.height);
    effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  })
  const Scene = new THREE.Scene()


  const camera = new THREE.PerspectiveCamera(75, windowSize.width / windowSize.height, 0.1, 100)
  camera.position.set(4, 1, - 4)
  const TextureLoader = new THREE.TextureLoader()
  const cubeTexteLoader = new THREE.CubeTextureLoader()
  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('/draco')
  const gltfloader = new GLTFLoader()
  gltfloader.setDRACOLoader(dracoLoader)
  const colorTexture = TextureLoader.load('DamagedHelmet/glTF/Default_albedo.jpg')
  const AOTexture = TextureLoader.load('DamagedHelmet/glTF/Default_normal.jpg')
  const emissiveTexture = TextureLoader.load('DamagedHelmet/glTF/Default_emissive.jpg')
  const metalRoughnessTexture = TextureLoader.load('DamagedHelmet/glTF/Default_metalRoughness.jpg')
  const normalTexture = TextureLoader.load('DamagedHelmet/glTF/Default_normal.jpg')

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


  const standerMaterial = new THREE.MeshStandardMaterial({
    normalMap: normalTexture,
    aoMap: AOTexture,
    aoMapIntensity: 1,
    emissiveMap: emissiveTexture,
    metalnessMap: metalRoughnessTexture,
    map: colorTexture
  })



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


  gltfloader.load('DamagedHelmet/glTF/DamagedHelmet.gltf', (gltf) => {

    gltf.scene.scale.set(2, 2, 2)
    gltf.scene.rotation.y = Math.PI * 0.5
    Scene.add(gltf.scene)
    updateAllMaterials()
  })



  const canvas = document.querySelector('#webgl')
  const renderer = new THREE.WebGL1Renderer({
    canvas,
    antialias: true
  })
  renderer.setSize(windowSize.width, windowSize.height)

  renderer.render(Scene, camera)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFShadowMap
  renderer.useLegacyLights = false
  renderer.toneMapping = THREE.ReinhardToneMapping
  renderer.toneMappingExposure = 1.5
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  const renderTarget = new THREE.WebGLRenderTarget(800,600,{
    samples:2
  })

  const effectComposer = new EffectComposer(renderer,renderTarget)
  effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  effectComposer.setSize(windowSize.width, windowSize.height)

  const renderPass = new RenderPass(Scene, camera)
  effectComposer.addPass(renderPass)

  const dotScreenPass = new DotScreenPass()
  dotScreenPass.enabled = false
  effectComposer.addPass(dotScreenPass)


  const glitchPass = new GlitchPass()
  // glitchPass.goWild = true
  glitchPass.enabled = true
  effectComposer.addPass(glitchPass)

  const rgbShifPass = new ShaderPass(RGBShiftShader)
  rgbShifPass.enabled = false
  effectComposer.addPass(rgbShifPass)

  const gammaCorrectionPass = new ShaderPass(GammaCorrectionShader)
  effectComposer.addPass(gammaCorrectionPass)


  const controls = new OrbitControls(camera, canvas)
  controls.enableDamping = true
  const clock = new THREE.Clock()

  const frame = () => {
    const elapsedTime = clock.getElapsedTime()
    controls.update()
    camera.updateProjectionMatrix()
    effectComposer.render()
    window.requestAnimationFrame(frame)
  }

  frame()
}


export default function App() {

  useEffect(() => {
    init()
  }, [])
  return (
    <canvas id={'webgl'}></canvas>
  )
}
