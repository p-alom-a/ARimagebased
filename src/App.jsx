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
        imageTargetSrc: "https://p-alom-a.github.io/ARimagebased/targets-multiBook.mind"
      });

      const { renderer, scene, camera } = mindarThree;

      // Ajout des lumières à la scène
      const ambientLight = new THREE.AmbientLight(0xffffff, 1);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(0, 1, 1);
      scene.add(directionalLight);

      // Création du premier anchor (index 0) - Korrigan
      const anchor1 = mindarThree.addAnchor(0);
      
      // Chargement du modèle Korrigan
      const gltfLoader1 = new GLTFLoader();
      gltfLoader1.load(
        'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/young-korrigan/model.gltf',
        (gltf) => {
          const korrigan = gltf.scene;
          korrigan.scale.set(1.2, 1.2, 1.2);
          korrigan.position.set(0, -0.25, 0);
          
          // Animation du korrigan
          const mixer = new THREE.AnimationMixer(korrigan);
          const action = mixer.clipAction(gltf.animations[0]);
          action.play();
          
          anchor1.group.add(korrigan);
          
          // Ajouter l'animation à la boucle de rendu
          mindarThree.mixer = mixer;
        },
        (xhr) => {
          console.log((xhr.loaded / xhr.total * 100) + '% chargé');
        },
        (error) => {
          console.error('Erreur lors du chargement du modèle korrigan', error);
        }
      );

      // Création du deuxième anchor (index 1) - Canard
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
          // Rotation pour mettre le modèle à la verticale dans le bon sens et face à la caméra
          model.rotation.x = Math.PI / 2; // Rotation de 90 degrés sur l'axe X
          model.rotation.y = 0; // Pas de rotation sur Y pour faire face à la caméra
          
          // Ajout du modèle à l'anchor
          anchor2.group.add(model);
        },
        (xhr) => {
          console.log((xhr.loaded / xhr.total * 100) + '% chargé');
        },
        (error) => {
          console.error('Erreur lors du chargement du modèle', error);
        }
      );

      // Configuration du lissage pour réduire le tremblement
      mindarThree.onTargetFound = () => {
        // Augmenter la stabilité du tracking
        mindarThree.arSystem.arProfile.detectionMode = 'color_and_depth';
        mindarThree.arSystem.arProfile.detectionThreshold = 0.7;
        mindarThree.arSystem.arProfile.trackingThreshold = 0.6;
      };

      // Démarrer MindAR
      await mindarThree.start();

      // Boucle de rendu Three.js avec lissage
      const renderLoop = () => {
        // Mise à jour des animations si elles existent
        if (mindarThree.mixer) {
          mindarThree.mixer.update(0.016); // 60 FPS
        }
        
        // Lissage des positions des modèles
        if (anchor1.group) {
          anchor1.group.position.lerp(anchor1.group.position, 0.8);
          anchor1.group.quaternion.slerp(anchor1.group.quaternion, 0.8);
        }
        if (anchor2.group) {
          anchor2.group.position.lerp(anchor2.group.position, 0.8);
          anchor2.group.quaternion.slerp(anchor2.group.quaternion, 0.8);
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