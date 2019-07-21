import * as THREE from 'three';

export default class ParticleGenerator {
    constructor() {
        this.MAX = 10000;
        this.particles = [];
        this.geometry = new THREE.Geometry();
        this.material = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 });

        this.particlesCanUpdate = false;

        this.getMesh = this.getMesh.bind(this);
        this.toggleUpdate = this.toggleUpdate.bind(this);

        this.generateParticles();

        this.mesh = this.generateParticleMesh();
    }

    rand(min, max) {
        return Math.random() * (max - min) + min;
    } 

    generateParticles() {
        for (let i = 0; i < this.MAX; i++) {
            const particle = {
                position: new THREE.Vector3(
                    this.rand(-10, 10),
                    this.rand(-10, 10),
                    this.rand(-1, 3),
                ),
                velocity: new THREE.Vector3(
                    this.rand(-0.01, 0.01),
                    0.06,
                    this.rand(-0.01, 0.01),
                ),
                acceleration: new THREE.Vector3(0, -0.001, 0),
            }
            this.particles.push(particle);
            this.geometry.vertices.push(particle.position);
        }
    }

    generateParticleMesh() { 
        const mesh = new THREE.Points(this.geometry, this.material);
        mesh.position.z = -4;
        return mesh;
    }

    getMesh() {
        return this.mesh;
    }

    toggleUpdate() {
        return this.particlesCanUpdate = !this.particlesCanUpdate;
    }

    updateParticles() {
        if (this.particlesCanUpdate) {
            this.particles.forEach(particle => {
                particle.velocity.add(particle.acceleration);
                particle.position.add(particle.velocity);
            });
            this.mesh.geometry.verticesNeedUpdate = true;
        }
    }
}
