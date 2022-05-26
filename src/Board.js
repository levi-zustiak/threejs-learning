import { useEffect, useRef } from "react";
import { TextureLoader } from "three";
import { useLoader, useThree } from "@react-three/fiber";

import Column from "./Column";
import BoardSprite from "./Sprites/Board.png";

import { useRecoilValue } from "recoil";
import boardAtom from "./state/boardAtom";

function Board() {
  const ref = useRef();
  const { viewport } = useThree();
  const board = useRecoilValue(boardAtom);

  const texture = useLoader(TextureLoader, BoardSprite);

  useEffect(() => {
    console.log("rendered");
  }, []);

  return (
    <mesh ref={ref} position={[0, 0, 2]}>
      <planeBufferGeometry args={[viewport.width, viewport.height]} />
      <meshBasicMaterial attach="material" map={texture} transparent />
      {board.map((column, i) => (
        <Column key={i} index={i} column={column} />
      ))}
    </mesh>
  );
}

export default Board;
