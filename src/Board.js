import { useRef } from "react";
import { TextureLoader } from "three";
import { useLoader, useThree } from "@react-three/fiber";

import BoardSprite from "./Sprites/Board.png";

function Board() {
  const ref = useRef();
  const { viewport } = useThree();

  const texture = useLoader(TextureLoader, BoardSprite);

  return (
    <mesh ref={ref} position={[0, 0, 2]}>
      <planeBufferGeometry args={[viewport.width, viewport.height]} />
      <meshBasicMaterial attach="material" map={texture} transparent />
    </mesh>
  );
}

export default Board;
