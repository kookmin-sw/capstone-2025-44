import React from "react";

export type MyChatType = {
  children?: React.ReactNode;
};

export type ChatItemType = {
  userId: number;
  imgurl?: string;
  userName: string;
  setProfileModal: React.Dispatch<React.SetStateAction<boolean>>;
  setProfileUserId: React.Dispatch<React.SetStateAction<number>>;
  setDeletedProfileModal: React.Dispatch<React.SetStateAction<boolean>>;
  date?: string;
  msg: string;
  creator: boolean;
};

export type InputType = {
  onFocus: React.Dispatch<React.SetStateAction<boolean>>;
  onClick: (inputValue: string) => void;
  blockedRoom?: boolean;
};

export type ChatRoomItemType = {
  roomId: string;
  postId: number;
  memberCount: number;
  postTitle: string;
  postStatus: string;
  time: string;
  chatMsg: string;
  msgNum: number;
  creatorId: string;
  startDate: string;
  location: string;
  creatorNickname: string;
  deletedPost: boolean;
  blockedRoom: boolean;
  creatorProfileImg: string;
};

export type ChatAppBarType = {
  setAppBarHeight: (value: number) => void;
  onClickTransfer: () => void;
  onClickReport: () => void;
  postId: string;
  setErrorModal: () => void;
  creatorId: string;
  onClickApply: () => void;
  memberCount: number;
  setTransferErrorModal: () => void;
  isEmpty: boolean;
};

export type ChatInRoomUser = {
  nickName: string;
  userId: number;
  profileImg: string;
  blocked: boolean;
};

export type ChatAppBarBlockProps = {
  setAppBarHeight: (value: number) => void;
  isDelted: boolean;
  isBlocked: boolean;
};
