import Experience from "../Experience";
import * as THREE from 'three'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import fontType from '../../static/fonts/helvetiker_regular.typeface.json';
export default class Font {
    constructor() {
        this.Experience = new Experience()
        this.debug = this.Experience.debug;
        this.scene = this.Experience.scene;
        this.size = this.Experience.size;
        this.setLoad()
        this.setTextMesh()
        this.setStarMesh();

    }
    setLoad = () => {
        this.fontLoader = new FontLoader()
        this.font = this.fontLoader.parse(fontType)
    }
    setTextMesh = () => {
        this.textGeometroy = new TextGeometry('Avery Dennison', {
            font: this.font,
            size: 8,
            height: 3,
            curveSegments: 20,
            bevelEnabled: true,
            bevelThickness: 0.03,
            bevelSize: 0.02,
            bevelOffset: 0,
            bevelSegments: 5
        })

       
        this.textGeometroy.center()
        this.textMaterial = new THREE.MeshBasicMaterial({
            color: "#f00"
        })
        this.textMesh = new THREE.Mesh(this.textGeometroy, this.textMaterial)
        this.textMesh.rotation.x = Math.PI * -0.5
        this.textMesh.position.z = -5


        this.textGeometroy1 = new TextGeometry('First Office First Floor', {
            font: this.font,
            size: 4,
            height: 1,
            curveSegments: 20,
            bevelEnabled: true,
            bevelThickness: 0.03,
            bevelSize: 0.02,
            bevelOffset: 0,
            bevelSegments: 5
        })
        this.textMaterial1 = new THREE.MeshBasicMaterial({
            color: "#FFD700"
        })
        this.textMesh1 = new THREE.Mesh(this.textGeometroy1, this.textMaterial1)
        this.textMesh1.rotation.x = Math.PI * -0.5
        this.textMesh1.position.z = 10
        this.textMesh1.position.x = -26
        this.scene.add(this.textMesh, this.textMesh1)
    }

    setStarMesh = () => {
        this.starCount = 5000;
        this.starPositions = new Float32Array(this.starCount * 3);
        for (let i = 0; i < this.starCount; i++) {
            this.starPositions[i * 3] = (Math.random() - 0.5) * 1000
            this.starPositions[i * 3 + 1] = (Math.random() - 0.5) * 1000
            this.starPositions[i * 3 + 2] = (Math.random() - 0.5) * 1000
        }
        this.starGeometry = new THREE.BufferGeometry()
        this.starGeometry.setAttribute('position', new THREE.BufferAttribute(this.starPositions, 3));
        this.starMaterial = new THREE.PointsMaterial({
            size: 0.03,
            sizeAttenuation: true,
            color: '#fff'
        })
        this.star = new THREE.Points(this.starGeometry, this.starMaterial)
        this.star.position.z = this.star.position.z - this.star.position.z * 0.5
        this.scene.add(this.star)


    }

    destroy = () => {
        this.scene.remove(this.textMesh,this.textMesh1, this.star)
    }
}