import React, { useEffect, useRef } from 'react';
import { MindARThree } from 'mind-ar/dist/mindar-image-three.prod.js';
import * as THREE from 'three';

export default function MultiTargetMindAR() {
  const containerRef = useRef(null);

  useEffect(() => {
    let mindarThree;
    let animationId;

    async function startAR() {
      // Initialisation de MindAR
      mindarThree = new MindARThree({
        container: containerRef.current,
        imageTargetSrc: "https://p-alom-a.github.io/ARimagebased/targets-multiBook.mind"
      });

      const { renderer, scene, camera } = mindarThree;

      // Création du premier anchor (index 0) - Carré rouge
      const anchor1 = mindarThree.addAnchor(0);
      const geometry1 = new THREE.PlaneGeometry(1, 0.55);
      const material1 = new THREE.MeshBasicMaterial({ 
        color: 0xff0000,  // Rouge
        transparent: true, 
        opacity: 0.5 
      });
      const plane1 = new THREE.Mesh(geometry1, material1);
      anchor1.group.add(plane1);

      // Création du deuxième anchor (index 1) - Carré bleu
      const anchor2 = mindarThree.addAnchor(1);
      const geometry2 = new THREE.PlaneGeometry(1, 0.55);
      const material2 = new THREE.MeshBasicMaterial({ 
        color: 0x0000ff,  // Bleu
        transparent: true, 
        opacity: 0.5 
      });
      const plane2 = new THREE.Mesh(geometry2, material2);
      anchor2.group.add(plane2);

      // Démarrer MindAR
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