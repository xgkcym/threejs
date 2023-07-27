import * as THREE from 'three';
import Experience from '../Experience';


export default class Road {
    constructor() {
        this.Experience = new Experience()
        this.debug = this.Experience.debug;
        this.scene = this.Experience.scene;
        this.yellowLineWidth = 0.75
        this.meshList = []
        this.setRoad()
        this.setHub()
    }

    getRoad = (width, height) => {
        const road = new THREE.Group()
        const geometry = new THREE.PlaneGeometry(width, height);
        this.roadMaterial = new THREE.MeshStandardMaterial({
            color: "#222",
        })
        const mesh = new THREE.Mesh(geometry, this.roadMaterial)
        mesh.rotation.x = Math.PI * -0.5

        const geometry1 = new THREE.PlaneGeometry(width, this.yellowLineWidth);
        this.yellowMaterial = new THREE.MeshStandardMaterial({
            color: "#FFD700",
        })
        const mesh1 = new THREE.Mesh(geometry1, this.yellowMaterial)
        mesh1.rotation.x = Math.PI * -0.5
        mesh1.position.z = -(height - this.yellowLineWidth) / 2;
        mesh1.position.y += 0.01;


        const mesh2 = new THREE.Mesh(geometry1, this.yellowMaterial)
        mesh2.rotation.x = Math.PI * -0.5
        mesh2.position.z = (height - this.yellowLineWidth) / 2;
        mesh2.position.y += 0.01;

        road.position.y += 0.01;
        road.add(mesh, mesh1, mesh2)

        return road
    }



    setRoad = () => {
        // 路线从右向左

        const mesh1 = this.getRoad(30, 4);
        mesh1.position.x = 29;
        mesh1.position.z = -9.5;


        const mesh2 = this.getRoad(20, 3);
        mesh2.rotation.y = Math.PI * 0.5
        mesh2.position.x = 12.5;
        mesh2.position.z = -21.5;


        const mesh3 = this.getRoad(19, 3);
        mesh3.rotation.y = Math.PI * -0.5
        mesh3.position.x = 12.5;
        mesh3.position.z = 2;

        const mesh4 = this.getRoad(30, 4);
        mesh4.position.x = 29;
        mesh4.position.z = 13.5;


        const mesh5 = this.getRoad(11, 4);
        mesh5.position.x = 5.5;
        mesh5.position.z = 13.5;


        const mesh6 = this.getRoad(19, 3);
        mesh6.rotation.y = Math.PI * -0.5
        mesh6.position.x = -1.5
        mesh6.position.z = 2;


        const mesh7 = this.getRoad(11, 4);
        mesh7.position.x = 5.5;
        mesh7.position.z = -9.5;


        const mesh8 = this.getRoad(13, 4);
        mesh8.position.x = -9.5;
        mesh8.position.z = -9.5;


        const mesh9 = this.getRoad(18, 4);
        mesh9.position.x = -12;
        mesh9.position.z = 13.5;



        const mesh10 = this.getRoad(19, 3);
        mesh10.rotation.y = Math.PI * -0.5
        mesh10.position.x = -22.5;
        mesh10.position.z = 2;



        const mesh11 = this.getRoad(17, 4);
        mesh11.position.x = -32.5;
        mesh11.position.z = 13.5;

        const mesh12 = this.getRoad(17, 4);
        mesh12.position.x = -32.5;
        mesh12.position.z = -9.5;



        const mesh13 = this.getRoad(19, 3);
        mesh13.rotation.y = Math.PI * -0.5
        mesh13.position.x = -42.5;
        mesh13.position.z = 2;


        const mesh14 = this.getRoad(25, 3);
        mesh14.rotation.y = Math.PI * -0.5
        mesh14.position.x = -42.5;
        mesh14.position.z = -24;



        const mesh15 = this.getRoad(30, 3);
        mesh15.position.x = 29;
        mesh15.position.z = -33;



        const mesh16 = this.getRoad(20, 3);
        mesh16.rotation.y = Math.PI * 0.5
        mesh16.position.x = -17.5;
        mesh16.position.z = -21.5;



        const mesh17 = this.getRoad(2, 4);
        mesh17.position.x = -20;
        mesh17.position.z = -9.5;


        const mesh18 = this.getRoad(10, 3);
        mesh18.position.x = 6;
        mesh18.position.z = -33;



        const mesh19 = this.getRoad(10, 3);
        mesh19.position.x = -11;
        mesh19.position.z = -33;

        const mesh20 = this.getRoad(2, 7);
        mesh20.rotation.y = Math.PI * 0.5
        mesh20.position.x = -2.5;
        mesh20.position.z = -35.5;

        this.scene.add(
            mesh1, mesh2, mesh3, mesh4, mesh5, mesh6, mesh7, mesh8, mesh9, mesh10,
            mesh11, mesh12, mesh13, mesh14, mesh15, mesh16, mesh17, mesh18, mesh19, mesh20
        )
    }

