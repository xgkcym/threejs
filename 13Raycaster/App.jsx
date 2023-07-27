import React, { useEffect, useRef } from 'react'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as THREE from 'three'
import * as dat from 'dat.gui'

const windowSize = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () => {
  windowSize.width = window.innerWidth
  windowSize.height = window.innerHeight
})
const gui = new dat.GUI()

const Scene = new THREE.Scene()

const mesh1 = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 16, 16),
  new THREE.MeshBasicMaterial({ color: '#ff0000' })
)
mesh1.position.x = - 2

const mesh2 = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 16, 16),
  new THREE.MeshBasicMaterial({ color: '#ff0000' })
)

const mesh3 = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 16, 16),
  new THREE.MeshBasicMaterial({ color: '#ff0000' })
)
mesh3.position.x = 2
Scene.add(mesh1, mesh2, mesh3)


const camera = new THREE.PerspectiveCamera(75, windowSize.width / windowSize.height, 0.1, 1000);
camera.position.z = 5
camera.lookAt(mesh2.position)
const raycaster = new THREE.Raycaster();
// const vector1 = new THREE.Vector3(-1, 0, 0);
// const vector2 = new THREE.Vector3(10, 0, 0);
// // 确定向量
// vector2.normalize()
// raycaster.set(vector1, vector2)

// const intersectObject = raycaster.intersectObject(mesh1)
// console.log(intersectObject);
// const intersectObjects = raycaster.intersectObjects([mesh1, mesh2, mesh3])
// console.log(intersectObjects);



export default function App() {
  const webgl = useRef();
  useEffect(() => {
    const canvas = webgl.current
    const controls = new OrbitControls(camera, canvas)
    const renderer = new THREE.WebGL1Renderer({
      canvas
    })
    renderer.setSize(windowSize.width, windowSize.height);
    renderer.render(Scene, camera)
    const clock = new THREE.Clock()

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      mesh1.position.y = Math.sin(elapsed * 0.5) * 2
      mesh2.position.y = Math.cos(elapsed * 0.6) * 2
      mesh3.position.y = Math.sin(elapsed * 0.4) * 2
      const vector1 = new THREE.Vector3(-3, 0, 0);
      const vector2 = new THREE.Vector3(1, 0, 0);
      vector2.normalize()
      raycaster.set(vector1, vector2)
      const meshList = [mesh1, mesh2, mesh3]
      const intersectObjects = raycaster.intersectObjects(meshList)
      for (let mesh of meshList) {
        mesh.material.color = new THREE.Color('#f00');
      }
      for (let intersect of intersectObjects) {
        intersect.object.material.color = new THREE.Color('#0ff');
      }

      controls.update()
      camera.aspect = windowSize.width / windowSize.height;
      camera.updateProjectionMatrix()
      renderer.setSize(windowSize.width, windowSize.height);
      renderer.render(Scene, camera)
      requestAnimationFrame(animate)
    }
    animate()
    return () => {
      gui.destroy()
    }
  }, [])

  return (
    <canvas ref={webgl}></canvas>
  )
}
