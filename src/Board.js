import { useEffect, useRef } from "react";
import { TextureLoader } from "three";
import { useLoader, useThree } from "@react-three/fiber";
import GameObject from "./GameObject";

import Column from "./Column";
import BoardSprite from "./Sprites/Board.png";

import { useRecoilValue } from "recoil";
import boardAtom from "./state/boardAtom";

function Board() {
  const { viewport } = useThree();
  const board = useRecoilValue(boardAtom);

  const texture = useLoader(TextureLoader, BoardSprite);

  const position = [0, 0, 2];

  const geometryProps = {
    args: [viewport.width, viewport.height]
  };

  const materialProps = {
    map: texture,
    transparent: true
  };

  return (
    <GameObject
      position={position}
      geometry={geometryProps}
      material={materialProps}
    >
      {board.map((column, i) => (
        <Column key={i} index={i} column={column} />
      ))}
    </GameObject>
  );
}

export default Board;
