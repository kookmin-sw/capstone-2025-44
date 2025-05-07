import Instance from "./axios-instance";
import { FinalResponse } from "./types/common-type";

export class FcmApi {
  static async postFcmToken(fcmToken: string) {
    const response = await Instance.post("/auth-service/api/v2/notification", {
      fcmToken,
    });

    if (response) {
      return response.data as FinalResponse;
    } else {
      throw new Error("Invalid response from server");
    }
  }
}
