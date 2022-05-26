import { atom } from "recoil";

const turnAtom = atom({
  key: "TURN",
  default: true
});

export default turnAtom;
