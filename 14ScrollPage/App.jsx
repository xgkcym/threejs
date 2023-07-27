import React, { useEffect, useRef } from 'react'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as THREE from 'three'
import * as dat from 'dat.gui'
import gsap from 'gsap'
import './App.css';

const windowParameter = {
  width: window.innerWidth,
  height: window.innerHeight,
  scrollY: window.scrollY,
  OffsetX: 0,
  OffsetY: 0,
  changPage:0,
}

window.addEventListener('scroll', () => {
  windowParameter.scrollY = window.scrollY
  geometryGroup.position.y = windowParameter.scrollY / windowParameter.height * parameter.distance * 2 / (90 / parameter.fov)
  let changPage = Math.round(window.scrollY / windowParameter.height)
  if(changPage != windowParameter.changPage){
    gsap.to(MeshList[changPage].rotation,{
      y:'+=3',
      x:'+=3',
      direction:3000,
      ease:'power2.inOut'
    })
    windowParameter.changPage = changPage
  }
})

window.addEventListener('resize', () => {
  windowParameter.width = window.innerWidth
  windowParameter.height = window.innerHeight

  for (let i = 0; i < MeshList.length; i++) {
    MeshList[i].position.y = -i * parameter.distance * 2 / (90 / parameter.fov)
    MeshList[i].position.x = Math.pow(-1, i) * (windowParameter.width / windowParameter.height)
  }
})

window.addEventListener('mousemove', (event) => {
  windowParameter.OffsetX = event.clientX / windowParameter.width - 0.5
  windowParameter.OffsetY = event.clientY / windowParameter.height - 0.5
  // geometryGroup.position.x = event.clientX / windowParameter.width - 0.5
  // geometryGroup.position.y = windowParameter.scrollY / windowParameter.height * parameter.distance * 2 / (90 / parameter.fov) + (event.clientY / windowParameter.height - 0.5)
})

const parameter = {
  materialColor: '#c5b191',
  distance: 10,
  fov: 30,
}

const gui = new dat.GUI()

const Scene = new THREE.Scene()


const directional = new THREE.DirectionalLight('#fff', 1)
directional.position.set(0, 1, 1)
Scene.add(directional)
const texterLoader = new THREE.TextureLoader()
const gradientsTexture = texterLoader.load(require('./static/textures/gradients/5.jpg'))
gradientsTexture.magFilter = THREE.NearestFilter



const geometryGroup = new THREE.Group()

const material = new THREE.MeshToonMaterial({
  color: parameter.materialColor,
  gradientMap: gradientsTexture
})

const Torus = new THREE.Mesh(
  new THREE.TorusGeometry(1, 0.5, 16, 100),
  material
)
const cone = new THREE.Mesh(
  new THREE.ConeGeometry(1, 2, 31),
  material
)

const TorusKnot = new THREE.Mesh(
  new THREE.TorusKnotGeometry(1, 0.3, 100, 16),
  material
)

let MeshList = [Torus, cone, TorusKnot]

for (let i = 0; i < MeshList.length; i++) {
  MeshList[i].position.y = -i * parameter.distance * 2 / (90 / parameter.fov)
  MeshList[i].position.x = Math.pow(-1, i) * (windowParameter.width / windowParameter.height)
}

geometryGroup.add(...MeshList)
Scene.add(geometryGroup)



const count = 2000;
const positions = new Float32Array(count * 3)
for (let i = 0; i < count; i++) {
  let height = parameter.distance / (90 / parameter.fov)
  positions[i * 3] = (Math.random() - 0.5) * 2 * height * (windowParameter.width / windowParameter.height)
  positions[i * 3 + 1] = Math.random() * (height - (-height * 5)) + (-height * 5);
  positions[i * 3 + 2] = (Math.random() - 0.5) * parameter.distance
}
const geometry = new THREE.BufferGeometry()
geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
const pointMaterial = new THREE.PointsMaterial({
  size: 0.03,
  sizeAttenuation: true,
  color: parameter.materialColor
})
const point = new THREE.Points(geometry, pointMaterial)
geometryGroup.add(point)


gui.addColor(parameter, 'materialColor').onChange(() => {
  material.color.set(parameter.materialColor)
  pointMaterial.color.set(parameter.materialColor)
})

const camera = new THREE.PerspectiveCamera(parameter.fov, windowParameter.width / windowParameter.height, 0.1, 100);
camera.position.z = parameter.distance
export default function App() {
  const webgl = useRef();
  useEffect(() => {
    const canvas = webgl.current
    const controls = new OrbitControls(camera, canvas)
    const renderer = new THREE.WebGL1Renderer({
      canvas,
      alpha: true
    })
    // renderer.setClearColor('#100')
    renderer.setClearAlpha(1)
    renderer.setSize(windowParameter.width, windowParameter.height);
    renderer.render(Scene, camera)
    const clock = new THREE.Clock()
    const animate = () => {
      const elapsed = clock.getElapsedTime();

      for (let k of MeshList) {
        k.rotation.x += 0.005
        k.rotation.y += 0.005
      }
      controls.update()
      geometryGroup.position.x += (windowParameter.OffsetX - geometryGroup.position.x) * 0.04
      camera.position.y += (windowParameter.OffsetY - camera.position.y) * 0.04
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
      <section>
        <h1>THREE JS0</h1>
      </section>
      <section>
        <h1>THREE JS1</h1>
      </section>
      <section>
        <h1>THREE JS2</h1>
      </section>
    </>
  )
}
