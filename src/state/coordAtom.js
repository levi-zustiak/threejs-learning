import { atom } from "recoil";

const coordAtom = atom({
  key: "COORD",
  default: { col: 3, row: 0 }
});

export default coordAtom;
