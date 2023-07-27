import * as THREE from 'three';
import Experience from "../Experience";


export default class Hourse {
    constructor() {
        this.Experience = new Experience()
        this.scene = this.Experience.scene
        this.debug = this.Experience.debug
        this.resources = this.Experience.resources
        this.sources = this.resources.items.foorRoughnessTexture
        if (this.debug.action) {
            this.debugFolder = this.debug.ui.addFolder('厂房')
        }
        this.setGeometry()
        this.setMaterial()
        this.setMesh()
    }

    setGeometry = () => {
        this.wallThickness = 1
        this.wallHeight = 15
        this.foor = new THREE.PlaneGeometry(89, 73.5, 16, 16);
        this.w_wall = new THREE.BoxGeometry(this.wallHeight, 73.5, this.wallThickness, 16, 16);
        this.h_wall = new THREE.BoxGeometry(89, this.wallHeight, this.wallThickness, 16, 16);
        this.bigDoorTop = new THREE.BoxGeometry(7, this.wallHeight - this.wallHeight * 0.75, this.wallThickness, 16, 16)
        this.smallDoorTop = new THREE.BoxGeometry(3, this.wallHeight - this.wallHeight * 0.75, this.wallThickness, 16, 16)
        this.leftWall = new THREE.BoxGeometry(0.5, this.wallHeight, this.wallThickness, 16, 16)
        this.centerWall = new THREE.BoxGeometry(35, this.wallHeight, this.wallThickness, 16, 16)
        this.rightWall = new THREE.BoxGeometry(43.5, this.wallHeight, this.wallThickness, 16, 16)
    }

    setMaterial = () => {
        this.debugObj = {
            foorMaterialColor: '#1f311f',
            wallMaterialColor: "#FFDEAD"
        }
        this.foorMaterial = new THREE.MeshStandardMaterial({
            color: this.debugObj.foorMaterialColor,
            side: THREE.DoubleSide,
        })

        this.wallMaterial = new THREE.MeshStandardMaterial({
            color: this.debugObj.wallMaterialColor,
            side: THREE.DoubleSide,
        })
        if (this.debug.action) {
            this.debugFolder.addColor(this.debugObj, 'foorMaterialColor').name('地板颜色').onChange(() => {
                this.foorMaterial.color.set(this.debugObj.foorMaterialColor)
            })
            this.debugFolder.addColor(this.debugObj, 'wallMaterialColor').name('墙壁颜色').onChange(() => {
                this.wallMaterial.color.set(this.debugObj.wallMaterialColor)
            })
        }
    }
    setMesh = () => {
        this.mesh = new THREE.Group();
        this.foorMesh = new THREE.Mesh(this.foor, this.foorMaterial);
        this.foorMesh.rotation.x = -Math.PI * 0.5;


        this.leftWallMesh = new THREE.Mesh(this.w_wall, this.wallMaterial);
        this.leftWallMesh.position.x = - this.foor.parameters.width / 2;
        this.leftWallMesh.rotation.x = -Math.PI * 0.5;
        this.leftWallMesh.rotation.y = -Math.PI * 0.5;
        this.leftWallMesh.position.y = this.w_wall.parameters.width / 2 + 0.0001;


        this.rightWallMesh = new THREE.Mesh(this.w_wall, this.wallMaterial);
        this.rightWallMesh.position.x = this.foor.parameters.width / 2;
        this.rightWallMesh.rotation.x = -Math.PI * 0.5;
        this.rightWallMesh.rotation.y = Math.PI * 0.5;
        this.rightWallMesh.position.y = this.w_wall.parameters.width / 2 + 0.0001;;


        // this.topWallMesh = new THREE.Mesh(this.h_wall, this.wallMaterial);
        // this.topWallMesh.position.z = -this.foor.parameters.height / 2;
        // this.topWallMesh.position.y = this.h_wall.parameters.height / 2;

        this.topLeftWallMesh = new THREE.Mesh(this.leftWall, this.wallMaterial)
        this.topLeftWallMesh.position.z = -this.foor.parameters.height / 2 + this.wallThickness / 2;
        this.topLeftWallMesh.position.y = this.h_wall.parameters.height / 2 + 0.0001;;
        this.topLeftWallMesh.position.x = -(this.foor.parameters.width - this.leftWall.parameters.width) / 2

        this.smallDoorTopMesh = new THREE.Mesh(this.smallDoorTop, this.wallMaterial)
        this.smallDoorTopMesh.position.z = -this.foor.parameters.height / 2 + this.wallThickness / 2;
        this.smallDoorTopMesh.position.y = this.h_wall.parameters.height - this.smallDoorTop.parameters.height / 2 + 0.0001;;
        this.smallDoorTopMesh.position.x = -(this.foor.parameters.width - this.smallDoorTop.parameters.width) / 2 + this.leftWall.parameters.width


        this.centerWallMesh = new THREE.Mesh(this.centerWall, this.wallMaterial);
        this.centerWallMesh.position.z = -this.foor.parameters.height / 2 + this.wallThickness / 2;
        this.centerWallMesh.position.y = this.h_wall.parameters.height / 2 + 0.0001;;
        this.centerWallMesh.position.x = -(this.foor.parameters.width - this.centerWall.parameters.width) / 2 + this.leftWall.parameters.width + this.smallDoorTop.parameters.width

        this.bigDoorTopMesh = new THREE.Mesh(this.bigDoorTop, this.wallMaterial)
        this.bigDoorTopMesh.position.z = -this.foor.parameters.height / 2 + this.wallThickness / 2;
        this.bigDoorTopMesh.position.y = this.h_wall.parameters.height - this.bigDoorTop.parameters.height / 2 + 0.0001;;
        this.bigDoorTopMesh.position.x = -(this.foor.parameters.width - this.bigDoorTop.parameters.width) / 2 + this.leftWall.parameters.width + this.smallDoorTop.parameters.width + this.centerWall.parameters.width


        this.rightDoorWallMesh = new THREE.Mesh(this.rightWall, this.wallMaterial)
        this.rightDoorWallMesh.position.z = -this.foor.parameters.height / 2 + this.wallThickness / 2;
        this.rightDoorWallMesh.position.y = this.h_wall.parameters.height / 2 + 0.0001;;
        this.rightDoorWallMesh.position.x = -(this.foor.parameters.width - this.rightWall.parameters.width) / 2 + this.leftWall.parameters.width + this.smallDoorTop.parameters.width + this.centerWall.parameters.width + this.bigDoorTop.parameters.width


        this.bottomWallMesh = new THREE.Mesh(this.h_wall, this.wallMaterial);
        this.bottomWallMesh.position.z = this.foor.parameters.height / 2 - this.wallThickness / 2;
        this.bottomWallMesh.position.y = this.h_wall.parameters.height / 2 + 0.0001;;

        this.mesh.add(this.foorMesh, this.leftWallMesh, this.rightWallMesh, this.bottomWallMesh, this.topLeftWallMesh, this.smallDoorTopMesh, this.centerWallMesh, this.bigDoorTopMesh, this.rightDoorWallMesh)
        this.scene.add(this.mesh)
    }
}