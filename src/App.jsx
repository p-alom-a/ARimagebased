import { ARAnchor, ARView } from "react-three-mind"
import { useRef, useEffect, useState } from "react"
import * as THREE from "three"
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js"
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js"

function Plane(props) {
  return (
    <mesh {...props}>
      <boxGeometry args={[1, 1, 0.1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  )
}

function Button3D(props) {
  const meshRef = useRef()
  const textRef = useRef()
  const [font, setFont] = useState(null)

  // Charge la police une seule fois
  useEffect(() => {
    const loader = new FontLoader()
    loader.load(
      "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json",
      (loadedFont) => {
        setFont(loadedFont)
      }
    )
  }, [])

  // Met à jour la géométrie du texte quand la police est chargée
  useEffect(() => {
    if (!font) return

    const geometry = new TextGeometry("OK", {
      font: font,
      size: 0.15,
      height: 0.05,
      curveSegments: 12,
      bevelEnabled: false,
    })

    geometry.center() // Centre le texte

    if (textRef.current) {
      textRef.current.geometry.dispose()
      textRef.current.geometry = geometry
    }
  }, [font])

  const handleClick = () => {
    alert("OK cliqué !")
  }

  return (
    <group {...props}>
      {/* Plan bleu cliquable */}
      <mesh ref={meshRef} onClick={handleClick}>
        <boxGeometry args={[0.5, 0.5, 0.1]} />
        <meshStandardMaterial color="blue" />
      </mesh>

      {/* Texte 3D "OK" */}
      <mesh
        ref={textRef}
        position={[0, 0, 0.1]} // Un peu devant le plan
      >
        {/* Géométrie créée dynamiquement */}
        <meshStandardMaterial color="white" />
      </mesh>
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
        <Plane />
      </ARAnchor>

      <ARAnchor target={1}>
        <Button3D />
      </ARAnchor>
    </ARView>
  )
}

export default App
