import { useMutation } from "@tanstack/react-query";

import ProfileApi from "@/api/profile-api";
import { ProfilePutRequest } from "@/api/types/profile-type";
import { queryClient } from "@/index";
import { devLog } from "@/utils/dev-log";

export function useEditProfile() {
  return useMutation({
    mutationFn: (eProfile: ProfilePutRequest) =>
      ProfileApi.editProfile(eProfile),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["myProfile"] });
    },
    onError: (e) => {
      devLog(e);
    },
  });
}
