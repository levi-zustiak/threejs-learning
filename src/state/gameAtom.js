import { atom } from "recoil";

const defaultState = {
  board: [
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null]
  ],
  turn: true
};

const gameAtom = atom({
  key: "GAME",
  default: defaultState
});

export default gameAtom;
