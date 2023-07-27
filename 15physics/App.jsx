import React, { useEffect, useRef } from 'react'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as THREE from 'three'
import * as dat from 'dat.gui'
import * as CANNON from 'cannon-es'
import './App.css';
const windowParameter = {
  width: window.innerWidth,
  height: window.innerHeight,
}



window.addEventListener('resize', () => {
  windowParameter.width = window.innerWidth
  windowParameter.height = window.innerHeight

})

const audio = new Audio(require('./static/sounds/hit.mp3'))



const cubeLoader = new THREE.CubeTextureLoader()

const environmentTexture = cubeLoader.load([
  require('./static/textures/environmentMaps/0/nx.png'),
  require('./static/textures/environmentMaps/0/px.png'),
  require('./static/textures/environmentMaps/0/ny.png'),
  require('./static/textures/environmentMaps/0/py.png'),
  require('./static/textures/environmentMaps/0/nz.png'),
  require('./static/textures/environmentMaps/0/pz.png'),
])
const gui = new dat.GUI()

const guiParameter = {
  createSphere: () => {
    const radius = Math.abs(Math.random() - 0.5)
    createSphere(radius < 0.25 ? 0.25 : radius, { x: Math.random() - 0.5, y: 3, z: Math.random() - 0.5 })
  },
  createBox: () => {
    createBox(Math.random(),Math.random(),Math.random(),{x: Math.random() - 0.5, y: 3, z: Math.random() - 0.5})
  },
  reset:()=>{
    reset()
  }
}
gui.add(guiParameter, 'createSphere')
gui.add(guiParameter, 'createBox')
gui.add(guiParameter, 'reset')

const Scene = new THREE.Scene()



const world = new CANNON.World({
  gravity: new CANNON.Vec3(0, -9.82, 0)
})
world.broadphase = new CANNON.SAPBroadphase(world)
world.allowSleep = true

const defaultMaterial = new CANNON.Material('default');
const conactMaterial = new CANNON.ContactMaterial(
  defaultMaterial,
  defaultMaterial,
  {
    friction: 0.1,
    restitution: 0.7
  }
)

world.addContactMaterial(conactMaterial)




const planeBody = new CANNON.Body({
  shape: new CANNON.Plane(),
  mass: 0,
  material: defaultMaterial
})
planeBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0)
world.addBody(planeBody)


const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const Material = new THREE.MeshStandardMaterial({
  metalness: 0.3,
  roughness: 0.4,
  envMap: environmentTexture,
  emissiveIntensity: 1,
})
const objectList = []
const createSphere = (radius, position) => {
  const mesh = new THREE.Mesh(sphereGeometry, Material);
  mesh.castShadow = true;
  mesh.scale.set(radius, radius, radius);
  mesh.position.copy(position)
  Scene.add(mesh);

  const body = new CANNON.Body({
    shape: new CANNON.Sphere(radius),
    material: defaultMaterial,
    mass: 4 / 3 * Math.PI * Math.pow(radius, 3),
    position
  })
  body.addEventListener('collide',(collide)=>{
    const alongNormal = collide.contact.getImpactVelocityAlongNormal()
    if(alongNormal > 1.5){
      audio.currentTime = 0;
      audio.play()
    }
  })
  world.addBody(body)
  objectList.push({ mesh, body })
}

createSphere(0.5, { x: 0, y: 3, z: 0 })

const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
const createBox = (width, height, depth, position) => {
  const mesh = new THREE.Mesh(
    boxGeometry,
    Material
  )
  mesh.castShadow = true
  mesh.scale.set(width, height, depth)
  mesh.position.copy(position)
  Scene.add(mesh)
  const body = new CANNON.Body({
    shape: new CANNON.Box(new CANNON.Vec3(width*0.5,height*0.5,depth*0.5)),
    position,
    material: defaultMaterial,
    mass:width*height*depth
  })
  body.addEventListener('collide',(collide)=>{
    const alongNormal = collide.contact.getImpactVelocityAlongNormal()
    if(alongNormal > 1.5){
      audio.currentTime = 0;
      audio.play()
    }
  })
  world.addBody(body)
  objectList.push({ mesh, body })
}

const reset = ()=>{
  for(let item of objectList){
    item.body.removeEventListener('collide')
    world.removeBody(item.body)
    Scene.remove(item.mesh)
  }
}



const ambientlight = new THREE.AmbientLight('#f2f2f2', 0.1);
Scene.add(ambientlight)

const directional = new THREE.DirectionalLight('#fff', 0.5)
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
      for (let item of objectList) {
        item.mesh.position.copy(item.body.position)
        item.mesh.quaternion.copy(item.body.quaternion)
      }
      // sphereBody.applyForce(new CANNON.Vec3(-0.01,0,0),sphereBody.position)
      controls.update()
      world.fixedStep(1 / 60, detalTime, 3)
      // sphere.position.copy(sphereBody.position)
      // sphere.quaternion.copy(sphereBody.quaternion)
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
