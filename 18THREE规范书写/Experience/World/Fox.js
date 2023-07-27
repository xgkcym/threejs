import * as THREE from 'three';
import Experience from '../Experience';

export default class Fox {
    constructor() {
        this.Experience = new Experience()
        this.debug = this.Experience.debug;
        this.scene = this.Experience.scene;
        this.resources = this.Experience.resources
        this.sources = this.resources.items.foxModelGLTF
        this.time = this.Experience.time
        if (this.debug.action) {
            this.debugFolder = this.debug.ui.addFolder('模型')
        }
        this.setModel()
        this.setAnimation()


    }
    setModel = () => {
        this.model = this.sources.scene
        this.model.scale.set(0.01, 0.01, 0.01)
        this.scene.add(this.model)
        this.model.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true
            }
        })

    }
    setAnimation = () => {
        this.animation = {}
        this.animation.actions = {}
        this.animation.mixer = new THREE.AnimationMixer(this.model)
        this.animation.actions.idle = this.animation.mixer.clipAction(this.sources.animations[0])
        this.animation.actions.walking = this.animation.mixer.clipAction(this.sources.animations[1])
        this.animation.actions.running = this.animation.mixer.clipAction(this.sources.animations[2])
        this.animation.actions.current = this.animation.actions.idle
        this.animation.actions.current.play()

        this.animation.play = (name) => {
            const newAction = this.animation.actions[name];
            const oldAction = this.animation.actions.current;
            newAction.reset()
            newAction.play();
            newAction.crossFadeFrom(oldAction, 0.5)
            this.animation.actions.current = newAction
        }

        if (this.debug.action) {
            const debugObject = {
                playIdle: () => this.animation.play('idle'),
                playWalking: () => this.animation.play('walking'),
                playRunning: () => this.animation.play('running'),
                halt: () => this.animation.actions.current.halt(0.5),
                stop: () => this.animation.actions.current.stop(),
            }
            this.debugFolder.add(debugObject, 'stop').name('重置动画')
            this.debugFolder.add(debugObject, 'halt').name('停止动画')
            this.debugFolder.add(debugObject, 'playIdle').name('摇头动画')
            this.debugFolder.add(debugObject, 'playWalking').name('走路动画')
            this.debugFolder.add(debugObject, 'playRunning').name('奔跑动画')
        }
    }
    update = () => {
        this.animation.mixer.update(this.time.delta * 0.001)
    }

}