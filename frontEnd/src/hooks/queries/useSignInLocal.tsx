import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import AuthApi from "@/api/auth-api";
import { devLog } from "@/utils/dev-log";

export const useSignInLocal = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      AuthApi.postSignInLocal(data.email, data.password),
    onSuccess: (response) => {
      devLog("로그인 성공", response.accessToken);
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);
      localStorage.setItem("userId", response.userId.toString());
      localStorage.setItem("role", response.role);
      // if (response.role !== "ROLE_USER") {
      //   navigate("/signup");
      // } else {
      //   navigate("/post");
      // }
      navigate("/post");
    },
  });
};
