import { useThree } from "@react-three/fiber";
import { useRecoilState } from "recoil";
import boardAtom from "./state/boardAtom";
import { v4 } from "uuid";

import GameObject from "./GameObject";
import Token from "./Token";
import turnAtom from "./state/turnAtom";

function Column(props) {
  const { index, column } = props;
  const { viewport } = useThree();

  const [board, setBoard] = useRecoilState(boardAtom);
  const [value, setValue] = useRecoilState(turnAtom);

  const width = viewport.width / 7.5;
  const x = width * (index - 3);

  const handleClick = () => {
    const row = board[index].indexOf(null);
    const newBoard = copyBoard();

    newBoard[index][row] = { key: v4(), value: value };
    setValue(!value);

    setBoard(newBoard);
  };

  const copyBoard = () => {
    return board.map((column) => [...column]);
  };

  const position = [x, 0, -1];

  const meshProps = {
    onClick: handleClick
  };

  const geometryProps = {
    args: [width, viewport.height]
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
