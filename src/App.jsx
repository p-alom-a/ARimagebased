import React, { useEffect, useRef } from 'react';
import { MindARThree } from 'mind-ar/dist/mindar-image-three.prod.js';
import * as THREE from 'three';

export default function AutoStartMindAR() {
  const containerRef = useRef(null);

  useEffect(() => {
    let mindarThree;
    let animationId;

    async function startAR() {
      mindarThree = new MindARThree({
        container: containerRef.current,
        imageTargetSrc: "https://p-alom-a.github.io/ARimagebased/targets-leUN.mind"
      });

      const { renderer, scene, camera } = mindarThree;
      const anchor = mindarThree.addAnchor(0);

      // Création du dégradé selon vos spécifications
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const context = canvas.getContext('2d');

      const gradient = context.createLinearGradient(0, 0, 256, 0);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.4)'); // 0% - 40% opacity
      gradient.addColorStop(0.41, 'rgba(255, 255, 255, 0)'); // 41% - 0% opacity  
      gradient.addColorStop(0.57, 'rgba(255, 255, 255, 0)'); // 57% - 0% opacity
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0.1)'); // 100% - 10% opacity

      context.fillStyle = gradient;
      context.fillRect(0, 0, 256, 256);

      const texture = new THREE.CanvasTexture(canvas);

      // Matériau Glassmorphism avec dégradé
      const glassMaterial = new THREE.MeshPhysicalMaterial({
        map: texture,
        color: 0xffffff,
        metalness: 0.1,
        roughness: 0.1,
        transmission: 0.9,
        thickness: 0.5,
        transparent: true,
        opacity: 0.7,
        side: THREE.DoubleSide,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
        ior: 1.5,
        specularIntensity: 1,
      });

      // Géométrie bouton avec épaisseur et border radius 32
      const shape = new THREE.Shape();
      const radius = 0.32; // Border radius 32 (adapté à l'échelle)
      const width = 0.6, height = 0.33;

      shape.moveTo(-width / 2 + radius, -height / 2);
      shape.lineTo(width / 2 - radius, -height / 2);
      shape.quadraticCurveTo(width / 2, -height / 2, width / 2, -height / 2 + radius);
      shape.lineTo(width / 2, height / 2 - radius);
      shape.quadraticCurveTo(width / 2, height / 2, width / 2 - radius, height / 2);
      shape.lineTo(-width / 2 + radius, height / 2);
      shape.quadraticCurveTo(-width / 2, height / 2, -width / 2, height / 2 - radius);
      shape.lineTo(-width / 2, -height / 2 + radius);
      shape.quadraticCurveTo(-width / 2, -height / 2, -width / 2 + radius, -height / 2);

      // Ajout d'épaisseur avec ExtrudeGeometry
      const extrudeSettings = {
        depth: 0.05, // Épaisseur de la card
        bevelEnabled: true,
        bevelThickness: 0.01,
        bevelSize: 0.01,
        bevelSegments: 8
      };
      const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

      const button = new THREE.Mesh(geometry, glassMaterial);
      button.position.set(0, 0, 0);
      anchor.group.add(button);

      // Ajouter un éclairage pour mieux voir l'effet glassmorphism
      const light = new THREE.DirectionalLight(0xffffff, 1);
      light.position.set(0, 1, 1);
      anchor.group.add(light);

      const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
      anchor.group.add(ambientLight);

      // Démarrer MindAR (lancement automatique)
      await mindarThree.start();

      // Boucle de rendu Three.js
      const renderLoop = () => {
        renderer.render(scene, camera);
        animationId = requestAnimationFrame(renderLoop);
      };
      renderLoop();
    }

    startAR();

    return () => {
      // Cleanup propre à la sortie du composant
      if (animationId) cancelAnimationFrame(animationId);
      if (mindarThree) mindarThree.stop();
    };
  }, []);

  return (
    <div style={{ width: '100%', height: '100%' }} ref={containerRef} />
  );
}