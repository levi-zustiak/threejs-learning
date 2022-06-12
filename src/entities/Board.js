import { useRef } from "react";
import { useRecoilValue } from "recoil";

import useAsset from "../hooks/useAsset";

import Column from "./Column";
import Placeholder from "./Placeholder";
import GameObject from "../components/GameObject";

import gameAtom from "../state/gameAtom";

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
