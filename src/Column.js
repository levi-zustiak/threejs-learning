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

  const getNextRow = (col) => {
    return board[col].indexOf(null);
  };

  const getPlaceholderCoords = (row) => {
    if (row === -1) {
      let i = 2,
        j = 4;

      while (true) {
        if (getNextRow(i) !== -1) {
          console.log(i);
          setCoords({
            col: i,
            row: getNextRow(i)
          });
          break;
        } else if (getNextRow(j) !== -1) {
          setCoords({
            col: j,
            row: getNextRow(j)
          });
          break;
        } else if (i <= -1) {
          break;
        } else {
          i--;
          j++;
        }
      }
      //for i = index - 1 j = index + 1;
      //if i === length + 1 or -1 break or getRow
      //else getNextRow(value)
    } else {
      setCoords({
        col: index,
        row: row + 1
      });
    }
  };

  const handleClick = () => {
    const row = getNextRow(index);
    const newBoard = copyBoard();

    newBoard[index][row] = { key: v4(), value: value };
    setValue(!value);

    setBoard(newBoard);

    getPlaceholderCoords(row);
  };

  const handleHover = () => {
    setCoords({
      col: index,
      row: getNextRow(index)
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
