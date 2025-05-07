import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import AuthApi from "@/api/auth-api";

export const useWithdrawal = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: () => AuthApi.postWithdrawal(),
    onSuccess: () => {
      localStorage.clear();
      sessionStorage.clear();
      navigate("/");
    },
  });
};
