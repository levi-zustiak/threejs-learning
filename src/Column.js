import { useThree } from "@react-three/fiber";
import { useRecoilState } from "recoil";
import boardAtom from "./state/boardAtom";
import { v4 } from "uuid";

import Token from "./Token";
import turnAtom from "./state/turnAtom";

function Column(props) {
  const [board, setBoard] = useRecoilState(boardAtom);
  const [value, setValue] = useRecoilState(turnAtom);
  const { index, column } = props;
  const { viewport } = useThree();

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

  return (
    <group>
      <mesh onClick={handleClick} position={[x, 0, 0]}>
        <planeBufferGeometry args={[width, viewport.height]} />
        <meshBasicMaterial attach="material" transparent opacity={0} />
        {column.map(
          (token, index) =>
            token && <Token key={index} index={index} token={token} />
        )}
      </mesh>
    </group>
  );
}

export default Column;
