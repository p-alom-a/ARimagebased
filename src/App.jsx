import 'aframe';
import 'mind-ar/dist/mindar-image-aframe.prod.js';
import { useState, useEffect } from 'react';

export default function App() {
  const [showRedCube, setShowRedCube] = useState(false);

  useEffect(() => {
    // Set up event listener after the component mounts
    const setupEventListeners = () => {
      // Wait for the scene to load completely
      const sceneEl = document.querySelector('a-scene');
      
      if (sceneEl) {
        sceneEl.addEventListener('loaded', () => {
          // Find the blue cube once the scene is loaded
          const blueCube = document.querySelector('#blue-cube');
          
          if (blueCube) {
            // Add click event listener to blue cube
            blueCube.addEventListener('click', () => {
              setShowRedCube(true);
            });
          }
        });
      }
    };

    // Small delay to ensure DOM elements are ready
    const timer = setTimeout(() => {
      setupEventListeners();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <a-scene 
        mindar-image="imageTargetSrc: /ARimagebased/targets-compteur.mind;" 
        vr-mode-ui="enabled: false" 
        device-orientation-permission-ui="enabled: false"
        cursor="rayOrigin: mouse; fuse: false"
        raycaster="objects: .clickable; far: 10000">
        
        <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>
        
        <a-entity mindar-image-target="targetIndex: 0">
          {/* Blue cube with class for raycaster and unique id */}
          <a-box 
            id="blue-cube"
            class="clickable" 
            color="blue" 
            position="-0.200074 0.147799 0.086576" 
            width="0.1" 
            height="0.1" 
            depth="0.02"
            animation__mouseenter="property: scale; to: 1.2 1.2 1.2; dur: 300; startEvents: mouseenter"
            animation__mouseleave="property: scale; to: 1 1 1; dur: 300; startEvents: mouseleave">
          </a-box>
          
          {/* Red cube that appears when blue cube is clicked */}
          {showRedCube && (
            <a-box 
              color="red" 
              position="0 0 0" 
              width="0.1" 
              height="0.1" 
              depth="0.02"
              animation="property: scale; from: 0 0 0; to: 1 1 1; dur: 500; easing: easeOutElastic">
            </a-box>
          )}
        </a-entity>
      </a-scene>
    </>
  );
}