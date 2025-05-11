import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";

const Earth: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0); 
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    interface CirclePoint {
      x: number;
      y: number;
      z: number;
    }

    const generateCirclePoints = (
      radius: number,
      center: THREE.Vector3,
      normal: THREE.Vector3,
      segments: number = 64
    ): CirclePoint[] => {
      const points: CirclePoint[] = [];
      const axis = new THREE.Vector3(0, 1, 0);
      const quaternion = new THREE.Quaternion().setFromUnitVectors(
      axis,
      normal.clone().normalize()
      );

      for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const point = new THREE.Vector3(x, y, 0).applyQuaternion(quaternion).add(center);
      points.push({ x: point.x, y: point.y, z: point.z });
      }

      return points;
    };

    const createTextTexture = (text: string, color: string) => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      if (!context) return null;

      const scale = 2; 
      const textWidth = context.measureText(text).width;
      canvas.width = (textWidth + 20) * scale; 
      canvas.height = 20 * scale; 

      context.scale(scale, scale);

      context.fillStyle = color; 
      context.font = "12px Arial"; 
      context.fillText(text, 10, 15); 

      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;

      return texture;
    };

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

    const circleColors = [0xffa500]; 
    const textSprites: THREE.Sprite[] = [];

    skills.forEach((skill, index) => {
      const angle = (index / skills.length) * Math.PI * 2;
      const normal = new THREE.Vector3(Math.cos(angle), Math.sin(angle), 0).normalize();

      const points = generateCirclePoints(5, new THREE.Vector3(0, 0, 0), normal);
      const shape = new THREE.Shape();
      shape.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        shape.lineTo(points[i].x, points[i].y);
      }
      const geometry = new THREE.ShapeGeometry(shape);
      const material = new THREE.MeshBasicMaterial({ color: circleColors[0] });
      const circle = new THREE.Mesh(geometry, material);

      const textTexture = createTextTexture(skill.name, skill.color); 
      if (textTexture) {
        const spriteMaterial = new THREE.SpriteMaterial({ map: textTexture });
        const sprite = new THREE.Sprite(spriteMaterial);

        sprite.position.copy(normal.multiplyScalar(5.5));
        sprite.scale.set(1.5, 0.75, 1);

        textSprites.push(sprite); 
        scene.add(sprite);
      }

      scene.add(circle);
    });

    camera.position.z = 10;

    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const x = (clientX / window.innerWidth) * 2 - 1;
      const y = -(clientY / window.innerHeight) * 2 + 1; 
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);

      scene.rotation.y = mousePosition.x * Math.PI; 
      scene.rotation.x = mousePosition.y * Math.PI; 

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
      className="rounded-full overflow-hidden cursor-pointer"
    />
  );
};

export default Earth;