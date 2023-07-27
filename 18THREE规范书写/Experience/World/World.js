
import Experience from "../Experience";
import Environment from "./Environment";
import Dirt from "./Dirt";
import Fox from "./Fox";
export default class World{
    constructor(){
        this.Experience = new Experience();
        this.scene = this.Experience.scene;
        this.resources = this.Experience.resources;
        this.resources.on('ready',()=>{
            this.dirt = new Dirt()
            this.fox = new Fox()
            this.environment = new Environment()
        })
    }

    update = ()=>{
        this.fox && this.fox.update()
    }
}