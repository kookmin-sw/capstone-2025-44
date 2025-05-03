import {
  getRedirectResult,
  GoogleAuthProvider,
  signInWithRedirect,
} from "firebase/auth";
import { Dispatch, SetStateAction, useEffect } from "react";

import { ReactComponent as GoogleLoginButtonSVG } from "@/assets/icons/google-login-button.svg";
import { useSignIn } from "@/hooks/queries/useSignIn";
import { auth } from "@/lib/firebase";
import { devLog } from "@/utils/dev-log";

export const GoogleButton = ({
  setIsLoading,
}: {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}) => {
  const { mutateAsync: signInBack } = useSignIn();

  const signIn = async () => {
    setIsLoading(true);
    sessionStorage.setItem("isLoading", "true");
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account",
    });
    await signInWithRedirect(auth, provider);
  };

  useEffect(() => {
    void getRedirectResult(auth)
      .then(async function (result) {
        if (result?.user) {
          const token = await result.user.getIdToken();
          devLog("IdToken", token);
          await signInBack({ type: "firebase", token });
        } else {
          setIsLoading(false);
          sessionStorage.removeItem("isLoading");
        }
      })
      .catch(function (error) {
        devLog(error);
      });
  }, []);

  return (
    <>
      <div
        style={{ width: "50vw", maxWidth: "200px" }}
        onClick={() => void signIn()}
      >
        <GoogleLoginButtonSVG />
      </div>
    </>
  );
};
