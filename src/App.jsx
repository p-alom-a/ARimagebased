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

      // Matériau Glassmorphism
      const glassMaterial = new THREE.MeshPhysicalMaterial({
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

      // Géométrie bouton réduite (bords arrondis)
      const shape = new THREE.Shape();
      const radius = 0.05; // Réduit pour s'adapter à la taille du plan original
      const width = 0.6, height = 0.33; // Proportions similaires au plan (1 x 0.55)
      
      shape.moveTo(-width / 2 + radius, -height / 2);
      shape.lineTo(width / 2 - radius, -height / 2);
      shape.quadraticCurveTo(width / 2, -height / 2, width / 2, -height / 2 + radius);
      shape.lineTo(width / 2, height / 2 - radius);
      shape.quadraticCurveTo(width / 2, height / 2, width / 2 - radius, height / 2);
      shape.lineTo(-width / 2 + radius, height / 2);
      shape.quadraticCurveTo(-width / 2, height / 2, -width / 2, height / 2 - radius);
      shape.lineTo(-width / 2, -height / 2 + radius);
      shape.quadraticCurveTo(-width / 2, -height / 2, -width / 2 + radius, -height / 2);
      
      const geometry = new THREE.ShapeGeometry(shape);
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