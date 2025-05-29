import { useMutation } from "@tanstack/react-query";

import { FcmApi } from "@/api/fcm-api";

export function usePostFcmToken() {
  return useMutation({
    mutationFn: (token: string) => FcmApi.postFcmToken(token),
  });
}
