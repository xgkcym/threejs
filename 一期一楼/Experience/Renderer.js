import EventEmitter from './Unit/EventEmitter'
import Canvas from './Experience'
import * as THREE from 'three'
export default class Renderer extends EventEmitter {
    constructor() {
        super()
        this.Experience = new Canvas()
        this.debug = this.Experience.debug
        this.size = this.Experience.size
        this.scene = this.Experience.scene
        this.canvas = this.Experience.canvas
        this.camera = this.Experience.camera
        this.instance = new THREE.WebGL1Renderer({
            canvas: this.canvas,
            antialias: true
        })
        this.instance.setClearColor('#000');
        this.instance.setPixelRatio(this.size.pixelRatio);
        this.instance.setSize(this.size.width, this.size.height);
        this.instance.render(this.scene, this.camera.instance)
        this.instance.shadowMap.enabled = true
        this.instance.physicallyCorrectLights = true
        this.instance.outputEncoding = THREE.sRGBEncoding
        this.instance.toneMapping = THREE.CineonToneMapping //风格
        this.instance.toneMappingExposure = 0.75 //曝光

        if (this.debug.action) {
            this.debugFolder = this.debug.ui.addFolder('渲染');
            this.debugFolder.add(this.instance, 'toneMappingExposure').max(3).min(0).step(0.01).name('色调映射曝光').onChange(() => this.update())
            this.debugFolder.add(this.instance, 'toneMapping', {
                '无色调映射': THREE.NoToneMapping,
                '线性色调映射': THREE.LinearToneMapping,
                '莱因哈德色调映射': THREE.ReinhardToneMapping,
                '电影色调映射': THREE.CineonToneMapping,
                'ACES电影色调映射': THREE.ACESFilmicToneMapping,
            }).name('色调映射').onFinishChange(() => {
                this.instance.toneMapping = Number(this.instance.toneMapping)
                this.update()
            })
        }
    }

   
    resize = () => {
        this.instance.setSize(this.size.width, this.size.height);
    }
    update = () => {
        this.instance.render(this.scene, this.camera.instance)
    }
}