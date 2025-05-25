import React from "react";
import { createRoot } from "react-dom/client";

import { ARView, ARFaceMesh } from "react-three-mind";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <ARView>
    <ARFaceMesh>
      <meshBasicMaterial color="hotpink" wireframe />
    </ARFaceMesh>
  </ARView>
);