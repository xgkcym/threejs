import React, { useEffect } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import dat from 'dat.gui'

const guiControls = {
  wallColor: '#ac8e82',
  roofColor: '#b35f45'
}


const windowSize = {
  width: window.outerWidth,
  height: window.outerHeight,
}


window.addEventListener('resize', () => {
  windowSize.width = window.outerWidth
  windowSize.height = window.outerHeight
})

const TexterLoader = new THREE.TextureLoader();
const ColorDoorTexter = TexterLoader.load(require('./static/door/color.jpg'))
const AlphaDoorTexter = TexterLoader.load(require('./static/door/alpha.jpg'))
const AmbientOcclusionDoorTexter = TexterLoader.load(require('./static/door/ambientOcclusion.jpg'))
const HeightDoorTexter = TexterLoader.load(require('./static/door/height.jpg'))
const MetalnessDoorTexter = TexterLoader.load(require('./static/door/metalness.jpg'))
const NormalDoorTexter = TexterLoader.load(require('./static/door/normal.jpg'))
const RoughnessDoorTexter = TexterLoader.load(require('./static/door/roughness.jpg'))


const ColorWallTextuer = TexterLoader.load(require('./static/bricks/color.jpg'))
const AmbientOcclusionWallTextuer = TexterLoader.load(require('./static/bricks/ambientOcclusion.jpg'))
const NormalWallTextuer = TexterLoader.load(require('./static/bricks/normal.jpg'))
const RoughnessWallTextuer = TexterLoader.load(require('./static/bricks/roughness.jpg'))


const ColorFootTexture = TexterLoader.load(require('./static/grass/color.jpg'))
const AmbientOcclusionFootTexture = TexterLoader.load(require('./static/grass/ambientOcclusion.jpg'))
const NormalFootTexture = TexterLoader.load(require('./static/grass/normal.jpg'))
const RoughnessFootTexture = TexterLoader.load(require('./static/grass/roughness.jpg'))




ColorFootTexture.repeat.set(8,8)
AmbientOcclusionFootTexture.repeat.set(8,8)
NormalFootTexture.repeat.set(8,8)
RoughnessFootTexture.repeat.set(8,8)

ColorFootTexture.wrapS = THREE.RepeatWrapping
AmbientOcclusionFootTexture.wrapS = THREE.RepeatWrapping
NormalFootTexture.wrapS = THREE.RepeatWrapping
RoughnessFootTexture.wrapS = THREE.RepeatWrapping



ColorFootTexture.wrapT = THREE.RepeatWrapping
AmbientOcclusionFootTexture.wrapT = THREE.RepeatWrapping
NormalFootTexture.wrapT = THREE.RepeatWrapping
RoughnessFootTexture.wrapT = THREE.RepeatWrapping

const Scene = new THREE.Scene()

const fov = new THREE.Fog('#262837', 1, 10)
Scene.fog = fov
const ambient = new THREE.AmbientLight('#fff', 0.12);
Scene.add(ambient)

const directional = new THREE.DirectionalLight('#fff', 0.12);
Scene.add(directional)

const ghost1 = new THREE.PointLight('#f0f',2,3);
Scene.add(ghost1)

const ghost2 = new THREE.PointLight('#0ff',2,3);
Scene.add(ghost2)

const ghost3 = new THREE.PointLight('#ff0',2,3);
Scene.add(ghost3)


const Camera = new THREE.PerspectiveCamera(75, windowSize.width / windowSize.height, 0.1, 1000);
Camera.position.z = 8
Camera.position.y = 1



const tombstoneGeometry = new THREE.BoxGeometry(0.2, 0.4, 0.075);
const tombstoneMaterial = new THREE.MeshStandardMaterial({
  color: '#b2b6b1',
})

for (let i = 0; i < 200; i++) {
  const mesh = new THREE.Mesh(tombstoneGeometry, tombstoneMaterial)
  const random = Math.random() * 2 * Math.PI
  mesh.position.x = Math.sin(random) * (1.5 + Math.random() * 20);
  mesh.position.z = Math.cos(random) * (1.5 + Math.random() * 20);
  mesh.position.y = tombstoneGeometry.parameters.height /2 - 0.05
  mesh.rotation.x = (Math.random() - 0.5) * 0.3
  mesh.rotation.z = (Math.random() - 0.5) * 0.3
  mesh.castShadow = true;
  Scene.add(mesh)
}

