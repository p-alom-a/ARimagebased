import React, { useEffect, useRef } from 'react';
import 'aframe';
import 'mind-ar/dist/mindar-image-aframe.prod.js';

export default function App() {
  const sceneRef = useRef(null);
  
  useEffect(() => {
    if (!sceneRef.current) return;
  
    const sceneEl = sceneRef.current;
  
    const handleRenderStart = () => {
      const arSystem = sceneEl.systems["mindar-image-system"];
      if (arSystem && typeof arSystem.start === "function") {
        arSystem.start();
      }
    };
  
    sceneEl.addEventListener("renderstart", handleRenderStart);
  
    return () => {
      sceneEl.removeEventListener("renderstart", handleRenderStart);
      const arSystem = sceneEl.systems["mindar-image-system"];
      if (arSystem && typeof arSystem.stop === "function") {
        arSystem.stop(); // ✅ arrêt correct
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