import * as THREE from 'three';
import Experience from '../Experience';

export default class Dirt {
    constructor() {
        this.Experience = new Experience()
        this.scene = this.Experience.scene;
        this.resources = this.Experience.resources
        this.setGeometry();
        this.setTexture();
        this.setMaterial();
        this.setMesh();
    }
    setGeometry = () => {
        this.geometry = new THREE.CircleGeometry(5, 62)
    }
    setTexture = () => {
        this.texture = {}
        this.texture.color = this.resources.items.dritColorTexture
        this.texture.encoding = THREE.sRGBEncoding
        this.texture.color.repeat.set(2, 2);
        this.texture.color.wrapS = THREE.RepeatWrapping
        this.texture.color.wrapT = THREE.RepeatWrapping

        this.texture.normal = this.resources.items.dritNormalTexture
        this.texture.normal.repeat.set(2, 2);   
        this.texture.normal.wrapS = THREE.RepeatWrapping
        this.texture.normal.wrapT = THREE.RepeatWrapping
    }
    setMaterial = () => {
        this.material = new THREE.MeshStandardMaterial({
            map:this.texture.color,
            normalMap:this.texture.normal
        })
    }
    setMesh = () => {
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.rotation.x = - Math.PI * 0.5
        this.mesh.receiveShadow = true;
        this.scene.add(this.mesh)
    }
}