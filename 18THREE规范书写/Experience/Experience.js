
import * as THREE from 'three'
import Time from "./Unit/Time"
import Size from "./Unit/Size"
import Camera from "./Camera"
import Renderer from './Renderer'
import World from './World/World'
import Resources from './World/Resources'
import sources from './sources'
import Debug from './Unit/Debug'
let initCanvas = null;
export default class Experience {
    constructor(Canvas) {
        if (initCanvas) {
            return initCanvas
        }
        initCanvas = this
        window.Experience = this
        this.canvas = Canvas
        this.debug = new Debug()
        this.time = new Time()
        this.size = new Size()
        this.scene = new THREE.Scene()
        this.resources = new Resources(sources)
        this.world = new World()
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.size.on('resize', () => {
            this.resize()
        })
        this.time.on('tick', () => {
            this.update()
        })
    }

    resize = () => {
        this.camera.resize()
        this.renderer.resize()
    }

    update = () => {
        this.camera.update()
        this.renderer.update()
        this.world.update()
    }

    destroy = () => {
        this.size.off('resize');
        this.time.off('tick');
        this.scene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.geometry.dispose()
                for(const key in child.material){
                    const value = child.material[key];
                    if(value && typeof value.dispose === 'function'){
                        value.dispose()
                    }
                }
            }
        })
        this.camera.controls.dispose()
        this.renderer.instance.dispose()
        if(this.debug.action){
            this.debug.ui.destroy()
        }
    }
}