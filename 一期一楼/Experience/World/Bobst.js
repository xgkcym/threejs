import * as THREE from 'three';
import Experience from '../Experience';

export default class Bobst {
    constructor() {
        this.Experience = new Experience()
        this.debug = this.Experience.debug;
        this.scene = this.Experience.scene;
        this.resources = this.Experience.resources
        this.sources = this.resources.items.bobstModelGLTF
        this.time = this.Experience.time
        if (this.debug.action) {
            this.debugFolder = this.debug.ui.addFolder('Bobst')
        }
        this.setmodel()

    }
    setmodel = () => {
        this.debugObject = {
            modelScale: 0.002,
            modelPositionY: 1.2,
        };
        this.model = new THREE.Group()
        this.model1 = this.sources.scene.clone();
        this.model1.position.y = this.debugObject.modelPositionY +.57;
        this.model1.position.z = -20;
        this.model1.position.x = 4.5
        this.model1.rotation.y = Math.PI;
        this.model1.scale.set(this.debugObject.modelScale*1.2, this.debugObject.modelScale*1.2, this.debugObject.modelScale*1.2)



        this.model2 = this.sources.scene.clone();
        this.model2.position.y = this.debugObject.modelPositionY;
        this.model2.position.z = -17.5;
        this.model2.position.x = 15.5
        this.model2.rotation.y = Math.PI;
        this.model2.scale.set(this.debugObject.modelScale * 0.8, this.debugObject.modelScale * 0.8, this.debugObject.modelScale * 0.8)

        this.model3 = this.sources.scene.clone();
        this.model3.position.y = this.debugObject.modelPositionY;
        this.model3.position.z = -17.5;
        this.model3.position.x = 19.5
        this.model3.rotation.y = Math.PI;
        this.model3.scale.set(this.debugObject.modelScale * 0.8, this.debugObject.modelScale * 0.8, this.debugObject.modelScale * 0.8)


        this.model4 = this.sources.scene.clone();
        this.model4.position.y = this.debugObject.modelPositionY;
        this.model4.position.z = -17.5;
        this.model4.position.x = 23.5
        this.model4.rotation.y = Math.PI;
        this.model4.scale.set(this.debugObject.modelScale * 0.8, this.debugObject.modelScale * 0.8, this.debugObject.modelScale * 0.8)



        this.model5 = this.sources.scene.clone();
        this.model5.position.y = this.debugObject.modelPositionY;
        this.model5.position.z = -17.5;
        this.model5.position.x = 27.5
        this.model5.rotation.y = Math.PI;
        this.model5.scale.set(this.debugObject.modelScale * 0.8, this.debugObject.modelScale * 0.8, this.debugObject.modelScale * 0.8)



        this.model.add(this.model1, this.model2, this.model3, this.model4, this.model5, this.model6)
        this.scene.add(this.model)
        if (this.debug.action) {

        }
    }
}