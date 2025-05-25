import { ARAnchor, ARView } from "react-three-mind";

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
        <meshPhysicalMaterial 
          color="blue" 
          roughness={0} 
          transmission={1} 
          thickness={0.5} 
        />
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
        <Plane />
      </ARAnchor>
      <ARAnchor target={1}>
        <PlaneTwo />
      </ARAnchor>
    </ARView>
  );
}

export default App;