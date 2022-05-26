import Board from "./Board";
import Column from "./Column";
import { useRecoilValue } from "recoil";
import boardAtom from "./state/boardAtom";

function Game() {
  const board = useRecoilValue(boardAtom);

  return (
    <group>
      <Board />
      {board.map((column, i) => (
        <Column key={i} index={i} column={column} />
      ))}
    </group>
  );
}

export default Game;