    getHub = (width, height, { topLine = false, bottomLine = false, leftLine = false, rightLine = false, topLeftPoint = false, topRightPoint = false, bottomLeftPoint = false, bottomRightPoint = false }) => {
        const hub = new THREE.Group();
        const geometry = new THREE.PlaneGeometry(width, height);
        const material = new THREE.MeshStandardMaterial({
            color: "#222",
        })
        const mesh = new THREE.Mesh(geometry, material)
        mesh.rotation.x = Math.PI * -0.5
        mesh.position.y += 0.01
        hub.add(mesh)
        if (topLine) {
            const line = new THREE.PlaneGeometry(width, this.yellowLineWidth);
            const lineMesh = new THREE.Mesh(line, this.yellowMaterial)
            lineMesh.rotation.x = Math.PI * -0.5
            lineMesh.position.y += 0.02
            lineMesh.position.z = -(height - this.yellowLineWidth) / 2;
            hub.add(lineMesh)
        }
        if (bottomLine) {
            const line = new THREE.PlaneGeometry(width, this.yellowLineWidth);
            const lineMesh = new THREE.Mesh(line, this.yellowMaterial)
            lineMesh.rotation.x = Math.PI * -0.5
            lineMesh.position.y += 0.02
            lineMesh.position.z = (height - this.yellowLineWidth) / 2;
            hub.add(lineMesh)
        }

        if (leftLine) {
            const line = new THREE.PlaneGeometry(this.yellowLineWidth, height);
            const lineMesh = new THREE.Mesh(line, this.yellowMaterial)
            lineMesh.rotation.x = Math.PI * -0.5
            lineMesh.position.y += 0.02
            lineMesh.position.x = -(width - this.yellowLineWidth) / 2;
            hub.add(lineMesh)
        }


        if (rightLine) {
            const line = new THREE.PlaneGeometry(this.yellowLineWidth, height);
            const lineMesh = new THREE.Mesh(line, this.yellowMaterial)
            lineMesh.rotation.x = Math.PI * -0.5
            lineMesh.position.y += 0.02
            lineMesh.position.x = (width - this.yellowLineWidth) / 2;
            hub.add(lineMesh)
        }


        if (topLeftPoint) {
            const point = new THREE.PlaneGeometry(this.yellowLineWidth, this.yellowLineWidth);
            const pointMesh = new THREE.Mesh(point, new THREE.MeshStandardMaterial({
                color: '#f00'
            }));
            pointMesh.rotation.x = Math.PI * -0.5
            pointMesh.position.y += 0.02
            pointMesh.position.x = -(width - this.yellowLineWidth) / 2;
            pointMesh.position.z = -(height - this.yellowLineWidth) / 2;
            hub.add(pointMesh)
        }

        if (topRightPoint) {
            const point = new THREE.PlaneGeometry(this.yellowLineWidth, this.yellowLineWidth);
            const pointMesh = new THREE.Mesh(point, new THREE.MeshStandardMaterial({
                color: '#f00'
            }));
            pointMesh.rotation.x = Math.PI * -0.5
            pointMesh.position.y += 0.02
            pointMesh.position.x = (width - this.yellowLineWidth) / 2;
            pointMesh.position.z = -(height - this.yellowLineWidth) / 2;
            hub.add(pointMesh)
        }


        if (bottomLeftPoint) {
            const point = new THREE.PlaneGeometry(this.yellowLineWidth, this.yellowLineWidth);
            const pointMesh = new THREE.Mesh(point, new THREE.MeshStandardMaterial({
                color: '#f00'
            }));
            pointMesh.rotation.x = Math.PI * -0.5
            pointMesh.position.y += 0.02
            pointMesh.position.x = -(width - this.yellowLineWidth) / 2;
            pointMesh.position.z = (height - this.yellowLineWidth) / 2;
            hub.add(pointMesh)
        }

        if (bottomRightPoint) {
            const point = new THREE.PlaneGeometry(this.yellowLineWidth, this.yellowLineWidth);
            const pointMesh = new THREE.Mesh(point, new THREE.MeshStandardMaterial({
                color: '#f00'
            }));
            pointMesh.rotation.x = Math.PI * -0.5
            pointMesh.position.y += 0.02
            pointMesh.position.x = (width - this.yellowLineWidth) / 2;
            pointMesh.position.z = (height - this.yellowLineWidth) / 2;
            hub.add(pointMesh)
        }




        return hub

    }

