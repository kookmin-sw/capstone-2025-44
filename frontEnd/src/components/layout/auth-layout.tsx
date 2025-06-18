import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ProfileLayout } from "./profile-layout";

export const AuthLayout = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) navigate("/error");
  }, []);


  //게스트 모드

  // useEffect(() => {
  //   const token = localStorage.getItem("accessToken");
  //   const role = localStorage.getItem("role");

  //   if (!token || (role !== "ROLE_GUEST" && role !== "ROLE_USER")) {
  //     navigate("/error");
  //   }
  // }, []);

  return <ProfileLayout>{children}</ProfileLayout>;
};
