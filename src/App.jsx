export default function App()
{
    return(
        <>
            <a-scene mindar-image="imageTargetSrc: /ARimagebased/targets.mind;" vr-mode-ui="enabled: false" device-orientation-permission-ui="enabled: false">
                <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>
                <a-entity mindar-image-target="targetIndex: 0">
                    <a-plane color="blue" opaciy="0.5" position="0 0 0" height="0.552" width="1" rotation="0 0 0"></a-plane>
                </a-entity>
            </a-scene>
        </>
    )
}