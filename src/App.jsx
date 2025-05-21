import React, { useEffect, useRef } from 'react';
import { MindARThree } from 'mind-ar/dist/mindar-image-three.prod.js';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export default function MultiTargetMindAR() {
  const containerRef = useRef(null);

  useEffect(() => {
    let mindarThree;
    let animationId;

    async function startAR() {
      // Initialisation de MindAR
      mindarThree = new MindARThree({
        container: containerRef.current,
        imageTargetSrc: "https://p-alom-a.github.io/ARimagebased/targets-compteur.mind"
      });

      const { renderer, scene, camera } = mindarThree;
      
      // Ajout de lumières pour éclairer le modèle 3D
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
      scene.add(ambientLight);
      
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
      directionalLight.position.set(0, 5, 10);
      scene.add(directionalLight);

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

      // Création du deuxième anchor (index 1) - Modèle 3D du canard
      const anchor2 = mindarThree.addAnchor(1);
      
      // Chargement du modèle 3D (canard)
      const gltfLoader = new GLTFLoader();
      gltfLoader.load(
        'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/duck/model.gltf',
        (gltf) => {
          // Ajustement de l'échelle et de la position du modèle
          const model = gltf.scene;
          model.scale.set(0.5, 0.5, 0.5);
          model.position.set(0, -0.25, 0);
          
          // Ajout du modèle à l'anchor
          anchor2.group.add(model);
          
          // Pour des matériaux de base, vous pouvez traverser le modèle et ajuster les matériaux
          model.traverse((node) => {
            if (node.isMesh) {
              // Assurez-vous que les matériaux réagissent à la lumière
              if (node.material) {
                node.material.metalness = 0.1;
                node.material.roughness = 0.8;
                // Si le modèle est toujours noir, décommentez cette ligne
                // node.material.needsUpdate = true;
              }
            }
          });
          
          // Animation de rotation du canard (optionnel)
          const animate = () => {
            model.rotation.y += 0.01;
          };
          
          // Ajouter cette fonction d'animation à la boucle de rendu
          mindarThree.mixer = { update: animate };
        },
        (xhr) => {
          console.log((xhr.loaded / xhr.total * 100) + '% chargé');
        },
        (error) => {
          console.error('Erreur lors du chargement du modèle', error);
        }
      );

      // Démarrer MindAR
      await mindarThree.start();

      // Boucle de rendu Three.js
      const renderLoop = () => {
        // Mise à jour des animations si elles existent
        if (mindarThree.mixer) {
          mindarThree.mixer.update();
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