const house = new THREE.Group();


const wallMash = new THREE.Mesh(
  new THREE.BoxGeometry(1.5, 0.75, 1.5, 100, 100),
  new THREE.MeshStandardMaterial({
    color: guiControls.wallColor,
    transparent: true,
    map: ColorWallTextuer,
    aoMap: AmbientOcclusionWallTextuer,
    normalMap: NormalWallTextuer,
    roughnessMap: RoughnessWallTextuer,
    side:THREE.DoubleSide
  })
);
wallMash.geometry.setAttribute('uv2', new THREE.BufferAttribute(wallMash.geometry.attributes.uv.array, 2))


wallMash.position.y = wallMash.geometry.parameters.height / 2 -0.01
house.add(wallMash)



const roof = new THREE.Mesh(
  new THREE.ConeGeometry(wallMash.geometry.parameters.width * 0.9, wallMash.geometry.parameters.width * 0.3, 4),
  new THREE.MeshStandardMaterial({
    color: guiControls.roofColor
  })
)

roof.position.y = wallMash.geometry.parameters.height + roof.geometry.parameters.height / 2
roof.rotation.y = Math.PI / 4
house.add(roof)



const doorMesh = new THREE.Mesh(
  new THREE.PlaneGeometry(0.75, 0.75, 100, 100),
  new THREE.MeshStandardMaterial({
    transparent: true,
    map: ColorDoorTexter,
    alphaMap: AlphaDoorTexter,
    normalMap: NormalDoorTexter,
    metalnessMap: MetalnessDoorTexter,
    roughnessMap: RoughnessDoorTexter,
    aoMap: AmbientOcclusionDoorTexter,
    displacementMap: HeightDoorTexter,
    displacementScale: 0.05
  })
)
doorMesh.geometry.setAttribute('uv2', new THREE.BufferAttribute(doorMesh.geometry.attributes.uv.array, 2))
doorMesh.position.y = (doorMesh.geometry.parameters.height / 2) - 0.04
doorMesh.position.z = (wallMash.geometry.parameters.depth / 2) - 0.01

house.add(doorMesh)


const doorPoint = new THREE.PointLight('#ff7d46', 1, 5)

doorPoint.position.z = wallMash.geometry.parameters.depth
doorPoint.position.y = wallMash.geometry.parameters.height
house.add(doorPoint)


const bashGeometry = new THREE.SphereGeometry(0.5, 16, 16);
const bashMaterial = new THREE.MeshStandardMaterial({ color: '#89c854' })


const bash1 = new THREE.Mesh(bashGeometry, bashMaterial);
const bash1Scale = 0.3
bash1.scale.set(bash1Scale, bash1Scale, bash1Scale)
bash1.position.z = wallMash.geometry.parameters.depth * 0.5 + (bash1.geometry.parameters.radius * bash1Scale) - (bash1.geometry.parameters.radius * bash1Scale * 0.2)
bash1.position.y = bash1.geometry.parameters.radius * bash1Scale * 0.3
bash1.position.x = 0.4
house.add(bash1)



const bash2 = new THREE.Mesh(bashGeometry, bashMaterial);
const bash2Scale = 0.2
bash2.scale.set(bash2Scale, bash2Scale, bash2Scale)
bash2.position.z = wallMash.geometry.parameters.depth * 0.5 + (bash2.geometry.parameters.radius * bash2Scale) - (bash2.geometry.parameters.radius * bash2Scale * 0.2)
bash2.position.y = bash2.geometry.parameters.radius * bash2Scale * 0.3
bash2.position.x = 0.6
house.add(bash2)



const bash3 = new THREE.Mesh(bashGeometry, bashMaterial);
const bash3Scale = 0.3
bash3.scale.set(bash3Scale, bash3Scale, bash3Scale)
bash3.position.z = wallMash.geometry.parameters.depth * 0.5 + (bash3.geometry.parameters.radius * bash3Scale) - (bash3.geometry.parameters.radius * bash3Scale * 0.2)
bash3.position.y = bash3.geometry.parameters.radius * bash3Scale * 0.3
bash3.position.x = -0.35
house.add(bash3)

