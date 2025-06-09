import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

import { ReactComponent as LoginIcon } from "@/assets/icons/login-icon.svg";
import { GoogleButton } from "@/components/login/google-button";
import { KakaoButton } from "@/components/login/kakao-button";
import { colorTheme } from "@/style/color-theme";
import { createGuestProfile } from '@/hooks/queries/useGetProfile';
// import { devLog } from "@/utils/dev-log";
// import { Modal } from "@/components/common/modal";

type ChoiceResultType = {
  outcome: "accepted" | "rejected";
};

type PromptType = {
  prompt: () => void;
  userChoice: Promise<ChoiceResultType>;
} & Event;

export const LoginPage = () => {
  // const [ready, _] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  // Not used
  const [_, setDeferredPrompt] = useState<PromptType | null>(null);

  const handleBeforeInstallPrompt = (event: Event) => {
    event.preventDefault();

    setDeferredPrompt(event as PromptType);
  };

  // Not Yet
  // const handleInstall = () => {
  //   if (deferredPrompt) {
  //     deferredPrompt.prompt();

  //     void deferredPrompt.userChoice.then((choiceResult: ChoiceResultType) => {
  //       if (choiceResult.outcome === "accepted") {
  //         devLog("");
  //       } else {
  //         devLog("사용자가 앱 설치를 동의하지 않았습니다.");
  //       }

  //       setDeferredPrompt(null);
  //     });
  //   }
  // };

  // guest모드
  const handleGuestLogin = () => {

    const guestProfile = createGuestProfile();


    localStorage.setItem("accessToken", "guest_token");
    localStorage.setItem("refreshToken", "guest_refresh_token");
    localStorage.setItem("userId", "0");
    localStorage.setItem("role", "ROLE_USER");
    localStorage.setItem("nickName", guestProfile.nickName);
    
 
    localStorage.setItem("guestProfile", JSON.stringify(guestProfile));
    

    navigate("/post");
  };

  useEffect(() => {
    if (sessionStorage.getItem("isLoading") === "true") setIsLoading(true);
  }, []);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
    };
  }, []);

  return (
    <Layout>
      <Content>
        {/** TODO: 모바일 환경 테스팅, 현재는 데스크탑에서만 동작함.  */}
        {/* <div>
          {deferredPrompt && (
            <Button color="orange" onClick={handleInstall}>
              간편설치
            </Button>
          )}
        </div> */}
        <Header>로그인</Header>
        <LoginIcon width="5rem" />
        {isLoading ? (
          <>로딩중입니다</>
        ) : (
          <ButtonContainer>
            <GoogleButton setIsLoading={setIsLoading} />
            <KakaoButton />
            {/* 
            <GuestButton onClick={handleGuestLogin}>
              게스트
            </GuestButton>
            */}
          </ButtonContainer>
        )}
      </Content>
      {/* {ready && (
        for block
        <Modal onClose={() => devLog("blodk")}>
          <Modal.Title text="지금 서비스를\n재정비중이에요!\n\n내일 오전 6시 이후\n다시 접속부탁드려요🤗" />
        </Modal>
      )} */}
    </Layout>
  );
};

const Layout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  max-width: 480px;
  margin: auto;
  font-size: 0.88rem;
  background-color: #ffffff;
`;

const Content = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.78rem;
`;

const Header = styled.h2`
  font-size: 1.67rem;
  color: ${colorTheme.orange400};
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;


const GuestButton = styled.button`
  width: 50vw;
  max-width: 200px;
  height: 40px;
  background-color: #f0f0f0;
  border: none;
  border-radius: 8px;
  color: #666;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e0e0e0;
  }
`;
