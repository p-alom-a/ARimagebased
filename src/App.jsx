import React from "react";
import { createRoot } from "react-dom/client";

import { ARView, ARFaceMesh } from "react-three-mind";
 function App() {
  return (
      <ARView>
    <ARFaceMesh>
      <meshBasicMaterial color="hotpink" wireframe />
    </ARFaceMesh>
  </ARView>
  )



   }
;

export default App;