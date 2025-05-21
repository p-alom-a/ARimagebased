import React, { useEffect, useRef } from 'react';
import { MindARThree } from 'mind-ar/dist/mindar-image-three.prod.js';
import * as THREE from 'three';
import './App.css';

export default function AutoStartMindAR() {
  const containerRef = useRef(null);
  
  useEffect(() => {
    let mindarThree;
    let animationId;
    
    // Variable pour stocker les fonctions de gestion des événements
    // afin de pouvoir les supprimer correctement plus tard
    const eventHandlers = {
      handleInteraction: null
    };
    
    async function startAR() {
      // Tentative avec les options standard
      mindarThree = new MindARThree({
        container: containerRef.current,
        imageTargetSrc: "https://p-alom-a.github.io/ARimagebased/targets-book.mind",
        uiLoading: false,
        uiScanning: false,
        uiError: false,
        uiStart: false
      });
      
      const { renderer, scene, camera } = mindarThree;
      const anchor = mindarThree.addAnchor(0);
      
      // Création d'un plan semi-transparent bleu
      const geometry = new THREE.PlaneGeometry(1, 0.55);
      const material = new THREE.MeshBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.5 });
      const plane = new THREE.Mesh(geometry, material);
      
      // Ajout de l'événement de clic sur le plan
      plane.userData.clickable = true;
      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();
      
      // Fonction pour gérer les interactions (clic et toucher)
      eventHandlers.handleInteraction = (event) => {
        // Empêcher le comportement par défaut pour éviter le défilement
        event.preventDefault();
        
        // Obtenir les coordonnées du point d'interaction
        const rect = containerRef.current.getBoundingClientRect();
        // Gérer à la fois les événements tactiles et les clics
        const clientX = event.clientX || (event.touches && event.touches[0] ? event.touches[0].clientX : 0);
        const clientY = event.clientY || (event.touches && event.touches[0] ? event.touches[0].clientY : 0);
        
        const x = (clientX - rect.left) / rect.width * 2 - 1;
        const y = -(clientY - rect.top) / rect.height * 2 + 1;
        
        mouse.set(x, y);
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObject(plane);
        
        if (intersects.length > 0) {
          // Créer un nouveau plan rouge
          const redGeometry = new THREE.PlaneGeometry(1, 0.55);
          const redMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.5 });
          const redPlane = new THREE.Mesh(redGeometry, redMaterial);
          
          // Positionner le plan rouge à côté du plan bleu
          redPlane.position.set(1.2, 0, 0); // 1.2 unités à droite du plan bleu
          
          // Ajouter le plan rouge au même groupe d'ancrage
          anchor.group.add(redPlane);
        }
      };
      
      // Ajouter les écouteurs d'événements pour le clic et le toucher
      if (containerRef.current) {
        containerRef.current.addEventListener('click', eventHandlers.handleInteraction);
        containerRef.current.addEventListener('touchstart', eventHandlers.handleInteraction);
      }
      
      anchor.group.add(plane);
      
      // Force le démarrage automatique après un court délai
      // pour s'assurer que tout est initialisé correctement
      setTimeout(async () => {
        try {
          // Démarre MindAR
          await mindarThree.start();
          
          // Supprime à nouveau l'UI après le démarrage (pour s'assurer qu'elle reste masquée)
          const startElements = document.querySelectorAll('.mindar-ui-control, .mindar-ui-control-start');
          startElements.forEach(el => {
            el.style.display = 'none';
            el.style.opacity = '0';
            el.style.visibility = 'hidden';
          });
          
          // Boucle de rendu Three.js
          const renderLoop = () => {
            renderer.render(scene, camera);
            animationId = requestAnimationFrame(renderLoop);
          };
          renderLoop();
        } catch (error) {
          console.error("Erreur au démarrage de MindAR:", error);
        }
      }, 500);
    }
    
    startAR();
    
    return () => {
      // Cleanup propre à la sortie du composant
      if (animationId) cancelAnimationFrame(animationId);
      if (mindarThree) mindarThree.stop();
      
      // Nettoyer les écouteurs d'événements
      if (containerRef.current && eventHandlers.handleInteraction) {
        containerRef.current.removeEventListener('click', eventHandlers.handleInteraction);
        containerRef.current.removeEventListener('touchstart', eventHandlers.handleInteraction);
      }
    };
  }, []);
  
  return (
    <div className="ar-container" ref={containerRef} />
  );
}