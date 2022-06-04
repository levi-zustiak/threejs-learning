import GameObject from "./GameObject";

import Column from "./Column";
import useAsset from "./hooks/useAsset";

import { useRecoilValue } from "recoil";
import boardAtom from "./state/boardAtom";
import Placeholder from "./Placeholder";

function Board() {
  const board = useRecoilValue(boardAtom);
  const { boardAsset } = useAsset();

  const geometryProps = {
    args: boardAsset.args
  };

  const materialProps = {
    map: boardAsset.texture,
    transparent: true
  };

  return (
    <GameObject
      position={boardAsset.position}
      geometry={geometryProps}
      material={materialProps}
    >
      {board.map((column, i) => (
        <Column key={i} index={i} column={column} />
      ))}
      <Placeholder />
    </GameObject>
  );
}

export default Board;
