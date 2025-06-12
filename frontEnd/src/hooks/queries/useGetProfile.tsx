import { useQuery } from "@tanstack/react-query";

import ProfileApi from "@/api/profile-api";
import { ProfileData } from "@/api/types/profile-type";

export const useGetProfile = (userId?: number) => {
  return useQuery<ProfileData>({
    queryKey: ["profile", userId],
    queryFn: async () => {
      const role = localStorage.getItem("role");
      const guestProfile = localStorage.getItem("guestProfile");

      if (role === "ROLE_USER" && guestProfile) {
        const parsedProfile = JSON.parse(guestProfile) as unknown;

        if (isValidProfileData(parsedProfile)) {
          return parsedProfile;
        }
        throw new Error("Invalid guest profile data");
      }

      return ProfileApi.getProfile(userId);
    },
  });
};

function isValidProfileData(data: unknown): data is ProfileData {
  if (!data || typeof data !== 'object') return false;

  const profile = data as Partial<ProfileData>;

  return (
    typeof profile.userId === 'number' &&
    typeof profile.nickName === 'string' &&
    (profile.gender === 'male' || profile.gender === 'female') &&
    typeof profile.address === 'string' &&
    typeof profile.birth === 'string' &&
    typeof profile.ageRange === 'number' &&
    typeof profile.accountNumber === 'string' &&
    typeof profile.profileImage === 'string' &&
    typeof profile.blocked === 'boolean' &&
    typeof profile.dealCount === 'number'
  );
}

//export const createGuestProfile = (): ProfileData => {
//  return {
//    userId: 0,
//    nickName: "게스트",
//    gender: "male",
//    address: "정릉 3동",
//    birth: "2000-01-01",
//    ageRange: 2,
//    accountNumber: "",
//    profileImage: "/icons/guest.png",
//    blocked: false,
//    dealCount: 0
//  };
//};
