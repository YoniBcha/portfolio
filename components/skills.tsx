import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";

const Earth: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // Enable alpha
    renderer.setClearColor(0x000000, 0); // Set clear color to transparent
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Sphere Geometry (for reference, not visible)
    const sphereGeometry = new THREE.SphereGeometry(5, 32, 32);

    // Longitude Lines (North to South)
    for (let i = 0; i <= 180; i += 10) {
      const points = [];
      for (let j = 0; j <= 180; j += 1) {
        const theta = THREE.MathUtils.degToRad(i); // Longitude
        const phi = THREE.MathUtils.degToRad(j); // Latitude
        const x = 5 * Math.sin(phi) * Math.cos(theta);
        const y = 5 * Math.cos(phi);
        const z = 5 * Math.sin(phi) * Math.sin(theta);
        points.push(new THREE.Vector3(x, y, z));
      }
      const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
      const lineMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00 }); // Green color
      const line = new THREE.Line(lineGeometry, lineMaterial);
      scene.add(line);
    }

    // Latitude Lines (West to East)
    for (let i = 0; i <= 180; i += 10) {
      const points = [];
      for (let j = 0; j <= 360; j += 1) {
        const theta = THREE.MathUtils.degToRad(j); // Longitude
        const phi = THREE.MathUtils.degToRad(i); // Latitude
        const x = 5 * Math.sin(phi) * Math.cos(theta);
        const y = 5 * Math.cos(phi);
        const z = 5 * Math.sin(phi) * Math.sin(theta);
        points.push(new THREE.Vector3(x, y, z));
      }
      const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
      const lineMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 }); // Red color
      const line = new THREE.Line(lineGeometry, lineMaterial);
      scene.add(line);
    }

    // Camera Position
    camera.position.z = 15;

    // Mouse Move Event Listener
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const x = (clientX / window.innerWidth) * 2 - 1; // Normalize to [-1, 1]
      const y = -(clientY / window.innerHeight) * 2 + 1; // Normalize to [-1, 1]
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation Logic
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate Scene based on mouse position
      scene.rotation.y = mousePosition.x * Math.PI; // Rotate around Y-axis
      scene.rotation.x = mousePosition.y * Math.PI; // Rotate around X-axis

      renderer.render(scene, camera);
    };

    animate();

    // Handle Window Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [mousePosition]);

  return (
    <div
      ref={mountRef}
      className="w-full h-screen rounded-full overflow-hidden cursor-pointer"
    />
  );
};

export default Earth;