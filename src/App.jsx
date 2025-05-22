import React, { useEffect, useRef } from 'react';
import { MindARThree } from 'mind-ar/dist/mindar-image-three.prod.js';
import * as THREE from 'three';
import { useControls } from 'leva';

export default function AutoStartMindAR() {
  const containerRef = useRef(null);
  const sphereRef = useRef(null);

  // Leva controls
  const { posX, posY, posZ } = useControls('Sphère', {
    posX: { value: 0, min: -2, max: 2, step: 0.01 },
    posY: { value: -0.3, min: -2, max: 2, step: 0.01 },
    posZ: { value: 0, min: -2, max: 2, step: 0.01 },
  });

  useEffect(() => {
    let mindarThree;
    let animationId;

    async function startAR() {
      mindarThree = new MindARThree({
        container: containerRef.current,
        imageTargetSrc: "https://p-alom-a.github.io/ARimagebased/targets-tatoo.mind",
      });

      const { renderer, scene, camera } = mindarThree;
      const anchor = mindarThree.addAnchor(0);

      // Crée la sphère
      const geometry = new THREE.SphereGeometry(0.05, 32, 32);
      const material = new THREE.MeshBasicMaterial({ color: 0x000000 });
      const sphere = new THREE.Mesh(geometry, material);
      sphereRef.current = sphere;
      anchor.group.add(sphere);

      await mindarThree.start();

      const renderLoop = () => {
        // Met à jour la position avec les valeurs du panneau
        if (sphereRef.current) {
          sphereRef.current.position.set(posX, posY, posZ);
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
  }, []); // 👈 se déclenche **une seule fois**

  return (
    <div style={{ width: '100%', height: '100%' }} ref={containerRef} />
  );
}
