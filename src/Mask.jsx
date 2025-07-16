import 'aframe';
import 'mind-ar/dist/mindar-image-aframe.prod.js';

export default function App()
{
    return(
        <>
     
            <a-scene
            mindar-image="imageTargetSrc: https://p-alom-a.github.io/ARimagebased/targets-mask3.mind; maxTrack: 3"
            color-space="sRGB"
            renderer="colorManagement: true, physicallyCorrectLights"
            vr-mode-ui="enabled: false"
            device-orientation-permission-ui="enabled: false"
            >
            {/* <!-- Chargement des ressources 3D --> */}
            <a-assets>
            
                <a-asset-item
                id="maskModel"
                src="https://p-alom-a.github.io/ARimagebased/models/maskModel.glb"
                ></a-asset-item>
             
            </a-assets>

            {/* <!-- Caméra de la scène, positionnée à l'origine sans contrôle de regard --> */}
            <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

            {/* <!-- Entité AR liée à la première cible d'image (index 0) --> */}
            <a-entity mindar-image-target="targetIndex: 0">
                {/* <!-- Modèle 3D du raton laveur affiché lorsque la cible 0 est détectée --> */}
                <a-gltf-model
                rotation="0 -90 0"
                position="0 0 0"
                scale="1 1 1"
                src="#maskModel"
                animation-mixer
                ></a-gltf-model>
            </a-entity>
  

            </a-scene>

        </>
    )
}