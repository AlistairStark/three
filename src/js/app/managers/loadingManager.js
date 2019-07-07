import * as THREE from 'three';

export default class LoadManager {
    constructor() {
        console.log('CONTRUCTING')

        this.handleStart = this.handleStart.bind(this);
        this.handleLoad = this.handleLoad.bind(this);
        this.handleProgress = this.handleProgress.bind(this);

        this.loadingManager = new THREE.LoadingManager(this.handleLoad, this.handleProgress, this.handleStart);
    }

    handleStart() {
        console.log('starting homie');
    }
    
    handleLoad() {
        console.log('handling load');
    }

    handleProgress() {
        console.log('PROGRESSING DOG');
    }
};
