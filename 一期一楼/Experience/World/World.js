
import Experience from "../Experience";
import Environment from "./Environment";
import Hourse from "./Hourse";
import HaidebaoMachine from "./HaidebaoMachine";
import RopeThreadingMachine from "./RopeThreadingMachine";
import Bobst from "./Bobst";
import SAPAR from "./SAPAR";
import FolderGluer from "./FolderGluer";
import Font from "./Font";
import * as THREE from 'three'
import Road from "./Road";
import Scodix from "./Scodix";
export default class World {
    constructor() {
        this.Experience = new Experience();
        this.scene = this.Experience.scene;
        this.renderer = this.Experience.renderer
        this.resources = this.Experience.resources;
        this.font = new Font()
        // this.axes = new THREE.AxesHelper(100);
        // this.scene.add(this.axes)
        this.resources.on('ready', () => {
            this.hourse = new Hourse()
            this.ropeThreadingMachine = new RopeThreadingMachine()
            this.haidebaoMachine = new HaidebaoMachine()
            this.bobst = new Bobst()
            this.sAPAR = new SAPAR()
            this.folderGluer = new FolderGluer()
            this.scodix = new Scodix()
            this.road = new Road()

            this.environment = new Environment()
            this.renderer.instance.setClearColor('#555');
            document.querySelector('.spinner').style.display = 'none'
            this.font.destroy()
        })
    }

    update = () => {

    }
}