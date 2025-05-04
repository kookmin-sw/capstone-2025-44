import { FinalResponse } from "./common-type";

export type ProfileData = {
  userId: number;
  nickName: string;
  gender: "male" | "female";
  address: string;
  birth: string;
  ageRange: number;
  accountNumber: string;
  profileImage: string;
  blocked: boolean;
  dealCount: number;
};

export type ProfileGetResponse = FinalResponse<ProfileData>;

export type ProfilePostRequest = {
  nickName: string;
  name: string;
  birth: string;
  gender: string;
  address: string;
  fileByte: string;
};

export type ProfilePostResponse = FinalResponse<{
  userId: number;
  nickName: string;
  gender: string;
  address: string;
  ageRange: number;
  accountNumber: string;
  profileImage: string;
  tokenInfo: {
    grantType: string;
    accessToken: string;
    refreshToken: string;
    refreshTokenExpirationTime: number;
    role: string;
  };
}>;

export type ProfilePutRequest = {
  nickName: string;
  birth: string;
  gender: string;
  address: string;
  fileByte: string | null;
};
