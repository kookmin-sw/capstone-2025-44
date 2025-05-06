import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import AuthApi from "@/api/auth-api";
import { auth } from "@/lib/firebase";

export const useSignOut = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: () => AuthApi.postSignOut(),
    onSuccess: async () => {
      await auth.signOut();
      localStorage.clear();
      sessionStorage.clear();
      navigate("/");
    },
  });
};
