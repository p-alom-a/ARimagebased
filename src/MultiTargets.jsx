import 'aframe';
import 'mind-ar/dist/mindar-image-aframe.prod.js';

export default function App()
{
    return(
        <>
     
            <a-scene
            mindar-image="imageTargetSrc: https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.5/examples/image-tracking/assets/band-example/band.mind;"
            color-space="sRGB"
            renderer="colorManagement: true, physicallyCorrectLights"
            vr-mode-ui="enabled: false"
            device-orientation-permission-ui="enabled: false"
            >
            {/* <!-- Chargement des ressources 3D --> */}
            <a-assets>
                {/* <!-- Modèle 3D du panda --> */}
                <a-asset-item
                id="bearModel"
                src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.5/examples/image-tracking/assets/band-example/bear/scene.gltf"
                ></a-asset-item>
                {/* <!-- Modèle 3D du raton laveur --> */}
                <a-asset-item
                id="raccoonModel"
                src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.5/examples/image-tracking/assets/band-example/raccoon/scene.gltf"
                ></a-asset-item>
            </a-assets>

            {/* <!-- Caméra de la scène, positionnée à l'origine sans contrôle de regard --> */}
            <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

            {/* <!-- Entité AR liée à la première cible d'image (index 0) --> */}
            <a-entity mindar-image-target="targetIndex: 0">
                {/* <!-- Modèle 3D du raton laveur affiché lorsque la cible 0 est détectée --> */}
                <a-gltf-model
                rotation="0 0 0"
                position="0 -0.25 0"
                scale="0.05 0.05 0.05"
                src="#raccoonModel"
                animation-mixer
                ></a-gltf-model>
            </a-entity>

            {/* <!-- Entité AR liée à la deuxième cible d'image (index 1) --> */}
            <a-entity mindar-image-target="targetIndex: 1">
                {/* <!-- Modèle 3D du panda affiché lorsque la cible 1 est détectée --> */}
                <a-gltf-model
                rotation="0 0 0"
                position="0 -0.25 0"
                scale="0.05 0.05 0.05"
                src="#bearModel"
                animation-mixer
                ></a-gltf-model>
            </a-entity>
            </a-scene>

        </>
    )
}