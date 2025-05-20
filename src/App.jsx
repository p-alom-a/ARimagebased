import 'aframe';
import 'mind-ar/dist/mindar-image-aframe.prod.js';

export default function App() {
    const handleClick = () => {
        const scene = document.querySelector('a-scene');
        const redCube = document.createElement('a-entity');

        redCube.setAttribute('geometry', {
            primitive: 'box',
            width: 0.1,
            height: 0.1,
            depth: 0.02
        });

        redCube.setAttribute('material', 'color', 'red');

        // Position the red cube next to the blue cube
        redCube.setAttribute('position', '0.200074 0.147799 0.086576');

        scene.appendChild(redCube);
    };

    return (
        <>
            <a-scene mindar-image="imageTargetSrc: /ARimagebased/targets-compteur.mind;" vr-mode-ui="enabled: false" device-orientation-permission-ui="enabled: false">
                <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>
                <a-entity mindar-image-target="targetIndex: 0">
                    <a-box
                        color="blue"
                        position="-0.200074 0.147799 0.086576"
                        width="0.1"
                        height="0.1"
                        depth="0.02"
                        onclick={handleClick}
                    ></a-box>
                </a-entity>
            </a-scene>
        </>
    );
}
