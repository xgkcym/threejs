import React, { useEffect } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const windowSize = {
  width: window.innerWidth,
  height: window.innerHeight,
}



window.addEventListener('resize', () => {
  windowSize.width = window.innerWidth
  windowSize.height = window.innerHeight

})
const Scene = new THREE.Scene()


const camera = new THREE.PerspectiveCamera(75, windowSize.width / windowSize.height, 0.1, 100)
camera.position.set(4, 1, - 4)
const TextureLoader = new THREE.TextureLoader()
const cubeTexteLoader = new THREE.CubeTextureLoader()
const gltfLoader = new GLTFLoader()
const colorTexture = TextureLoader.load(require('./models/LeePerrySmith/color.jpg'))
colorTexture.colorSpace = THREE.SRGBColorSpace
const normalTexture = TextureLoader.load(require('./models/LeePerrySmith/normal.jpg'))

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
const directionalLight = new THREE.DirectionalLight('#ffffff', 3)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.normalBias = 0.05
directionalLight.position.set(0.25, 2, - 2.25)
Scene.add(directionalLight)


const standerMaterial = new THREE.MeshStandardMaterial({
  normalMap: normalTexture,
  map: colorTexture
})

const depthmaterial = new THREE.MeshDepthMaterial(
  {
    depthPacking:THREE.RGBADepthPacking
  }
)


const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(15, 15, 32, 32),
  new THREE.MeshStandardMaterial()
)
plane.rotation.y = Math.PI 
plane.position.y = -5
plane.position.z = 5
Scene.add(plane)

const customUniform = {
  uTime: { value: 0.0 }
}

standerMaterial.onBeforeCompile = (shader) => {
  shader.uniforms.uTime = customUniform.uTime
  shader.vertexShader = shader.vertexShader.replace(
    '#include <common>',
    `#include <common>
        uniform  float uTime;
        mat2 get2dRotateMatrix(float _angle){
          return mat2(cos(_angle),-sin(_angle),sin(_angle),cos(_angle));
        }
    `
  )
  shader.vertexShader = shader.vertexShader.replace(
    '#include <beginnormal_vertex>',
    `#include <beginnormal_vertex>
      float angle = (position.y + uTime) * 0.4;
      mat2 rotateMatrix = get2dRotateMatrix(angle);
      objectNormal.xz *= rotateMatrix;
    `
  )
  shader.vertexShader = shader.vertexShader.replace(
    '#include <begin_vertex>',
    `#include <begin_vertex>
      transformed.xz *= rotateMatrix;
    `
  )
}
depthmaterial.onBeforeCompile = (shader) => {
  shader.uniforms.uTime = customUniform.uTime
  shader.vertexShader = shader.vertexShader.replace(
    '#include <common>',
    `#include <common>
        uniform  float uTime;
        mat2 get2dRotateMatrix(float _angle){
          return mat2(cos(_angle),-sin(_angle),sin(_angle),cos(_angle));
        }
    `
  )
  shader.vertexShader = shader.vertexShader.replace(
    '#include <begin_vertex>',
    `#include <begin_vertex>
      float angle = (position.y + uTime) * 0.4;
      mat2 rotateMatrix = get2dRotateMatrix(angle);
      transformed.xz *= rotateMatrix;
    `
  )
}


const updateAllMaterials = () => {
  Scene.traverse((child) => {
    if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
      child.material.envMapIntensity = 1
      child.material.needsUpdate = true
      child.castShadow = true
      child.receiveShadow = true
    }
  })
}


gltfLoader.load('LeePerrySmith/LeePerrySmith.glb', (file) => {
  const mesh = file.scene.children[0]
  mesh.material = standerMaterial
  mesh.customDepthMaterial = depthmaterial
  mesh.rotation.y = Math.PI * 0.5
  Scene.add(mesh)
  updateAllMaterials()
})


export default function App() {

  useEffect(() => {

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
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


    const controls = new OrbitControls(camera, canvas)
    controls.enableDamping = true
    const clock = new THREE.Clock()

    const frame = () => {
      const elapsedTime = clock.getElapsedTime()
      customUniform.uTime.value = elapsedTime
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
