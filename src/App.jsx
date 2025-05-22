import 'aframe';
import 'mind-ar/dist/mindar-image-aframe.prod.js';

export default function App()
{
  return(
    <>
      <a-scene mindar-image="imageTargetSrc: /ARimagebased/targets-tatoo.mind;" vr-mode-ui="enabled: false" device-orientation-permission-ui="enabled: false">
        <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>
        <a-entity mindar-image-target="targetIndex: 0">
          <a-sphere color="black" radius="0.1" position="0 0.4 0"></a-sphere>
        </a-entity>
      </a-scene>
    </>
  )
}