const bash4 = new THREE.Mesh(bashGeometry, bashMaterial);
const bash4Scale = 0.18
bash4.scale.set(bash4Scale, bash4Scale, bash4Scale)
bash4.position.z = wallMash.geometry.parameters.depth * 0.5 + (bash4.geometry.parameters.radius * bash4Scale) - (bash4.geometry.parameters.radius * bash4Scale * 0.2)
bash4.position.y = bash4.geometry.parameters.radius * bash4Scale * 0.3
bash4.position.x = -0.55
house.add(bash4)


Scene.add(house)



const footMesh = new THREE.Mesh(
  new THREE.PlaneGeometry(50, 50),
  new THREE.MeshStandardMaterial({
    color: '#a9c388',
    map:ColorFootTexture,
    aoMap:AmbientOcclusionFootTexture,
    normalMap:NormalFootTexture,
    roughnessMap:RoughnessFootTexture
  })
)
footMesh.geometry.setAttribute('uv2', new THREE.BufferAttribute(footMesh.geometry.attributes.uv.array, 2))
footMesh.rotation.x = -Math.PI / 2
Scene.add(footMesh);

export default function App() {

  useEffect(() => {
    const canvas = document.querySelector('#webgl');
    const controls = new OrbitControls(Camera, canvas)
    controls.maxDistance = footMesh.geometry.parameters.width / 2
    controls.maxPolarAngle = Math.PI / 2 - 0.02
    controls.minDistance = 1
    controls.enableDamping = true

    const renderer = new THREE.WebGL1Renderer({
      canvas
    })
    renderer.setPixelRatio(1)
    renderer.setClearColor('#262837');

    doorPoint.castShadow = true;
    doorMesh.castShadow = true;
    bash1.castShadow = true;
    bash2.castShadow = true;
    bash3.castShadow = true;
    bash4.castShadow = true;
    wallMash.castShadow = true;
    ghost1.castShadow = true;
    ghost2.castShadow = true;
    ghost3.castShadow = true;
    footMesh.receiveShadow = true;

    doorPoint.shadow.mapSize.width  = 256
    doorPoint.shadow.mapSize.height  = 256
    doorPoint.shadow.camera.far  = 7

    ghost1.shadow.mapSize.width  = 256
    ghost1.shadow.mapSize.height  = 256
    ghost1.shadow.camera.far  = 7
    ghost2.shadow.mapSize.width  = 256
    ghost2.shadow.mapSize.height  = 256
    ghost2.shadow.camera.far  = 7
    ghost3.shadow.mapSize.width  = 256
    ghost3.shadow.mapSize.height  = 256
    ghost3.shadow.camera.far  = 7

    renderer.shadowMap.enabled =  true;



    renderer.setSize(windowSize.width, windowSize.height);
    renderer.render(Scene, Camera);


    const clock = new THREE.Clock()
    function animate() {
      const time = clock.getElapsedTime()
      ghost1.position.x = Math.sin(time*0.15) * 4
      ghost1.position.z = Math.cos(time*0.15) * 4
      ghost1.position.y = Math.sin(time*0.15)*0.5 + 0.4

      ghost2.position.x = Math.cos(time*0.1) * 5
      ghost2.position.z = Math.sin(time*0.1) * 5
      ghost2.position.y = Math.abs(Math.sin(time*0.1)*0.5)
      

      ghost3.position.x = Math.cos(time*0.2) * (6 + Math.sin(time*0.2));
      ghost3.position.z = Math.sin(time*0.2) * (6 + Math.sin(time*0.2));
      ghost3.position.y = Math.sin(time)*0.1


      Camera.aspect = windowSize.width / windowSize.height
      controls.update()
      Camera.updateProjectionMatrix()
      renderer.setSize(windowSize.width, windowSize.height);
      renderer.render(Scene, Camera);
      window.requestAnimationFrame(animate)
    }
    animate()
  }, [])

  return (
    <canvas id={'webgl'}></canvas>
  )
}
