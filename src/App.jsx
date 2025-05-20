import 'aframe';
import 'mind-ar/dist/mindar-image-aframe.prod.js';
import { useState } from 'react';

export default function App()
{
    const [showRedCube, setShowRedCube] = useState(false);

    const handleCubeClick = () => {
        alert('Clic détecté sur le cube bleu !');
        setShowRedCube(true);
        alert('État showRedCube mis à jour : ' + showRedCube);
    };

    return(
        <>
            <a-scene mindar-image="imageTargetSrc: /ARimagebased/targets-compteur.mind;" vr-mode-ui="enabled: false" device-orientation-permission-ui="enabled: false">
                <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>
                <a-entity mindar-image-target="targetIndex: 0">
                    <a-box 
                        color="red" 
                        position="-0.200074  0.147799  0.086576" 
                        width="0.1" 
                        height="0.1" 
                        depth="0.02"
                        events={{
                            click: handleCubeClick
                        }}
                        cursor="fuse: false; rayOrigin: mouse;"
                    ></a-box>
                    {showRedCube && (
                        <a-box 
                            color="red" 
                            position="-0.200074 0.247799 0.086576" 
                            width="0.1" 
                            height="0.1" 
                            depth="0.02"
                        ></a-box>
                    )}
                </a-entity>
            </a-scene>
        </>
    )
}