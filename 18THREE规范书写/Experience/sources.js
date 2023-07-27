// eslint-disable-next-line import/no-anonymous-default-export
export default [
    {
        name: "environmentMapTexture",
        type: "cubeTexture",
        path: [
            require('../static/environmentMaps/0/px.jpg'),
            require('../static/environmentMaps/0/nx.jpg'),
            require('../static/environmentMaps/0/py.jpg'),
            require('../static/environmentMaps/0/ny.jpg'),
            require('../static/environmentMaps/0/pz.jpg'),
            require('../static/environmentMaps/0/nz.jpg'),
        ],
    },
    {
        name:"dritColorTexture",
        type:"texture",
        path:require('../static/textures/dirt/color.jpg'),
    },
    {
        name:"dritNormalTexture",
        type:"texture",
        path:require('../static/textures/dirt/normal.jpg'),
    },
    {
        name:'foxModelGLTF',
        type:"gltfModel",
        // path:require('../static/models/Fox/glTF/Fox.gltf')
        path:'Fox/glTF/Fox.gltf'
    }
]