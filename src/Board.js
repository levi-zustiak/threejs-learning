import { useThree } from "@react-three/fiber";
import GameObject from "./GameObject";

import Column from "./Column";
import useAsset from "./hooks/useAsset";

import { useRecoilValue } from "recoil";
import boardAtom from "./state/boardAtom";

function Board() {
  const { viewport } = useThree();
  const board = useRecoilValue(boardAtom);
  const { boardSprite } = useAsset();

  const position = [0, 0, 2];

  const geometryProps = {
    args: [viewport.width, viewport.height]
  };

  const materialProps = {
    map: boardSprite,
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
