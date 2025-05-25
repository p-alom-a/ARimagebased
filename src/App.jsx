import { ARAnchor, ARView } from "react-three-mind";
import { Html } from '@react-three/drei'

function Plane(props) {
  return (
    <mesh {...props}>
      <boxGeometry args={[1, 1, 0.1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

function PlaneTwo(props) {
  return (
    <mesh {...props}>
      <boxGeometry args={[0.5, 0.5, 0.1]} />
      <meshStandardMaterial color="blue" />
    </mesh>
  );
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
        {/* Placer le Html ici, à l'intérieur du Canvas */}
        <Html position={[0, 0, 0]}>
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
            onClick={() => alert('OK cliqué (HTML)!')}
          >
            OK
          </button>
        </Html>
      </ARAnchor>
    </ARView>
  );
}

export default App;