    setHub = () => {
        const mesh1 = this.getHub(3, 4, { topLine: true, bottomLeftPoint: true, bottomRightPoint: true })
        mesh1.position.z = -9.5
        mesh1.position.x = -1.5

        const mesh2 = this.getHub(3, 4, { topLeftPoint: true, topRightPoint: true, bottomLeftPoint: true, bottomRightPoint: true })
        mesh2.position.z = -9.5
        mesh2.position.x = 12.5

        const mesh3 = this.getHub(3, 4, { topLeftPoint: true, topRightPoint: true, bottomLine: true })
        mesh3.position.z = 13.5
        mesh3.position.x = 12.5



        const mesh4 = this.getHub(3, 4, { topLeftPoint: true, topRightPoint: true, bottomLine: true })
        mesh4.position.z = 13.5
        mesh4.position.x = -1.5


        const mesh5 = this.getHub(3, 4, { topLeftPoint: true, topRightPoint: true, bottomLine: true })
        mesh5.position.z = -9.5
        mesh5.position.x = -17.5

        const mesh6 = this.getHub(3, 4, { topLine: true, bottomLeftPoint: true, bottomRightPoint: true })
        mesh6.position.z = -9.5
        mesh6.position.x = -22.5


        const mesh7 = this.getHub(3, 4, { topLeftPoint: true, topRightPoint: true, bottomLine: true })
        mesh7.position.z = 13.5
        mesh7.position.x = -22.5

        const mesh8 = this.getHub(3, 4, { topRightPoint: true, bottomLine: true, leftLine: true })
        mesh8.position.z = 13.5
        mesh8.position.x = -42.5



        const mesh9 = this.getHub(3, 4, { topRightPoint: true,bottomRightPoint:true, leftLine: true })
        mesh9.position.z = -9.5
        mesh9.position.x = -42.5


        
        const mesh10 = this.getHub(3,3, { topLine: true,bottomRightPoint:true, leftLine: true })
        mesh10.position.z = -33
        mesh10.position.x = -17.5


        const mesh11 = this.getHub(7,3, { bottomLine: true,topLeftPoint:true, topRightPoint: true })
        mesh11.position.z = -33
        mesh11.position.x = -2.5

        const mesh12 = this.getHub(3, 3, { topLine: true, bottomLeftPoint: true, bottomRightPoint: true })
        mesh12.position.z = -33
        mesh12.position.x = 12.5

        this.scene.add(mesh1, mesh2, mesh3, mesh4, mesh5, mesh6, mesh7, mesh8,mesh9,mesh10,mesh11,mesh12)
    }


}
