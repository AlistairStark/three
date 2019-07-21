// Global imports -
import * as THREE from "three";
import TWEEN from "tween.js";

// Local imports -
// Components
import Renderer from "./components/renderer";
import Camera from "./components/camera";
import Light from "./components/light";

// Helpers
import Stats from "./helpers/stats";

// data
import Config from "./../data/config";
import imageData from "./../data/imageConfig";

// image mesh
import Image from "./model/image";
import Particles from './model/particles';
import Particle from './model/particle';

import Events from "./managers/events";
// -- End of imports

// This class instantiates and ties all of the components together, starts the loading process and renders the main loop
export default class Main {
    constructor(container) {
        this.loadManager = new THREE.LoadingManager(() => {
            console.log("I HAVE LOADED");
        });
        // Set container property to container element
        this.container = container;

        // Start Three clock
        this.clock = new THREE.Clock();

        // Main scene creation
        this.scene = new THREE.Scene();
        // this.scene.fog = new THREE.FogExp2(Config.fog.color, Config.fog.near);

        // Get Device Pixel Ratio first for retina
        if (window.devicePixelRatio) {
            Config.dpr = window.devicePixelRatio;
        }

        // Main renderer constructor
        this.renderer = new Renderer(this.scene, container);

        // Components instantiations
        this.camera = new Camera(this.renderer.threeRenderer);
        // this.controls = new Controls(this.camera.threeCamera, container);
        this.light = new Light(this.scene);

        // Create and place lights in scene
        const lights = ["ambient", , "point", "hemi"];
        lights.forEach(light => this.light.place(light));

        // Set up rStats if dev environment
        if (Config.isDev && Config.isShowingStats) {
            this.stats = new Stats(this.renderer);
            this.stats.setUp();
        }

        // set up image
        // this.image = new Image();
        // const imageMeshes = this.getImageMeshes(imageData);
        // imageMeshes.forEach(mesh => this.scene.add(mesh));

        // generate test cube
        this.cube = this.createCube();
        this.cube.position.set(10, 10, -10);
        this.scene.add(this.cube);

        // generate particles
        // this.particles = [];
        this.particles = new Particles();
        this.scene.add(this.particles.getMesh());

        // this.particles.push(particles);

        // Events
        this.events = new Events(this.camera.threeCamera, this.scene.children, this.scene);
        window.addEventListener("mousemove", this.events.handleMove, false);
        window.addEventListener("mousedown", e => {
            console.log(this.events.mousePicker(e));
            this.particles.toggleUpdate();
        });
        // const loader = new THREE.TextureLoader();

        // this.particles = [];

        // loader.load('https://s3.amazonaws.com/duhaime/blog/tsne-webgl/assets/cat.jpg', texture => {
        //     const renderWidth = 1200;
        //     const width = texture.image.width;
        //     const height = texture.image.height;
        //     const xLoopCount = 1200;
        //     const yLoopCount = 500;
        //     for (let i = 0; i < xLoopCount; i++) {
        //         for (let j = 0; j < yLoopCount; j++) {
        //           this.particles.push(new Particle(i * 1200, j * 500, 1, texture, this.scene));
        //         }
        //       }
        //     console.log('IMAGE IS LOADED', height);
        // });


        // Start render which does not wait for model fully loaded
        this.render();
    }

    createCube() {
        const geometry = new THREE.BoxGeometry(5, 5, 5);
        const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
        return new THREE.Mesh(geometry, material);
    }

    getImageMeshes(images) {
        return images.map(image => this.image.createMesh(image.src, image.dimensions, image.position));
    }

    render() {
        // Render rStats if Dev
        if (Config.isDev && Config.isShowingStats) {
            Stats.start();
        }

        // Call render function and pass in created scene and camera
        this.renderer.render(this.scene, this.camera.threeCamera);

        // rStats has finished determining render call now
        if (Config.isDev && Config.isShowingStats) {
            Stats.end();
        }

        // Delta time is sometimes needed for certain updates
        // const delta = this.clock.getDelta();

        // Call any vendor or module frame updates here
        TWEEN.update();
        // this.controls.threeControls.update();

        // RAF
        requestAnimationFrame(this.render.bind(this)); // Bind the main class instead of window object

        window.addEventListener("mousemove", this.events.handleMove, false);

        this.particles.updateParticles();
    }
}
