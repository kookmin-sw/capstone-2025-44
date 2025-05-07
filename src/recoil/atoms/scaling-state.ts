import { atom } from "recoil";

export const scalingState = atom<{
  scale: number;
}>({
  key: "scalingState",
  default: {
    scale: 1.0,
  },
});
