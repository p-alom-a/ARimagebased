
import 'aframe';
import 'mind-ar/dist/mindar-image-aframe.prod.js';

export default function App()
{
    return(
        <>
            <a-scene mindar-image="imageTargetSrc: /ARimagebased/targets-compteur.mind;" vr-mode-ui="enabled: false" device-orientation-permission-ui="enabled: false">
                <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>
                <a-entity mindar-image-target="targetIndex: 0">
                    <a-box color="blue" position="0.1 0 0" width="0.02" height="0.02" depth="0.02"></a-box>
                    <a-box color="green" position="0 0.1 0" width="0.02" height="0.02" depth="0.02"></a-box>
                </a-entity>
            </a-scene>
        </>
    )
}