import React, { Dispatch, SetStateAction } from "react";

import { ProfileData } from "@/api/types/profile-type";

export type TimeType = "오전" | "오후" | "무관";

export type ActivityBoxContextType = {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  profileImage: string;
  setProfileImage: Dispatch<SetStateAction<string>>;
  time: TimeType | null;
  setTime: Dispatch<SetStateAction<TimeType | null>>;
  date: string;
  setDate: Dispatch<SetStateAction<string>>;
  location: string;
  setLocation: Dispatch<SetStateAction<string>>;
  memberNum: string;
  readOnly: boolean;
  setReadOnly: Dispatch<SetStateAction<boolean>>;
};

export type ToggleType = {
  state?: boolean;
  children: React.ReactNode;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type">;

export type InputType = {
  value: string | number;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  children?: React.ReactNode;
  isError?: boolean;
  setIsError?: React.Dispatch<React.SetStateAction<boolean>>;
};

export type BottomSheetProps = {
  children: React.ReactNode;
  onChangeIsOpened: () => void;
  isOpened: boolean;
} & Omit<React.HTMLAttributes<HTMLElement>, "type">;

export type SwitchToggleType = {
  firstText: string;
  secondText: string;
  onChangeSelected: (newValue: boolean) => void;
  isLeftSelected: boolean;
  selectBackColor?: string;
  notSelectBackColor?: string;
  selectTextColor?: string;
  notSelectTextColor?: string;
};

export type AppBarProps = {
  isFixed?: boolean;
  isColorMode?: boolean;
  isBorderExist?: boolean;
  isBigSizeText?: boolean;
  children?: React.ReactNode;
  isBack?: boolean;
  onCustomClick?: () => void;
} & Omit<React.HTMLAttributes<HTMLElement>, "type">;

export type RightButtonProps = {
  imgSrc: string;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type">;

export type MyProfileModalType = {
  profileData: ProfileData;
  onEdit: () => void;
  onClose: () => void;
};

export type ProfileModalType = {
  userId?: number;
  onClose: () => void;
};

export type InputWrapperProps = {
  children: React.ReactNode;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "type">;

export type InputInnerProps = {
  gap?: string;
  children: React.ReactNode;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  maximum: number;
  minimum?: number;
  isError: boolean;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
  isPrice?: boolean;
};
