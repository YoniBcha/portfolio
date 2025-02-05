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

    // Function to create a canvas texture with text
    const createTextTexture = (text: string, color: string) => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      if (!context) return null;

      // Increase canvas resolution for HD text
      const scale = 2; // Scaling factor for HD
      const textWidth = context.measureText(text).width;
      canvas.width = (textWidth + 20) * scale; // Add padding and scale
      canvas.height = 20 * scale; // Smaller height for smaller font

      // Scale context for HD rendering
      context.scale(scale, scale);

      // Draw text on canvas
      context.fillStyle = color; // Text color
      context.font = "12px Arial"; // Smaller font size
      context.fillText(text, 10, 15); // Position text

      // Create texture from canvas
      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;

      return texture;
    };

    // Define skills and their primary colors
    const skills = [
      { name: "React", color: "#61dafb" }, // React Blue
      { name: "React Native", color: "#61dafb" }, // React Blue
      { name: "Next.js", color: "#000000" }, // Black
      { name: "Vue.js", color: "#42b883" }, // Vue Green
      { name: "Laravel", color: "#ff2d20" }, // Laravel Red
      { name: "Django", color: "#092e20" }, // Django Green
      { name: "Python", color: "#3776ab" }, // Python Blue
      { name: "Java", color: "#007396" }, // Java Blue
    ];

    // Define colors for the circles: Orange
    const circleColors = [0xffa500]; // Orange

    // Create circles and text sprites for each skill
    const textSprites: THREE.Sprite[] = [];

    skills.forEach((skill, index) => {
      // Calculate normal vector for the circle's orientation
      const angle = (index / skills.length) * Math.PI * 2;
      const normal = new THREE.Vector3(Math.cos(angle), Math.sin(angle), 0).normalize();

      // Generate circle points
      const points = generateCirclePoints(5, new THREE.Vector3(0, 0, 0), normal);

      // Create a filled circle (Mesh) instead of a line
      const shape = new THREE.Shape();
      shape.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        shape.lineTo(points[i].x, points[i].y);
      }
      const geometry = new THREE.ShapeGeometry(shape);
      const material = new THREE.MeshBasicMaterial({ color: circleColors[0] }); // Use orange color
      const circle = new THREE.Mesh(geometry, material);

      // Create text sprite
      const textTexture = createTextTexture(skill.name, skill.color); // Skill-specific color
      if (textTexture) {
        const spriteMaterial = new THREE.SpriteMaterial({ map: textTexture });
        const sprite = new THREE.Sprite(spriteMaterial);

        // Position the sprite in front of the circle
        sprite.position.copy(normal.multiplyScalar(5.5)); // Adjust distance from the circle
        sprite.scale.set(1.5, 0.75, 1); // Smaller size for the sprite

        textSprites.push(sprite); // Store sprite for visibility checks
        scene.add(sprite);
      }

      // Add the circle to the scene
      scene.add(circle);
    });

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

      // Check visibility of text sprites
      textSprites.forEach((sprite) => {
        const vector = sprite.position.clone().project(camera);
        const isVisible =
          vector.x >= -1 &&
          vector.x <= 1 &&
          vector.y >= -1 &&
          vector.y <= 1 &&
          vector.z >= -1 &&
          vector.z <= 1;
        sprite.visible = isVisible;
      });

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