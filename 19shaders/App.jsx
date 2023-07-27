import React, { useEffect } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import dat from 'dat.gui'
import testVertex from './shaders/test/vertex.glsl'
import testFragment from './shaders/test/fragment.glsl'
const windowSize = {
  width: window.innerWidth,
  height: window.innerHeight,
}

const gui = new dat.GUI()



window.addEventListener('resize', () => {
  windowSize.width = window.innerWidth
  windowSize.height = window.innerHeight

})


const textureLoader = new THREE.TextureLoader()

const mountainTexture = textureLoader.load(require('./static/images/mountain.jpg'))

const Scene = new THREE.Scene()
const geometry = new THREE.PlaneGeometry(1, 1, 32, 32);
const count = geometry.attributes.position.count;
const randomArray = new Float32Array(count);
for (let i = 0; i < count; i++) {
  randomArray[i] = Math.random();
}

geometry.setAttribute('aRandom',new THREE.BufferAttribute(randomArray,1));

const material = new THREE.ShaderMaterial({
  vertexShader: testVertex,
  fragmentShader: testFragment,
  side: THREE.DoubleSide,
  transparent:true,
  uniforms:{
    uFrequency:{value:new THREE.Vector2(10,5)},
    uTime:{value:0},
    uColor:{value:new THREE.Color('red')},
    uTexture:{value:mountainTexture},
  },
})

gui.add(material.uniforms.uFrequency.value,'x').min(0).max(20).step(0.01).name('横轴弯曲')
gui.add(material.uniforms.uFrequency.value,'y').min(0).max(20).step(0.01).name('垂直弯曲')
const mesh = new THREE.Mesh(geometry, material)
Scene.add(mesh);

const camera = new THREE.PerspectiveCamera(75, windowSize.width / windowSize.height);
camera.position.z = 3


export default function App() {
  useEffect(() => {
    const canvas = document.querySelector('#webgl')
    const renderer = new THREE.WebGL1Renderer({
      canvas
    })
    renderer.setSize(windowSize.width, windowSize.height)

    renderer.render(Scene, camera)
    const controls = new OrbitControls(camera, canvas)
    const clock = new THREE.Clock()
    const frame = () => {
      const elapsed = clock.getElapsedTime()
      material.uniforms.uTime.value = elapsed
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
