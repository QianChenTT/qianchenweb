import * as THREE from 'three';
import g from '../../../../public/assets/gradient.png';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;
class TextParticleGeometry {
  geometry;
  material;
  points: any;
  constructor(text: string, fontUrl: string, size = 10, numParticles = 10000) {
    this.geometry = new THREE.BufferGeometry();
    this.material = new THREE.PointsMaterial({ size: 0.5, color: 0xffffff });
    this.points = null;
    this.loadFontAndCreateGeometry(text, fontUrl, size, numParticles);
  }

  loadFontAndCreateGeometry(text: string, fontUrl: string, size: number, numParticles: number) {
    const loader = new FontLoader();
    loader.load(fontUrl, (font) => {
      const textGeometry = new TextGeometry(text, {
        font,
        size,
        height: 0.1,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 1,
        bevelSize: 0.5,
        bevelOffset: 0,
        bevelSegments: 5
      });

      // Use the text geometry directly
      this.points = new THREE.Points(textGeometry, this.material);
    });
  }

  getPoints() {
    return this.points;
  }
}

export default TextParticleGeometry;

//
class CustomGeometry {
  numParticles: number;
  initPositionFunc: (vertices: Float32Array, index: number) => void;
  geometry: THREE.BufferGeometry;

  constructor(numParticles: number, initPositionFunc: (vertices: Float32Array, index: number) => void) {
    this.numParticles = numParticles;
    this.initPositionFunc = initPositionFunc;
    this.geometry = new THREE.BufferGeometry();
    this.createGeometry();
  }

  createGeometry() {
    const vertices = new Float32Array(this.numParticles * 3);
    const scales = new Float32Array(this.numParticles);

    const TextureLoader = new THREE.TextureLoader();
    const material = new THREE.PointsMaterial({
      size: 5,
      sizeAttenuation: false,
      transparent: true,
      opacity: 1,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      map: TextureLoader.load(g)
    });

    for (let i = 0; i < this.numParticles * 3; i += 3) {
      this.initPositionFunc(vertices, i);
    }

    this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    this.geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

    const points = new THREE.Points(this.geometry, material);
    points.geometry.attributes.position.needsUpdate = true;
    console.log(points.geometry)
    return points.geometry;
  }
}

// Example usage
export const flatGeometry = new CustomGeometry(
  3600, // Number of particles
  (vertices, i) => {
    // Calculate ix and iy based on the index i
    const ix = Math.floor(i / 3) % 60;
    const iy = Math.floor(Math.floor(i / 3) / 60);

    vertices[i] = ix * 50 - ((60 * 50) / 2); // x
    vertices[i + 1] = 500; // y
    vertices[i + 2] = iy * 50 - ((60 * 50) / 2); // z
  }
);

export const waterGeometry = new CustomGeometry(
  3600, // 粒子数量
  (vertices, i) => {
    const ix = (i / 3) % 60; // 计算粒子在网格中的 x 位置
    const iy = Math.floor((i / 3) / 60); // 计算粒子在网格中的 y 位置
    vertices[i] = ix * 100 - ((60 * 100) / 2); // x 坐标
    vertices[i + 1] = 0; // y 坐标，初始设为 0
    vertices[i + 2] = iy * 100 - ((60 * 100) / 2); // z 坐标
  }
);

export const quadratic = new CustomGeometry(
  3600, // 粒子数量
  (vertices, i) => {
    const x = -3600 / 2;
    vertices[i] = x + i; // x 坐标
    vertices[i + 1] = (x + i) * (x + i); // y 坐标，初始设为 0
    vertices[i + 2] = 0; // z 坐标
  }
);

function factorial(n: number) {
  let result = 1;
  for (let i = 1; i <= n; i++) {
    result *= i;
  }
  return result;
}

export const audioFrequency = new CustomGeometry(
  window.innerHeight * 10, // Number of particles
  (vertices, i) => {
    const x = ((i - 15000)) * 0.1; // Adjust x position
    const a = 1; // Modify 'a' as needed
    const aFactorial = factorial(a);
    const y = x * Math.sin(Math.tan(Math.log(aFactorial * Math.pow(x, 2)))) * Math.cos(x); // y coordinate

    vertices[i] = x; // x coordinate
    vertices[i + 1] = y; // y coordinate
    vertices[i + 2] = 500; // z coordinate, set to 0 for 2D wave
  }
);

export const hanGeo = new CustomGeometry(
  calculateParticleCount(), // Adjust particle count based on screen size
  (vertices, i) => {
    if ((i % 300) === 0) {
      const randomx = (Math.random() - 0.5) * (screenWidth * 2);
      const randomy = (Math.random() - 0.5) * (screenHeight * 2);
      const randomz = (Math.random() - 0.5) * 500;
      for (let k = 0; k < 300; k += 3) {
        vertices[i + k] = randomx; // x coordinate
        vertices[i + k + 1] = randomy; // y coordinate
        vertices[i + k + 2] = randomz; // z coordinate
      }
    }
  }
);

function calculateParticleCount() {
  const baseCount = 6000;
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const referenceSize = 1920 * 1080;
  return Math.round(baseCount * (screenWidth * screenHeight) / referenceSize);
}
