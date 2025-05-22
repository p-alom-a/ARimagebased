import React, { useEffect, useRef } from 'react';
import { MindARThree } from 'mind-ar/dist/mindar-image-three.prod.js';
import * as THREE from 'three';

export default function AutoStartMindAR() {
  const containerRef = useRef(null);

  useEffect(() => {
    let mindarThree;
    let animationId;
    let sphere;
    let startTime = null;
    const animationDuration = 2000; // 2 seconds
    const riseHeight = 0.5; // How much the sphere rises
    let initialY = 0.3; // Initial Y position (top of the image)
    let animationStarted = false;

    async function startAR() {
      mindarThree = new MindARThree({
        container: containerRef.current,
        imageTargetSrc: "https://p-alom-a.github.io/ARimagebased/targets-tatoo.mind"
      });

      const { renderer, scene, camera } = mindarThree;
      const anchor = mindarThree.addAnchor(0);

      // Création d'une petite sphère noire
      const geometry = new THREE.SphereGeometry(0.05, 16, 16); // Small sphere
      const material = new THREE.MeshBasicMaterial({ color: 0x000000 }); // Black color
      sphere = new THREE.Mesh(geometry, material);
      
      // Position the sphere at the top of the image
      sphere.position.set(0, initialY, 0);
      anchor.group.add(sphere);

      // Démarrer MindAR (lancement automatique)
      await mindarThree.start();

      // Start animation after a short delay
      setTimeout(() => {
        animationStarted = true;
        startTime = Date.now();
      }, 1000);

      // Boucle de rendu Three.js avec animation
      const renderLoop = () => {
        // Animation logic
        if (animationStarted && sphere && startTime) {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / animationDuration, 1);
          
          // Easing function for smooth animation (ease-out)
          const easedProgress = 1 - Math.pow(1 - progress, 3);
          
          // Update sphere position
          sphere.position.y = initialY + (riseHeight * easedProgress);
          
          // Stop animation when complete
          if (progress >= 1) {
            animationStarted = false;
          }
        }

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