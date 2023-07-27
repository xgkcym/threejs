import Experience from "../Experience";
import * as THREE from 'three'

export default class Environment {
    constructor() {
        this.Experience = new Experience();
        this.debug = this.Experience.debug;
        this.scene = this.Experience.scene;
        this.resources = this.Experience.resources;
        this.setLight();
        this.setEnvironmentMap()

    }

    setLight = () => {
        this.DirectionalLight = new THREE.DirectionalLight('#ffffff', 4);
        this.DirectionalLight.position.set(3, 1.5, 1)
        this.DirectionalLight.castShadow = true
        this.DirectionalLight.shadow.camera.far = 15;
        this.DirectionalLight.shadow.mapSize.width = 2048
        this.DirectionalLight.shadow.mapSize.height = 2048
        this.DirectionalLight.shadow.normalBias = 0.05
        this.scene.add(this.DirectionalLight)

        if(this.debug.action){
            this.debugFolder = this.debug.ui.addFolder('环境')
            this.debugFolder.add(this.DirectionalLight,'intensity').max(10).min(0).step(0.01).name('太阳光强度')
            this.debugFolder.add(this.DirectionalLight.position,'x').max(5).min(-5).step(0.01).name('太阳光x轴位置')
            this.debugFolder.add(this.DirectionalLight.position,'y').max(5).min(-5).step(0.01).name('太阳光y轴位置')
            this.debugFolder.add(this.DirectionalLight.position,'z').max(5).min(-5).step(0.01).name('太阳光z轴位置')
        }
    }

    setEnvironmentMap = () => {
        this.environmentMap = {}
        this.environmentMap.intensity = 0.4
        this.environmentMap.texture = this.resources.items.environmentMapTexture
        this.environmentMap.texture.encoding = THREE.sRGBEncoding
        this.scene.environment = this.environmentMap.texture
        this.setEnvironmentMap.updateMaterial = () => {
            this.scene.traverse((child) => {
                if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
                    child.material.envMap = this.environmentMap.texture;
                    child.material.envMapIntensity = this.environmentMap.intensity
                    child.material.needsUpdate = true
                }
            })
        }
        this.setEnvironmentMap.updateMaterial()
        if(this.debug.action){
            this.debugFolder.add(this.environmentMap,'intensity').max(3).min(0).step(0.01).name('地图环境强度').onChange(()=>this.setEnvironmentMap.updateMaterial())
        }
    }
}