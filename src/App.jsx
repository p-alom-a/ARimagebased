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
        imageTargetSrc: "imageTargetSrc: /ARimagebased/targets-compteur.mind;"
      });

      const { renderer, scene, camera } = mindarThree;
      const anchor = mindarThree.addAnchor(0);

      // Création d’un plan semi-transparent bleu
      const geometry = new THREE.PlaneGeometry(1, 0.55);
      const material = new THREE.MeshBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.5 });
      const plane = new THREE.Mesh(geometry, material);
      anchor.group.add(plane);

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
