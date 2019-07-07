import * as THREE from 'three';

export default class Image {
    constructor() {
        this.loader = new THREE.TextureLoader();

        this.createMesh = this.createMesh.bind(this);
    }

    /**
     * Creates mesh with image for scene
     * @param {string} imgSrc path to the image 
     * @param {object} dimensions height: number, width: number
     * @param {object} positions x: number, y: number, z: number
     * 
     * @returns {object} returns a mesh object to be inserted into the scene
     */
    createMesh(imgSrc, dimensions, positions) {
        const { width, height } = dimensions;
        const material = new THREE.MeshLambertMaterial({
            map: this.loader.load(imgSrc),
        });
        const geometry = new THREE.PlaneGeometry(width, height);
        const mesh = new THREE.Mesh(geometry, material);
        if (positions) {
            console.log('Hi');
            const { x, y, z } = positions;
            mesh.position.set(x, y, z);
        }

        return mesh;
    }
}