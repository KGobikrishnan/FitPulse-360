import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ThreeHeroTorus = ({ className = "w-full h-full" }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const width = currentMount.clientWidth || 300;
    const height = currentMount.clientHeight || 200;

    // Scene, Camera, Renderer with Alpha Transparency
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    // Dynamic Geometry: 3D Fitness Ring / Torus Knot
    const geometry = new THREE.TorusKnotGeometry(1.2, 0.35, 128, 32, 2, 3);
    
    // Custom luxury iridescent wireframe + liquid glass mesh
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x4F46E5,
      emissive: 0x6366F1,
      emissiveIntensity: 0.25,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.9, // Liquid glass refraction
      ior: 1.5,
      thickness: 1.2,
      specularIntensity: 1.0,
      specularColor: 0x059669,
      transparent: true,
      opacity: 0.95,
      wireframe: false,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Outer subtle orbit wireframe ring
    const orbitGeom = new THREE.TorusGeometry(2.1, 0.02, 16, 100);
    const orbitMat = new THREE.MeshBasicMaterial({ color: 0x059669, transparent: true, opacity: 0.35 });
    const orbitMesh = new THREE.Mesh(orbitGeom, orbitMat);
    orbitMesh.rotation.x = Math.PI / 3;
    scene.add(orbitMesh);

    // Studio Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x4F46E5, 3.5, 50);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x059669, 3.0, 50);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    let animationFrameId;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event) => {
      const rect = currentMount.getBoundingClientRect();
      mouseX = ((event.clientX - rect.left) / width) * 2 - 1;
      mouseY = -((event.clientY - rect.top) / height) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      mesh.rotation.x += 0.008;
      mesh.rotation.y += 0.012;
      orbitMesh.rotation.z -= 0.005;

      // Subtle interactive mouse inertia
      mesh.position.x += (mouseX * 0.4 - mesh.position.x) * 0.05;
      mesh.position.y += (mouseY * 0.4 - mesh.position.y) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!currentMount) return;
      const newWidth = currentMount.clientWidth;
      const newHeight = currentMount.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      orbitGeom.dispose();
      orbitMat.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className={className} />;
};
