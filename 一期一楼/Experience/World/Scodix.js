import * as THREE from 'three';
import Experience from '../Experience';

export default class Scodix {
    constructor() {
        this.Experience = new Experience()
        this.debug = this.Experience.debug;
        this.scene = this.Experience.scene;
        this.resources = this.Experience.resources
        this.sources = this.resources.items.ScodixModelGLTF
        this.time = this.Experience.time
        if (this.debug.action) {
            this.debugFolder = this.debug.ui.addFolder('Scodix')
        }
        this.setmodel()

    }
    setmodel = () => {
        this.debugObject = {
            modelScale: 0.003,
            modelPositionY: 1.33,
        };
        this.model = new THREE.Group()
        this.model1 = this.sources.scene.clone();
        this.model1.position.y = this.debugObject.modelPositionY ;
        this.model1.position.z = -32;
        this.model1.position.x = -38
        this.model1.rotation.y = Math.PI;
        this.model1.scale.set(this.debugObject.modelScale, this.debugObject.modelScale, this.debugObject.modelScale)



        this.model.add(this.model1, this.model2, this.model3, this.model4, this.model5, this.model6)
        this.scene.add(this.model)
        if (this.debug.action) {

        }
    }
}