"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function DataCubeCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 250;
    const height = container.clientHeight || 180;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 4.2;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x38bdf8, 1.5);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // 3D Wireframe Analytics Cube
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshStandardMaterial({
      color: 0x2563eb,
      wireframe: true,
      emissive: 0x8b5cf6,
      emissiveIntensity: 0.5,
      roughness: 0.1
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Inner Glowing Core
    const innerGeom = new THREE.BoxGeometry(1.2, 1.2, 1.2);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.4,
      wireframe: true
    });
    const innerCube = new THREE.Mesh(innerGeom, innerMat);
    scene.add(innerCube);

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      cube.rotation.x += 0.008;
      cube.rotation.y += 0.012;
      innerCube.rotation.x -= 0.01;
      innerCube.rotation.y -= 0.015;

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      innerGeom.dispose();
      innerMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="w-full h-full min-h-[180px] relative flex items-center justify-center">
      <div ref={mountRef} className="w-full h-full absolute inset-0" />
    </div>
  );
}
