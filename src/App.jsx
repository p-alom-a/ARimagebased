import React, { useEffect, useRef } from 'react';
import { MindARThree } from 'mind-ar/dist/mindar-image-three.prod.js';
import * as THREE from 'three';

export default function AutoStartMindAR() {
  const containerRef = useRef(null);

  useEffect(() => {
    let mindarThree;
    let animationId;
    let startTime = null;
    let sphere;

    async function startAR() {
      mindarThree = new MindARThree({
        container: containerRef.current,
        imageTargetSrc: "https://p-alom-a.github.io/ARimagebased/targets-tatoo.mind",
      });

      const { renderer, scene, camera } = mindarThree;
      const anchor = mindarThree.addAnchor(0);

      // Création d'une petite sphère noire
      const geometry = new THREE.SphereGeometry(0.05, 32, 32);
      const material = new THREE.MeshBasicMaterial({ color: 0x000000 });
      sphere = new THREE.Mesh(geometry, material);

      // Position de départ (en haut du marker)
      sphere.position.set(0, -0.3, 0);
      anchor.group.add(sphere);

      await mindarThree.start();

      // Animation simple vers le haut (0.5 -> 1.2 sur Y)
      const renderLoop = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const elapsed = (timestamp - startTime) / 1000; // en secondes

        if (elapsed < 1) {
          // animation linéaire pendant 1 seconde
          sphere.position.y = 0.5 + (elapsed * 0.7); // monte de 0.7
        } else {
          sphere.position.y = 1.2; // position finale
        }

        renderer.render(scene, camera);
        animationId = requestAnimationFrame(renderLoop);
      };

      renderLoop();
    }

    startAR();

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      if (mindarThree) mindarThree.stop();
    };
  }, []);

  return (
    <div style={{ width: '100%', height: '100%' }} ref={containerRef} />
  );
}
