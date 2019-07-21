import * as THREE from 'three';
import $ from 'jquery';

export default class Event {
    constructor(camera, objects, scene) {
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector3();

        this.canDetect = true;

        this.scene = scene;
        this.meshes = objects.filter(object => object.type === 'Points' || object.type === 'Mesh');
        this.camera = camera;

        this.handleMove = this.handleMove.bind(this);
        this.mousePicker = this.mousePicker.bind(this);
        this.raycast = this.raycast.bind(this);
    }

    /**
     * Basically just a debounce function
     * @param {object} e html mouse event 
     */
    handleMove(e) {
        if (this.canDetect) {
            this.canDetect = false;
            this.mousePicker(e);
            setTimeout(() => {
                this.canDetect = true;
            }, 75);
        }
    }

    /**
     * Gets the location of the mouse and sets it
     * @param {object} e the html mouse event 
     */
    mousePicker(e) {
        e.preventDefault();
        const offset = $('#appContainer').offset().top;
        
        // grab mouse coordinates. Hardcode z index
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = - (e.clientY / (window.innerHeight + (offset * 2 + 1))) * 2 + 1;
        const z = 0.5;

        // set as vector 3 properties
        this.mouse.x = x;
        this.mouse.y = y;
        this.mouse.z = z;

        return this.raycast();
    }

    raycast() {
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.meshes);
        // Change color if hit block
        if ( intersects.length > 0 ) {
            intersects[0].object.material.color.setHex( Math.random() * 0xffffff );
        }

        return intersects;
    }
}