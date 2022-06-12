import { useRef } from "react";

import GameObject from "./GameObject";

import Column from "./Column";
import useAsset from "./hooks/useAsset";

import { useRecoilValue } from "recoil";
import gameAtom from "./state/gameAtom";
import Placeholder from "./Placeholder";

function Board() {
  const { board } = useRecoilValue(gameAtom);
  const { boardAsset } = useAsset();
  const ref = useRef();

  return (
    <GameObject
      ref={ref}
      position={boardAsset.position}
      geometry={boardAsset.args}
      texture={boardAsset.texture}
    >
      {board.map((column, i) => (
        <Column key={i} index={i} column={column} />
      ))}
      <Placeholder />
    </GameObject>
  );
}

export default Board;
