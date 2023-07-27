import Experience from "../Experience";
import * as THREE from 'three'

export default class Environment {
    constructor() {
        this.Experience = new Experience();
        this.debug = this.Experience.debug;
        this.scene = this.Experience.scene;
        this.resources = this.Experience.resources;
        this.setLight();

    }

    setLight = () => {
        // this.DirectionalLightList = []
        // this.DirectionalLight1 = new THREE.DirectionalLight('#ffffff', 4);
        // this.DirectionalLight1.position.set(100, 50, 0)


        // this.DirectionalLight2 = new THREE.DirectionalLight('#ffffff', 4);
        // this.DirectionalLight2.position.set(-100, 50, 0)


        // this.DirectionalLight3 = new THREE.DirectionalLight('#ffffff', 4);
        // this.DirectionalLight3.position.set(0, 50, 100)


        // this.DirectionalLight4 = new THREE.DirectionalLight('#ffffff', 4);
        // this.DirectionalLight4.position.set(0, 50, -100)
        // this.scene.add(this.DirectionalLight1,this.DirectionalLight2,this.DirectionalLight3,this.DirectionalLight4)


        this.pointLight1 = new THREE.PointLight('#ffffff',200)
        this.pointLight1.position.set(50, 100,0)


        this.pointLight2 = new THREE.PointLight('#ffffff',200)
        this.pointLight2.position.set(-50, 100,0)


        this.pointLight3 = new THREE.PointLight('#ffffff',200)
        this.pointLight3.position.set(0, 100,-50)


        this.pointLight4 = new THREE.PointLight('#ffffff',200)
        this.pointLight4.position.set(0, 100,50)
        this.scene.add(this.pointLight1,this.pointLight2,this.pointLight3,this.pointLight4)

        
    }

  
}