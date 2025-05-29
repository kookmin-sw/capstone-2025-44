import Instance from "./axios-instance";
import { AuthResponse } from "./types/auth-type";

import { devLog } from "@/utils/dev-log";

export default class AuthApi {
  static async postSignIn(type: string, token: string) {
    const response = await Instance.post(
      `/auth-service/api/v2/auth/signin/${type}`,
      { token: token, fcmToken: "" },
    );

    devLog(response);
    const res = response.data as AuthResponse;
    return res.data;
  }

  static async postSignInLocal(email: string, password: string) {
    const response = await Instance.post(
      `/auth-service/api/v2/auth/signin/local`,
      { email: email, password: password },
    );

    devLog(response);
    const res = response.data as AuthResponse;
    return res.data;
  }

  static async postSignOut() {
    const response = await Instance.post(`/auth-service/api/v2/logOut`);

    devLog(response);
    return response;
  }

  static async postWithdrawal() {
    const response = await Instance.post(
      `/haetsal-service/api/v2/user/withdrawal`,
    );

    devLog(response);
    return response;
  }
}
