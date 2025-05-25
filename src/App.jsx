import { ARAnchor, ARView } from "react-three-mind";
import { Text, OrbitControls } from '@react-three/drei'

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
function Button3D() {
  return (
    <group position={[0, 0, 0]}>
      {/* Le fond du bouton */}
      <mesh onClick={() => alert('OK cliqué !')}>
        <boxGeometry args={[2, 1, 0.2]} />
        <meshStandardMaterial color="#4CAF50" />
      </mesh>

      {/* Le texte "OK" */}
      <Text
        position={[0, 0, 0.15]} // Légèrement au-dessus du bouton
        fontSize={0.4}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        OK
      </Text>
    </group>
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
        <Button3D />
      </ARAnchor>
    </ARView>
  );
}

export default App;