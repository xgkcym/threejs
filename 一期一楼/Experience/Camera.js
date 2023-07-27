
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import {MapControls} from './Unit/MapControls'
import Experience from './Experience'
export default class Camera {
    constructor() {
        this.Experience = new Experience()
        this.size = this.Experience.size
        this.scene = this.Experience.scene
        this.canvas = this.Experience.canvas
        this.createPerspective()
        this.createControls()
    }
    createPerspective = () => {
        this.instance = new THREE.PerspectiveCamera(75, this.size.width / this.size.height, 0.1, 1000);
        this.instance.position.set(0,50, 2);
    }

    createControls = () => {
        this.controls = new MapControls(this.instance, this.canvas)
        this.controls.enableDamping = true
        this.controls.maxPolarAngle = Math.PI / 2 - 0.02
    }


    resize = () => {
        this.instance.aspect = this.size.width / this.size.height
        this.instance.updateProjectionMatrix()
    }

    update = () => {
        this.controls.update()
    }
}