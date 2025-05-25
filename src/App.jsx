import { ARAnchor, ARView } from "react-three-mind";

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
      <meshPhysicalMaterial 
        color="blue" 
        roughness={0} 
        transmission={1} 
        thickness={0.5} 
      />
    </mesh>
  );
}

function GlassCard() {
  return (
    <div style={{
      position: 'absolute',
      top: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '300px',
      padding: '20px',
      borderRadius: '15px',
      background: 'rgba(255, 255, 255, 0.15)',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      color: 'white',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
      zIndex: 10,
    }}>
      <h2>Glassmorphism Card</h2>
      <p>Ceci est une carte en verre devant la scène AR.</p>
    </div>
  );
}

function App() {
  return (
    <>
      <ARView
        imageTargets="https://p-alom-a.github.io/ARimagebased/targets-multiUN.mind"
        filterMinCF={0.001}
        filterBeta={1000}
        missTolerance={5}
        warmupTolerance={5}
        flipUserCamera={false}
        style={{ position: 'relative', width: '100vw', height: '100vh' }}
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

      <GlassCard />
    </>
  );
}

export default App;
