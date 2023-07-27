
import dat from 'dat.gui'
export default class Debug {
    constructor() {
        this.action = window.location.hash === '#debug';
        if(this.action){
            this.ui = new dat.GUI();
        }
    }
}