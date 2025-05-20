import React, { useEffect, useRef } from 'react';
import 'aframe';
import 'mind-ar/dist/mindar-image-aframe.prod.js';

export default function App() {
  const sceneRef = useRef(null);
  
  useEffect(() => {
    // S'assurer que la référence existe
    if (!sceneRef.current) return;
    
    const sceneEl = sceneRef.current;
    
    // Démarrer le système AR une fois que la scène est prête
    const handleRenderStart = () => {
      if (sceneEl.systems["mindar-image-system"]) {
        sceneEl.systems["mindar-image-system"].start();
      }
    };
    
    sceneEl.addEventListener('renderstart', handleRenderStart);
    
    // Nettoyer lors du démontage du composant
    return () => {
      if (sceneEl.systems["mindar-image-system"]) {
        sceneEl.removeEventListener('renderstart', handleRenderStart);
        sceneEl.systems["mindar-image-system"].stop();
      }
    };
  }, []);
  
  return (
    <>
      <a-scene 
        ref={sceneRef} 
        mindar-image="imageTargetSrc: /ARimagebased/targets.mind; autoStart: false;" 
        vr-mode-ui="enabled: false" 
        device-orientation-permission-ui="enabled: false"
        embedded
        color-space="sRGB"
        renderer="colorManagement: true"
      >
        <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>
        <a-entity mindar-image-target="targetIndex: 0">
          <a-plane 
            color="blue" 
            opacity="0.5" 
            position="0 0 0" 
            height="0.552" 
            width="1" 
            rotation="0 0 0"
          ></a-plane>
        </a-entity>
      </a-scene>
    </>
  );
}