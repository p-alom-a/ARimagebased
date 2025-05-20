import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { MindARThree } from 'mind-ar/dist/mindar-image-three.prod.js';

export default function App() {
    const containerRef = useRef(null);

    useEffect(() => {
        let mindarThree = null;

        const init = async () => {
            try {
                mindarThree = new MindARThree({
                    container: containerRef.current,
                    imageTargetSrc: "/targets-compteur.mind",
                    maxTrack: 1,
                    warmupTolerance: 5,
                    missTolerance: 5,
                });

                const {renderer, scene, camera} = mindarThree;
                
                // Attendre que MindAR soit complètement initialisé
                await mindarThree.start();
                
                const anchor = mindarThree.addAnchor(0);
                const geometry = new THREE.PlaneGeometry(1, 0.55);
                const material = new THREE.MeshBasicMaterial( {color: 0x00ffff, transparent: true, opacity: 0.5} );
                const plane = new THREE.Mesh( geometry, material );
                anchor.group.add(plane);

                renderer.setAnimationLoop(() => {
                    renderer.render(scene, camera);
                });
            } catch (error) {
                console.error("Erreur lors de l'initialisation de MindAR:", error);
            }
        };

        init();

        return () => {
            if (mindarThree) {
                mindarThree.renderer.setAnimationLoop(null);
                mindarThree.stop();
            }
        }
    }, []);

    return (
        <div style={{width: "100%", height: "100%"}} ref={containerRef}>
        </div>
    )
}