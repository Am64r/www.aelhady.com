import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

interface ThreeParticleVisualizerProps {
  color?: string; // Optional color prop
}

const ThreeParticleVisualizer: React.FC<ThreeParticleVisualizerProps> = ({ color = '#1a1a2e' }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const statsRef = useRef<Stats | null>(null);

  useEffect(() => {
    let camera: THREE.PerspectiveCamera, scene: THREE.Scene, renderer: THREE.WebGLRenderer;
    let group: THREE.Group, pointCloud: THREE.Points, linesMesh: THREE.LineSegments;
    const particlesData: any[] = [];
    const maxParticleCount = 1000;
    const particleCount = 500;
    const r = 800;
    const rHalf = r / 2;
    const effectController = {
      showDots: true,
      showLines: true,
      minDistance: 150,
      limitConnections: false,
      maxConnections: 20,
      particleCount: 500,
    };
    let positions: Float32Array, colors: Float32Array;
    let particlePositions: Float32Array, particles: THREE.BufferGeometry;

    const initGUI = () => {
      const gui = new GUI();
      gui.add(effectController, 'showDots').onChange((value: boolean) => {
        pointCloud.visible = value;
      });
      gui.add(effectController, 'showLines').onChange((value: boolean) => {
        linesMesh.visible = value;
      });
      gui.add(effectController, 'minDistance', 10, 300);
      gui.add(effectController, 'limitConnections');
      gui.add(effectController, 'maxConnections', 0, 30, 1);
      gui.add(effectController, 'particleCount', 0, maxParticleCount, 1).onChange((value: number) => {
        particles.setDrawRange(0, value);
      });
    };

    const init = () => {
      if (!containerRef.current) return;

      camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 4000);
      camera.position.z = 1750;

      scene = new THREE.Scene();
      scene.background = new THREE.Color(color); // Set the background color

      group = new THREE.Group();
      scene.add(group);

      const helper = new THREE.BoxHelper(new THREE.Mesh(new THREE.BoxGeometry(r, r, r)));
      helper.material.color.setHex(0x474747);
      helper.material.blending = THREE.AdditiveBlending;
      helper.material.transparent = true;
      group.add(helper);

      positions = new Float32Array(maxParticleCount * maxParticleCount * 3);
      colors = new Float32Array(maxParticleCount * maxParticleCount * 3);

      const pMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 3,
        blending: THREE.AdditiveBlending,
        transparent: true,
        sizeAttenuation: false,
      });

      particles = new THREE.BufferGeometry();
      particlePositions = new Float32Array(maxParticleCount * 3);

      for (let i = 0; i < maxParticleCount; i++) {
        const x = Math.random() * r - r / 2;
        const y = Math.random() * r - r / 2;
        const z = Math.random() * r - r / 2;

        particlePositions[i * 3] = x;
        particlePositions[i * 3 + 1] = y;
        particlePositions[i * 3 + 2] = z;

        particlesData.push({
          velocity: new THREE.Vector3(-1 + Math.random() * 2, -1 + Math.random() * 2, -1 + Math.random() * 2),
          numConnections: 0,
        });
      }

      particles.setDrawRange(0, particleCount);
      particles.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3).setUsage(THREE.DynamicDrawUsage));

      pointCloud = new THREE.Points(particles, pMaterial);
      group.add(pointCloud);

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3).setUsage(THREE.DynamicDrawUsage));
      geometry.computeBoundingSphere();
      geometry.setDrawRange(0, 0);

      const material = new THREE.LineBasicMaterial({
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        transparent: true,
      });

      linesMesh = new THREE.LineSegments(geometry, material);
      group.add(linesMesh);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setAnimationLoop(animate);

      containerRef.current.appendChild(renderer.domElement);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.minDistance = 1000;
      controls.maxDistance = 3000;

      statsRef.current = new Stats();
      containerRef.current.appendChild(statsRef.current.dom);

      initGUI();

      window.addEventListener('resize', onWindowResize);
    };

    const onWindowResize = () => {
      if (!renderer) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const animate = () => {
      if (renderer && scene && camera) renderer.render(scene, camera);
      if (statsRef.current) statsRef.current.update();
    };

    init();

    return () => {
      window.removeEventListener('resize', onWindowResize);
      if (renderer) renderer.dispose();
    };
  }, [color]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0, // Move forward but behind content
        overflow: 'hidden',
      }}
    />
  );
};

export default ThreeParticleVisualizer;
