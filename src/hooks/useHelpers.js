import { useRecoilValue } from "recoil";
import gameAtom from "../state/gameAtom";

function useHelpers() {
  const { board } = useRecoilValue(gameAtom);

  const isAvailable = (i) => {
    return board[i].includes(null);
  };

  const getNextRow = (col) => {
    return board[col].indexOf(null);
  };

  return {
    isAvailable,
    getNextRow
  };
}

export default useHelpers;
