import 'aframe';
import 'mind-ar/dist/mindar-image-aframe.prod.js';
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    // Attendre que la scène soit chargée
    const sceneEl = document.querySelector('a-scene');
    
    if (sceneEl) {
      sceneEl.addEventListener('loaded', function () {
        // Créer un composant personnalisé pour gérer les clics
        AFRAME.registerComponent('handle-clicks', {
          init: function() {
            const el = this.el;
            let isIntersecting = false;
            
            // Détecter quand le raycaster entre en intersection avec l'objet
            el.addEventListener('raycaster-intersected', function() {
              isIntersecting = true;
              // Animation facultative au survol
              el.setAttribute('scale', '1.2 1.2 1.2');
            });
            
            // Détecter quand le raycaster quitte l'objet
            el.addEventListener('raycaster-intersected-cleared', function() {
              isIntersecting = false;
              // Retour à l'échelle normale
              el.setAttribute('scale', '1 1 1');
            });
            
            // Gérer le clic global quand un objet est survolé
            const handleClick = function() {
              if (isIntersecting) {
                alert("plane click");
                // Votre logique personnalisée ici
              }
            };
            
            // Écouter les clics sur ordinateur et appareils mobiles
            document.addEventListener('click', handleClick);
            document.addEventListener('touchend', handleClick);
          }
        });
        
        // Attacher le composant à l'élément clickable
        const examplePlane = document.querySelector('#example-plane');
        if (examplePlane) {
          examplePlane.setAttribute('handle-clicks', '');
        }
      });
    }
  }, []);
  
  return (
    <>
      <a-scene 
        mindar-image="imageTargetSrc: /ARimagebased/targets-book.mind;" 
        vr-mode-ui="enabled: false" 
        device-orientation-permission-ui="enabled: false"
        embedded
        renderer="colorManagement: true; physicallyCorrectLights: true;"
      >
        <a-camera
          position="0 0 0"
          look-controls="enabled: false"
          raycaster="objects: .clickable; far: 100"
          cursor="fuse: false; rayOrigin: entity"
        ></a-camera>
        
        <a-entity mindar-image-target="targetIndex: 0">
          <a-plane
            id="example-plane"
            class="clickable"
            color="blue"
            opacity="0.5"
            position="0 0 0"
            height="0.552"
            width="1"
            rotation="0 0 0"
          ></a-plane>
        </a-entity>
      </a-scene>
      
      <style jsx global>{`
        body {
          margin: 0;
          overflow: hidden;
        }
        .a-canvas {
          touch-action: none;
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
      `}</style>
    </>
  );
}