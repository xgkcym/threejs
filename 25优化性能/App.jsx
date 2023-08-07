import React, { useEffect } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils'
import Stats from 'stats.js'
function init() {
  const windowSize = {
    width: window.innerWidth,
    height: window.innerHeight,
  }
  const stats = new Stats()
  stats.showPanel(0)
  document.body.append(stats.dom)

  window.addEventListener('resize', () => {
    windowSize.width = window.innerWidth
    windowSize.height = window.innerHeight
    camera.aspect = windowSize.width / windowSize.height;
    camera.updateProjectionMatrix()
    renderer.setSize(windowSize.width, windowSize.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  })
  const scene = new THREE.Scene()

  /**
 * Lights
 */
  const directionalLight = new THREE.DirectionalLight('#ffffff', 3)
  directionalLight.castShadow = true
  directionalLight.shadow.mapSize.set(1024, 1024)
  directionalLight.shadow.camera.far = 15
  directionalLight.shadow.normalBias = 0.05
  directionalLight.position.set(0.25, 3, 2.25)
  scene.add(directionalLight)



  const cameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
  scene.add(cameraHelper)

  const camera = new THREE.PerspectiveCamera(75, windowSize.width / windowSize.height, 0.1, 100)
  camera.position.set(2, 2, 6)



  const canvas = document.querySelector('#webgl')
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    // Can be "high-performance", "low-power" or "default"
    powerPreference: 'high-performance',//慎用 电脑不好容易发热严重
  })
  renderer.setSize(windowSize.width, windowSize.height)

  renderer.render(scene, camera)
  renderer.shadowMap.enabled = true
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(2, 2, 2),
    new THREE.MeshStandardMaterial()
  )
  cube.castShadow = true
  cube.receiveShadow = true
  cube.position.set(- 5, 0, 0)
  scene.add(cube)

  const torusKnot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(1, 0.4, 128, 32),
    new THREE.MeshStandardMaterial()
  )
  torusKnot.castShadow = true
  torusKnot.receiveShadow = true
  scene.add(torusKnot)

  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(1, 32, 32),
    new THREE.MeshStandardMaterial()
  )
  sphere.position.set(5, 0, 0)
  sphere.castShadow = true
  sphere.receiveShadow = true
  scene.add(sphere)

  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshStandardMaterial()
  )
  floor.position.set(0, - 2, 0)
  floor.rotation.x = - Math.PI * 0.5
  floor.castShadow = true
  floor.receiveShadow = true
  scene.add(floor)


  // // Tip 4
  // console.log(renderer.info)

  // // Tip 6
  // scene.remove(cube)
  // cube.geometry.dispose()
  // cube.material.dispose()

  // // Tip 10
  // directionalLight.shadow.camera.top = 3
  // directionalLight.shadow.camera.right = 6
  // directionalLight.shadow.camera.left = - 6
  // directionalLight.shadow.camera.bottom = - 3
  // directionalLight.shadow.camera.far = 10
  // directionalLight.shadow.mapSize.set(1024, 1024)

  // const cameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
  // scene.add(cameraHelper)

  // // Tip 11
  // cube.castShadow = true
  // cube.receiveShadow = false

  // torusKnot.castShadow = true
  // torusKnot.receiveShadow = false

  // sphere.castShadow = true
  // sphere.receiveShadow = false

  // floor.castShadow = false
  // floor.receiveShadow = true

  // // Tip 12
  // renderer.shadowMap.autoUpdate = false
  // renderer.shadowMap.needsUpdate = true

  // // Tip 18 性能最差
  // for(let i = 0; i < 50; i++)
  // {
  //     const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)

  //     const material = new THREE.MeshNormalMaterial()

  //     const mesh = new THREE.Mesh(geometry, material)
  //     mesh.position.x = (Math.random() - 0.5) * 10
  //     mesh.position.y = (Math.random() - 0.5) * 10
  //     mesh.position.z = (Math.random() - 0.5) * 10
  //     mesh.rotation.x = (Math.random() - 0.5) * Math.PI * 2
  //     mesh.rotation.y = (Math.random() - 0.5) * Math.PI * 2

  //     scene.add(mesh)
  // }

  // // Tip 19  性能最优
  // const geometryList = []
  // for (let i = 0; i < 50; i++) {
  //   const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
  //   geometry.translate(
  //     (Math.random() - 0.5) * 10,
  //     (Math.random() - 0.5) * 10,
  //     (Math.random() - 0.5) * 10
  //   )
  //   geometry.rotateX((Math.random() - 0.5) * Math.PI * 2)
  //   geometry.rotateY((Math.random() - 0.5) * Math.PI * 2)
  //   geometryList.push(geometry)

  // }
  // const mergedGeometry = BufferGeometryUtils.mergeBufferGeometries(geometryList)
  // const material = new THREE.MeshNormalMaterial()

  // const mesh = new THREE.Mesh(mergedGeometry, material)

  // scene.add(mesh)

  // Tip 20 最实用  
  // const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
  // const material = new THREE.MeshNormalMaterial()

  // const mesh = new THREE.InstancedMesh(geometry, material, 50);
  // mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage); //要更新
  // scene.add(mesh)
  // for (let i = 0; i < 50; i++) {
  //   const position = new THREE.Vector3()
  //   position.set(
  //     (Math.random() - 0.5) * 10,
  //     (Math.random() - 0.5) * 10,
  //     (Math.random() - 0.5) * 10,
  //   )

  //   const quaternion = new THREE.Quaternion()
  //   quaternion.setFromEuler(new THREE.Euler(

  //     (Math.random() - 0.5) * Math.PI * 2,
  //     (Math.random() - 0.5) * Math.PI * 2,
  //     0
  //   ))


  //   const matrix = new THREE.Matrix4()
  //   matrix.makeRotationFromQuaternion(quaternion)
  //   matrix.setPosition(position)
  //   mesh.setMatrixAt(i, matrix);


  // }


  // // Tip 29
  // renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  // // Tip 31, 32, 34 and 35
  // const shaderGeometry = new THREE.PlaneGeometry(10, 10, 256, 256)

  // const shaderMaterial = new THREE.ShaderMaterial({
  //     precision:'lowp',
  //     uniforms:
  //     {
  //         uDisplacementTexture: { value: displacementTexture },
  //         uDisplacementStrength: { value: 1.5 }
  //     },
  //     vertexShader: `
  //         uniform sampler2D uDisplacementTexture;
  //         uniform float uDisplacementStrength;

  //         varying vec2 vUv;

  //         void main()
  //         {
  //             vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  //             float elevation = texture2D(uDisplacementTexture, uv).r;
  //             if(elevation < 0.5)
  //             {
  //                 elevation = 0.5;
  //             }

  //             modelPosition.y += elevation * uDisplacementStrength;

  //             gl_Position = projectionMatrix * viewMatrix * modelPosition;

  //             vUv = uv;
  //         }
  //     `,
  //     fragmentShader: `
  //         uniform sampler2D uDisplacementTexture;

  //         varying vec2 vUv;

  //         void main()
  //         {
  //             float elevation = texture2D(uDisplacementTexture, vUv).r;
  //             if(elevation < 0.25)
  //             {
  //                 elevation = 0.25;
  //             }

  //             vec3 depthColor = vec3(1.0, 0.1, 0.1);
  //             vec3 surfaceColor = vec3(0.1, 0.0, 0.5);
  //             vec3 finalColor = vec3(0.0);
  //             finalColor.r += depthColor.r + (surfaceColor.r - depthColor.r) * elevation;
  //             finalColor.g += depthColor.g + (surfaceColor.g - depthColor.g) * elevation;
  //             finalColor.b += depthColor.b + (surfaceColor.b - depthColor.b) * elevation;

  //             gl_FragColor = vec4(finalColor, 1.0);
  //         }
  //     `
  // })

  // const shaderMesh = new THREE.Mesh(shaderGeometry, shaderMaterial)
  // shaderMesh.rotation.x = - Math.PI * 0.5
  // scene.add(shaderMesh)






  const controls = new OrbitControls(camera, canvas)
  controls.enableDamping = true
  const clock = new THREE.Clock()

  const frame = () => {
    stats.begin()
    const elapsedTime = clock.getElapsedTime()
    torusKnot.rotation.y = elapsedTime * 0.1
    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(frame)
    stats.end()
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
