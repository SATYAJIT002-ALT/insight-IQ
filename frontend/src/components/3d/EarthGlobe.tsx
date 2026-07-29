"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function EarthGlobeCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 5.5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x60a5fa, 1.2);
    dirLight1.position.set(5, 5, 5);
    scene.add(dirLight1);

    const pointLight = new THREE.PointLight(0xa78bfa, 1.0);
    pointLight.position.set(-5, -5, -5);
    scene.add(pointLight);

    // Earth Core Wireframe Sphere
    const geometry = new THREE.SphereGeometry(2, 48, 48);
    const material = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      wireframe: true,
      emissive: 0x3b82f6,
      emissiveIntensity: 0.4,
      roughness: 0.2
    });
    const earth = new THREE.Mesh(geometry, material);
    scene.add(earth);

    // Atmosphere Glow Outer Sphere
    const atmosphereGeom = new THREE.SphereGeometry(2.08, 48, 48);
    const atmosphereMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.25,
      wireframe: true
    });
    const atmosphere = new THREE.Mesh(atmosphereGeom, atmosphereMat);
    scene.add(atmosphere);

    // Orbiting Data Nodes Group
    const nodesGroup = new THREE.Group();
    const nodePositions = [
      [2.3, 0.5, 0],
      [-1.8, 1.6, 1.2],
      [0.8, -2.1, -1.1],
      [-2.2, -0.8, 0.8]
    ];

    nodePositions.forEach((pos, idx) => {
      const nodeGeom = new THREE.SphereGeometry(0.09, 16, 16);
      const nodeMat = new THREE.MeshBasicMaterial({
        color: idx % 2 === 0 ? 0x10b981 : 0x8b5cf6
      });
      const nodeMesh = new THREE.Mesh(nodeGeom, nodeMat);
      nodeMesh.position.set(pos[0], pos[1], pos[2]);
      nodesGroup.add(nodeMesh);
    });
    scene.add(nodesGroup);

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      earth.rotation.y += 0.005;
      atmosphere.rotation.y += 0.007;
      nodesGroup.rotation.y += 0.008;
      nodesGroup.rotation.x += 0.002;

      renderer.render(scene, camera);
    };
    animate();

    // Resize Handler
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
      atmosphereGeom.dispose();
      atmosphereMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="w-full h-full min-h-[350px] relative flex items-center justify-center">
      <div ref={mountRef} className="w-full h-full absolute inset-0" />
    </div>
  );
}
