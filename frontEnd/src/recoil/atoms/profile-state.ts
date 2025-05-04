import { atom } from "recoil";

export const profileState = atom({
  key: "profileState",
  default: {
    nickName: "",
    name: "",
    birth: "",
    gender: "",
    address: "",
    file: "",
    fileByte: "",
  },
});
