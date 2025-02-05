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
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0); // Transparent background
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Function to generate points for a circle on the sphere
    const generateCirclePoints = (radius, center, normal, segments = 64) => {
      const points = [];
      const axis = new THREE.Vector3(0, 1, 0); // Default axis for rotation
      const quaternion = new THREE.Quaternion().setFromUnitVectors(
        axis,
        normal.clone().normalize()
      );

      for (let i = 0; i <= segments; i++) {
        const angle = (i / segments) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const point = new THREE.Vector3(x, y, 0).applyQuaternion(quaternion).add(center);
        points.push(point);
      }

      return points;
    };

    // Define 12 primary colors
    const primaryColors = [
      0xff0000, // Red
      0x00ff00, // Green
      0x0000ff, // Blue
      0xffff00, // Yellow
      0xff00ff, // Magenta
      0x00ffff, // Cyan
      0xffa500, // Orange
      0x800080, // Purple
      0xff1493, // Deep Pink
      0x7fff00, // Chartreuse
      0x1e90ff, // Dodger Blue
      0xff4500, // Orange Red
    ];

    // Define 15 random lines with 12 primary colors
    const lines = [];

    for (let i = 0; i < 15; i++) {
      // Random normal vector for orientation
      const normal = new THREE.Vector3(
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
        Math.random() * 2 - 1
      ).normalize();

      // Assign a primary color (repeating if necessary)
      const color = primaryColors[i % primaryColors.length];

      const points = generateCirclePoints(5, new THREE.Vector3(0, 0, 0), normal); // Smaller radius of 5
      const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
      const lineMaterial = new THREE.LineBasicMaterial({ color });
      const lineMesh = new THREE.Line(lineGeometry, lineMaterial);
      scene.add(lineMesh);
    }

    // Add a ground plane for the shadow
    const groundGeometry = new THREE.PlaneGeometry(20, 20);
    const groundMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff, // White ground
      side: THREE.DoubleSide,
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = Math.PI / 2; // Rotate to lay flat
    ground.position.y = -7; // Position below the sphere
    scene.add(ground);

    // Add a static shadow texture
    const shadowTexture = new THREE.CanvasTexture(createShadowCanvas());
    const shadowMaterial = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      opacity: 0.8, // Increased opacity for better visibility
    });
    const shadowGeometry = new THREE.PlaneGeometry(10, 10);
    const shadowMesh = new THREE.Mesh(shadowGeometry, shadowMaterial);
    shadowMesh.rotation.x = Math.PI / 2; // Rotate to lay flat
    shadowMesh.position.y = -6.5; // Position slightly above the ground
    scene.add(shadowMesh);

    // Function to create a black and white shadow canvas
    function createShadowCanvas() {
      const canvas = document.createElement("canvas");
      canvas.width = 256;
      canvas.height = 256;
      const context = canvas.getContext("2d");

      if (context) {
        const gradient = context.createRadialGradient(
          128, 128, 0, 128, 128, 128
        );
        gradient.addColorStop(0, "rgba(0, 0, 0, 0.8)"); // Darker shadow
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        context.fillStyle = gradient;
        context.fillRect(0, 0, 256, 256);
      }

      return canvas;
    }

    // Camera Position
    camera.position.z = 10; 

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