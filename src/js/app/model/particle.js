import * as THREE from 'three';

export default class Particle {
    constructor(x, y, scale, baseTexture, scene) {
        this.mesh = new THREE.Mesh(new THREE.Texture(baseTexture, { width: 10, height: 10 }));
        console.log(this.mesh)
        this.scene = scene;
        this.maxSpeed = 40;
        this.rendererHeight = 100;
        this.rendererWidth = 100;
        const frameWidth = 10;
        const frameHeight = 10;
        this.mesh.texture = new THREE.PlaneGeometry(
            x / scale, 
            y / scale, 
            frameWidth / scale,
            frameHeight / scale,
        );
        this.mesh.x = Math.random() * this.rendererWidth;
        this.mesh.y = Math.random() * this.rendererHeight;

        this.scene.add(this.mesh);
    }

    createMesh(texture, dimensions, positions) {
        const { width, height } = dimensions;
        const material = texture;
        const geometry = new THREE.PlaneGeometry(width, height);
        const mesh = new THREE.Mesh(geometry, material);
        if (positions) {
            console.log('Hi');
            const { x, y, z } = positions;
            mesh.position.set(x, y, z);
        }

        return mesh;
    }

    update(mouseX, mouseY) {
        this.speedX = (this.posX - this.sprite.x) / this.rendererWidth * this.maxSpeed;
        this.speedY = (this.posY - this.sprite.y) / this.rendererHeight * this.maxSpeed;
    
        const distance = Math.sqrt(Math.pow(mouseX - this.mesh.x, 2) + Math.pow(mouseY - this.mesh.y, 2));
        if (distance < 50) {
          const accX = (mouseX - this.mesh.x);
          this.speedX -= accX;
    
          const accY = (mouseY - this.mesh.y);
          this.speedY -= accY;
        }
    
        this.mesh.x += this.speedX;
        this.mesh.y += this.speedY;
      }
    
      destroy() {
        this.scene.remove(this.sprite);
        this.mesh.destroy();
      }
}