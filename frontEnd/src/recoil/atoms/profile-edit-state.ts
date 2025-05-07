import { atom } from "recoil";

export const profileEditState = atom({
  key: "profileState",
  default: {
    nickName: "",
    birth: "",
    gender: "",
    address: "",
    fileByte: "",
  },
});
