import { useQuery } from "@tanstack/react-query";
import { ProfileData } from "@/api/types/profile-type";
import ProfileApi from "@/api/profile-api";

export const useGetProfile = (userId?: number) => {
  return useQuery<ProfileData>({
    queryKey: ["profile", userId],
    queryFn: async () => {
      // 检查是否是游客
      const isGuest = localStorage.getItem("isGuest") === "true";
      
      if (isGuest) {
        const guestProfile = localStorage.getItem("guestProfile");
        if (guestProfile) {
          return JSON.parse(guestProfile) as ProfileData;
        }
      }
      
      // 非游客则调用正常的 API
      return ProfileApi.getProfile(userId);
    },
    // 游客模式下禁用自动重新获取
    refetchOnWindowFocus: !localStorage.getItem("isGuest"),
  });
};
