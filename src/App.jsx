import 'aframe';
import 'mind-ar/dist/mindar-image-aframe.prod.js';
import { useEffect } from "react";

export default function App() {

  useEffect(() => {
    // Enregistrez le composant personnalisé pour gérer les événements de clic et d'intersection
    AFRAME.registerComponent('handle-click', {
      init: function () {
        const el = this.el;
        el.addEventListener('raycaster-intersect', function (evt) {
          alert("plane click");
          // Ajoutez ici votre logique personnalisée
        });
      }
    });

    // Appliquez le composant personnalisé à l'élément du plan
    const examplePlane = document.querySelector('#example-plane');
    if (examplePlane) {
      examplePlane.setAttribute('handle-click', '');
    }
  }, []);

  return (
    <>
      <a-scene mindar-image="imageTargetSrc: /ARimagebased/targets-compteur.mind;" vr-mode-ui="enabled: false" device-orientation-permission-ui="enabled: false">
        <a-camera
          position="0 0 0"
          look-controls="enabled: false"
        ></a-camera>

        <a-entity raycaster="objects: .clickable" cursor></a-entity>
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
    </>
  );
}
