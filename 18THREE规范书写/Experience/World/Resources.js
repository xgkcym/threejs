import EventEmitter from "../Unit/EventEmitter";
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default class Resources extends EventEmitter {
    constructor(sources) {
        super()
        this.sources = sources;
        this.items = {}
        this.currentLoaderLen = 0;
        this.loaderLen = sources.length;
        this.setLoader()
        this.startLoader()
    }
    setLoader = () => {
        this.loaders = {}
        this.loaders.textureLoader = new THREE.TextureLoader()
        this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader()
        this.loaders.gltfLoader = new GLTFLoader()
    }
    startLoader = () => {
        for (const source of this.sources) {
            if (source.type === 'texture') {
                this.loaders.textureLoader.load(source.path, (file) => {
                    this.endLoader(source, file)
                })
            } else if (source.type === 'cubeTexture') {
                this.loaders.cubeTextureLoader.load(source.path, (file) => {
                    this.endLoader(source, file)
                })
            } else if (source.type === 'gltfModel') {
                this.loaders.gltfLoader.load(source.path, (file) => {
                    this.endLoader(source, file)
                })
            }
        }
    }
    endLoader = (source, file) => {
        this.items[source.name] = file
        this.currentLoaderLen++;
        if (this.currentLoaderLen === this.loaderLen) {
            this.trigger('ready');
        }
    }
} 