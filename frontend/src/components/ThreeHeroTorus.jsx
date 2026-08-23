import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ThreeHeroTorus = ({ className = "w-full h-full" }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const width = currentMount.clientWidth || 300;
    const height = currentMount.clientHeight || 220;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    currentMount.appendChild(renderer.domElement);

    // Root Group for the Entire 3D Dumbbell Assembly
    const dumbbellGroup = new THREE.Group();
    scene.add(dumbbellGroup);

    // 💎 1. Chrome / Metallic Knurled Grip Center Bar
    const barGeom = new THREE.CylinderGeometry(0.18, 0.18, 3.8, 32);
    const barMat = new THREE.MeshStandardMaterial({
      color: 0xE2E8F0,
      metalness: 0.95,
      roughness: 0.15,
      envMapIntensity: 1.5,
    });
    const barMesh = new THREE.Mesh(barGeom, barMat);
    barMesh.rotation.z = Math.PI / 2;
    dumbbellGroup.add(barMesh);

    // 💎 2. Center Grip Ring Accents (Deep Indigo)
    const gripAccentGeom = new THREE.CylinderGeometry(0.20, 0.20, 1.4, 32);
    const gripAccentMat = new THREE.MeshStandardMaterial({
      color: 0x4F46E5,
      metalness: 0.7,
      roughness: 0.2,
      emissive: 0x3730A3,
      emissiveIntensity: 0.4,
    });
    const gripAccentMesh = new THREE.Mesh(gripAccentGeom, gripAccentMat);
    gripAccentMesh.rotation.z = Math.PI / 2;
    dumbbellGroup.add(gripAccentMesh);

    // 💎 3. Hexagonal / Precision Cut Weight Plates (Left & Right Sides)
    const createPlate = (radius, thickness, posX, color, emissiveColor) => {
      // 12-sided faceted polygon plate for aggressive futuristic gym look
      const plateGeom = new THREE.CylinderGeometry(radius, radius, thickness, 12);
      const plateMat = new THREE.MeshPhysicalMaterial({
        color: color,
        metalness: 0.4,
        roughness: 0.1,
        transmission: 0.6, // Translucent frosted glass weight plate
        thickness: 0.8,
        ior: 1.45,
        transparent: true,
        opacity: 0.92,
        emissive: emissiveColor,
        emissiveIntensity: 0.25,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
      });
      const plateMesh = new THREE.Mesh(plateGeom, plateMat);
      plateMesh.rotation.z = Math.PI / 2;
      plateMesh.position.x = posX;
      return plateMesh;
    };

    // Inner Large Plates (Deep Indigo Glass)
    const leftPlate1 = createPlate(1.15, 0.35, -1.2, 0x4F46E5, 0x312E81);
    const rightPlate1 = createPlate(1.15, 0.35, 1.2, 0x4F46E5, 0x312E81);
    dumbbellGroup.add(leftPlate1);
    dumbbellGroup.add(rightPlate1);

    // Outer Medium Plates (Emerald Mint Glass)
    const leftPlate2 = createPlate(0.95, 0.30, -1.6, 0x059669, 0x064E3B);
    const rightPlate2 = createPlate(0.95, 0.30, 1.6, 0x059669, 0x064E3B);
    dumbbellGroup.add(leftPlate2);
    dumbbellGroup.add(rightPlate2);

    // Chrome End Collars / Fastener Rings
    const collarGeom = new THREE.CylinderGeometry(0.35, 0.35, 0.22, 24);
    const collarMat = new THREE.MeshStandardMaterial({ color: 0xF8FAFC, metalness: 0.9, roughness: 0.1 });
    const leftCollar = new THREE.Mesh(collarGeom, collarMat);
    leftCollar.rotation.z = Math.PI / 2;
    leftCollar.position.x = -1.85;
    const rightCollar = new THREE.Mesh(collarGeom, collarMat);
    rightCollar.rotation.z = Math.PI / 2;
    rightCollar.position.x = 1.85;
    dumbbellGroup.add(leftCollar);
    dumbbellGroup.add(rightCollar);

    // 🔮 4. Futuristic Dynamic Orbit Rings (Gym Telemetry Tracker Energy Rings)
    const ringGeom1 = new THREE.TorusGeometry(2.0, 0.025, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x4F46E5, transparent: true, opacity: 0.6 });
    const ringMesh1 = new THREE.Mesh(ringGeom1, ringMat1);
    ringMesh1.rotation.x = Math.PI / 4;
    scene.add(ringMesh1);

    const ringGeom2 = new THREE.TorusGeometry(2.3, 0.015, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x10B981, transparent: true, opacity: 0.5 });
    const ringMesh2 = new THREE.Mesh(ringGeom2, ringMat2);
    ringMesh2.rotation.y = Math.PI / 3;
    scene.add(ringMesh2);

    // ✨ 5. Floating Glowing Fitness Energy Particles
    const particleCount = 45;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 6;
      particlePositions[i + 1] = (Math.random() - 0.5) * 4;
      particlePositions[i + 2] = (Math.random() - 0.5) * 4;
    }
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x6366F1,
      size: 0.08,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Studio Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight1.position.set(5, 8, 5);
    scene.add(dirLight1);

    const pointLight1 = new THREE.PointLight(0x4F46E5, 4.0, 30);
    pointLight1.position.set(-4, 3, 3);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x10B981, 3.5, 30);
    pointLight2.position.set(4, -3, 3);
    scene.add(pointLight2);

    // Initial Aesthetic Tilt
    dumbbellGroup.rotation.x = 0.35;
    dumbbellGroup.rotation.y = 0.45;
    dumbbellGroup.rotation.z = -0.25;

    let animationFrameId;
    let targetRotationX = 0.35;
    let targetRotationY = 0.45;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event) => {
      const rect = currentMount.getBoundingClientRect();
      mouseX = ((event.clientX - rect.left) / width) * 2 - 1;
      mouseY = -((event.clientY - rect.top) / height) * 2 + 1;
      targetRotationY = 0.45 + mouseX * 0.8;
      targetRotationX = 0.35 - mouseY * 0.6;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth Gentle Levitation (Breathing Float)
      dumbbellGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.15;
      dumbbellGroup.rotation.z = -0.25 + Math.cos(elapsedTime * 0.8) * 0.08;

      // Mouse Inertia Damping
      dumbbellGroup.rotation.y += (targetRotationY - dumbbellGroup.rotation.y) * 0.06;
      dumbbellGroup.rotation.x += (targetRotationX - dumbbellGroup.rotation.x) * 0.06;

      // Continuous Slow Ambient Rotation
      leftPlate1.rotation.y += 0.01;
      rightPlate1.rotation.y += 0.01;
      leftPlate2.rotation.y -= 0.012;
      rightPlate2.rotation.y -= 0.012;

      // Orbit Telemetry Rings
      ringMesh1.rotation.z += 0.008;
      ringMesh2.rotation.x -= 0.006;

      // Energy Particles Subtle Swirl
      particles.rotation.y = elapsedTime * 0.05;

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
      barGeom.dispose();
      barMat.dispose();
      gripAccentGeom.dispose();
      gripAccentMat.dispose();
      collarGeom.dispose();
      collarMat.dispose();
      ringGeom1.dispose();
      ringMat1.dispose();
      ringGeom2.dispose();
      ringMat2.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className={className} />;
};
