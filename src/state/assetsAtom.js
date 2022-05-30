import { atom } from "recoil";

const defaultState = {};

const assetsAtom = atom({
  key: "ASSETS",
  default: defaultState
});

export default assetsAtom;
