import { useRecoilState, useSetRecoilState } from "recoil";
import boardAtom from "./state/boardAtom";
import { v4 } from "uuid";

import GameObject from "./GameObject";
import Token from "./Token";
import turnAtom from "./state/turnAtom";
import coordAtom from "./state/coordAtom";
import useAsset from "./hooks/useAsset";

function Column(props) {
  const { index, column } = props;
  const { columnAsset } = useAsset();

  const [board, setBoard] = useRecoilState(boardAtom);
  const [value, setValue] = useRecoilState(turnAtom);
  const setCoords = useSetRecoilState(coordAtom);

  const x = columnAsset.args[0] * (index - 3);

  const position = [x, 0, -1];

  const copyBoard = () => {
    return board.map((column) => [...column]);
  };

  const getNextRow = () => {
    return board[index].indexOf(null);
  };

  const handleClick = () => {
    const row = getNextRow();
    const newBoard = copyBoard();

    newBoard[index][row] = { key: v4(), value: value };
    setValue(!value);

    setBoard(newBoard);

    setCoords({
      col: index,
      row: row + 1
    });
  };

  const handleHover = () => {
    setCoords({
      col: index,
      row: getNextRow()
    });
  };

  const meshProps = {
    onClick: handleClick,
    onPointerOver: handleHover
  };

  const geometryProps = {
    args: columnAsset.args
  };

  const materialProps = {
    transparent: true,
    opacity: 0
  };

  return (
    <GameObject
      position={position}
      mesh={meshProps}
      geometry={geometryProps}
      material={materialProps}
    >
      {column.map(
        (token, index) =>
          token && <Token key={index} index={index} token={token} />
      )}
    </GameObject>
  );
}

export default Column;
