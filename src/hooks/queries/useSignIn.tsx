import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import AuthApi from "@/api/auth-api";
import { devLog } from "@/utils/dev-log";

export const useSignIn = () => {
  const navigate = useNavigate();
  
  return useMutation({
    mutationFn: async (data: { 
      type: string; 
      token?: string;
      email?: string;
      password?: string;
    }) => {
      try {
        let response;
        if (data.type === "local") {
          response = await AuthApi.postSignInLocal(
            data.email || "", 
            data.password || ""
          );
        } else {
          response = await AuthApi.postSignIn(data.type, data.token || "");
        }
        devLog("登录API响应:", response);
        return response;
      } catch (error) {
        devLog("登录API错误:", error);
        throw error;
      }
    },
    onSuccess: (response) => {
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);
      localStorage.setItem("userId", response.userId.toString());
      localStorage.setItem("role", response.role);
      localStorage.setItem("nickName", response.nickName);
      
      sessionStorage.removeItem("isLoading");
      
      devLog("登录成功，设置的数据:", {
        accessToken: response.accessToken,
        role: response.role,
        userId: response.userId,
        nickName: response.nickName
      });
    },
    onError: (error) => {
      devLog("登录失败:", error);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      sessionStorage.removeItem("isLoading");
    }
  });
};
