import { ARAnchor, ARView } from "react-three-mind";
import { Html, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'


function Plane(props) {
  return (
    <mesh {...props}>
      <boxGeometry args={[1, 1, 0.1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );}
  
  function PlaneTwo(props) {
    return (
      <mesh {...props}>
        <boxGeometry args={[0.5, 0.5, 0.1]} />
        <meshStandardMaterial color="blue" />
      </mesh>
    );
}
function HtmlHUD() {
  return (
    <Canvas
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        pointerEvents: 'none', // Empêche de bloquer les clics sauf sur Html
      }}
      camera={{ position: [0, 0, 5] }}
    >
      <Html
        center
        position={[0, 0, 0]}
        transform
        occlude={false}
        style={{ pointerEvents: 'auto' }}
      >
        <button
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
          onClick={() => alert('HUD OK cliqué')}
        >
          OK
        </button>
      </Html>
    </Canvas>
  )
}


function App() {
  return (
    <ARView
      imageTargets="https://p-alom-a.github.io/ARimagebased/targets-multiUN.mind"
      filterMinCF={0.001}
      filterBeta={1000}
      missTolerance={5}
      warmupTolerance={5}
      flipUserCamera={false}
    >
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <ARAnchor target={0}>
        <Plane position={[0, 0.5, 1]} />
      </ARAnchor>
      <ARAnchor target={1}>
        <HtmlHUD />
      </ARAnchor>
    </ARView>
  );
}

export default App;