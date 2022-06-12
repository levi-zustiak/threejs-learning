import { useRef } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { v4 } from "uuid";

import gameAtom from "../state/gameAtom";
import placeholderAtom from "../state/placeholderAtom";
import useAsset from "../hooks/useAsset";
import useHelpers from "../hooks/useHelpers";

import GameObject from "../components/GameObject";
import Token from "./Token";

function Column(props) {
  const { index, column } = props;
  const { columnAsset } = useAsset();
  const { getNextRow, isAvailable } = useHelpers();
  const ref = useRef();

  const [game, setGame] = useRecoilState(gameAtom);
  const setPlaceholder = useSetRecoilState(placeholderAtom);
  const { board, turn } = game;

  const x = columnAsset.args[0] * (index - 3);

  const position = [x, 0, -1];

  const copyBoard = () => {
    return board.map((column) => [...column]);
  };

  const handleClick = async () => {
    if (isAvailable(index)) {
      const row = getNextRow(index);
      const newBoard = await copyBoard();

      newBoard[index][row] = { key: v4(), value: turn };

      setGame({
        ...game,
        turn: !turn,
        board: newBoard
      });
    }
  };

  const handleHover = () => {
    if (isAvailable(index)) {
      setPlaceholder({
        col: index,
        row: getNextRow(index)
      });
    }
  };

  const eventHandlers = {
    onClick: handleClick,
    onPointerOver: handleHover
  };

  return (
    <GameObject
      ref={ref}
      position={position}
      eventHandlers={eventHandlers}
      geometry={columnAsset.args}
    >
      {column.map(
        (token, index) =>
          token && <Token key={index} index={index} token={token} />
      )}
    </GameObject>
  );
}

export default Column;
