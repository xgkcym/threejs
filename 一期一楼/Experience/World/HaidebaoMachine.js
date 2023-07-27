import * as THREE from 'three';
import Experience from '../Experience';

export default class HaidebaoMachine {
    constructor() {
        this.Experience = new Experience()
        this.debug = this.Experience.debug;
        this.scene = this.Experience.scene;
        this.resources = this.Experience.resources
        this.sources = this.resources.items.haidebaoMachineModelGLTF
        this.time = this.Experience.time
        if (this.debug.action) {
            this.debugFolder = this.debug.ui.addFolder('海德堡')
        }
        this.setmodel()

    }
    setmodel = () => {
        this.debugObject = {
            modelScale: 0.008,
            modelPositionY:  0.82,
        };
        this.model = new THREE.Group()
        this.model1 = this.sources.scene.clone();
        this.model1.position.y = this.debugObject.modelPositionY;
        this.model1.position.z = -5;
        this.model1.position.x = 35
        this.model1.rotation.y = Math.PI * 0.5;
        this.model1.scale.set(this.debugObject.modelScale, this.debugObject.modelScale, this.debugObject.modelScale)


        this.model2 = this.sources.scene.clone();
        this.model2.position.y = this.debugObject.modelPositionY;
        this.model2.position.z = 1;
        this.model2.position.x = 35
        this.model2.rotation.y = Math.PI * 0.5;
        this.model2.scale.set(this.debugObject.modelScale, this.debugObject.modelScale, this.debugObject.modelScale)


        this.model3 = this.sources.scene.clone();
        this.model3.position.y = this.debugObject.modelPositionY;
        this.model3.position.z = 7;
        this.model3.position.x = 35
        this.model3.rotation.y = Math.PI * 0.5;
        this.model3.scale.set(this.debugObject.modelScale, this.debugObject.modelScale, this.debugObject.modelScale)


        this.model4 = this.sources.scene.clone();
        this.model4.position.y = this.debugObject.modelPositionY;
        this.model4.position.z = 1;
        this.model4.position.x = 21
        this.model4.rotation.y = Math.PI * 0.5;
        this.model4.scale.set(this.debugObject.modelScale, this.debugObject.modelScale, this.debugObject.modelScale)



        
        this.model5 = this.sources.scene.clone();
        this.model5.position.y = this.debugObject.modelPositionY;
        this.model5.position.z = 7;
        this.model5.position.x = 21
        this.model5.rotation.y = Math.PI * 0.5;
        this.model5.scale.set(this.debugObject.modelScale, this.debugObject.modelScale, this.debugObject.modelScale)


          
        this.model6 = this.sources.scene.clone();
        this.model6.position.y = this.debugObject.modelPositionY;
        this.model6.position.z = -5;
        this.model6.position.x = -11.5
        this.model6.rotation.y = Math.PI * 0.5;
        this.model6.scale.set(this.debugObject.modelScale, this.debugObject.modelScale, this.debugObject.modelScale)


        
          
        this.model7 = this.sources.scene.clone();
        this.model7.position.y = this.debugObject.modelPositionY;
        this.model7.position.z = 7;
        this.model7.position.x = -11.5
        this.model7.rotation.y = Math.PI * 0.5;
        this.model7.scale.set(this.debugObject.modelScale, this.debugObject.modelScale, this.debugObject.modelScale)







        


        this.model.add(this.model1, this.model2, this.model3, this.model4, this.model5, this.model6,this.model7)
        this.scene.add(this.model)
        if (this.debug.action) {

        }
    }
}