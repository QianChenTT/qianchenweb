// import React, { useRef, useEffect } from 'react';
// import * as THREE from 'three';
//
// const ShinyGoldenCube = () => {
//   const mountRef = React.useRef(null);
//
//   React.useEffect(() => {
//     // Scene setup
//     const width = mountRef.current.clientWidth;
//     const height = mountRef.current.clientHeight;
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
//     const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
//     renderer.setSize(width, height);
//     renderer.shadowMap.enabled = true; // Enable shadow rendering
//     mountRef.current.appendChild(renderer.domElement);
//
//     // Adding the cube
//     const geometry = new THREE.BoxGeometry(2, 2, 2);
//     const material = new THREE.MeshStandardMaterial({
//       color: 0xFFD700,
//       roughness: 0.5,
//       metalness: 1,
//     });
//     const cube = new THREE.Mesh(geometry, material);
//     cube.castShadow = true; // Enable casting shadows
//     scene.add(cube);
//
//     // Lighting
//     const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
//     scene.add(ambientLight);
//
//     const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
//     directionalLight.position.set(-1, 3, 4);
//     directionalLight.castShadow = true; // Enable casting shadows
//     scene.add(directionalLight);
//
//     // Shadow properties
//     directionalLight.shadow.mapSize.width = 512;  // Default is 512
//     directionalLight.shadow.mapSize.height = 512; // Default is 512
//     directionalLight.shadow.camera.near = 0.5;    // Default is 0.5
//     directionalLight.shadow.camera.far = 500;     // Default is 500
//
//     // Ground plane to receive shadows
//     const planeGeometry = new THREE.PlaneGeometry(500, 500);
//     const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.5 });
//     const plane = new THREE.Mesh(planeGeometry, planeMaterial);
//     plane.rotation.x = -Math.PI / 2;
//     plane.position.y = -1;
//     plane.receiveShadow = true; // Enable receiving shadows
//     scene.add(plane);
//
//     camera.position.z = 5;
//     cube.rotation.y += 0.4;
//     cube.rotation.x += 0.4;
//
//     // Animation loop
//     const clock = new THREE.Clock();
//
//     const animate = function () {
//       requestAnimationFrame(animate);
//
//       // Move the cube up and down
//       const time = clock.getElapsedTime();
//       cube.position.y = Math.sin(time) * 0.5;
//
//       // Render the scene
//       renderer.render(scene, camera);
//     };
//
//     animate();
//
//     // Handle resize
//     const handleResize = () => {
//       const newWidth = mountRef.current.clientWidth;
//       const newHeight = mountRef.current.clientHeight;
//       renderer.setSize(newWidth, newHeight);
//       camera.aspect = newWidth / newHeight;
//       camera.updateProjectionMatrix();
//     };
//
//     window.addEventListener('resize', handleResize);
//
//     return () => {
//       mountRef.current.removeChild(renderer.domElement);
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);
//
//   return <div ref={mountRef} style={{ width: '50vw', height: '50vh' }} />;
// };
//
// export default ShinyGoldenCube;
