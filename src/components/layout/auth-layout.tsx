import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ProfileLayout } from "./profile-layout";

export const AuthLayout = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const isGuest = localStorage.getItem("isGuest") === "true";
    
    // 如果没有token且不是游客，跳转到错误页面
    if (!token && !isGuest) {
      navigate("/error");
    }
  }, []);

  return <ProfileLayout>{children}</ProfileLayout>;
};
