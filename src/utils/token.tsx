import { devLog } from "./dev-log";

import Instance from "@/api/axios-instance";
import { AuthResponse } from "@/api/types/auth-type";

const getRefreshToken = async () => {
  try {
    const response = await Instance.post(
      `/auth-service/api/v2/auth/reissue`,
      {
        accessToken: localStorage.getItem("accessToken"),
        refreshToken: localStorage.getItem("refreshToken"),
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      },
    );

    const res = response.data as AuthResponse;
    devLog("res:", res);

    localStorage.setItem("accessToken", res.data.accessToken);
    localStorage.setItem("refreshToken", res.data.refreshToken);
    localStorage.setItem("userId", res.data.userId.toString());
    localStorage.setItem("nickName", res.data.nickName.toString());

    return res.data;
  } catch (e) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }
};

export default getRefreshToken;
