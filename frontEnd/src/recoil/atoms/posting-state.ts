import { atom } from "recoil";

const today = new Date();

export const postingState = atom({
  key: "postingState",
  default: {
    activityType: [
      { id: 1, name: "이동", state: false },
      { id: 2, name: "심부름", state: false },
      { id: 3, name: "교육", state: false },
      { id: 4, name: "장소", state: false },
      { id: 5, name: "돌봄", state: false },
      { id: 6, name: "수리", state: false },
      { id: 7, name: "기타", state: false },
    ],
    title: "",
    content: "",
    profileImage: "",
    dateType: "",
    startDate: today,
    endDate: "",
    location: "",
    memberNum: 1,
    price: 30,
    slot: "",
    startDateSave: false,
    startTimeSave: false,
  },
});
