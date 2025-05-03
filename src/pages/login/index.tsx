import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

import { ReactComponent as LoginIcon } from "@/assets/icons/login-icon.svg";
import { GoogleButton } from "@/components/login/google-button";
import { KakaoButton } from "@/components/login/kakao-button";
import { colorTheme } from "@/style/color-theme";
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

  const handleGuestLogin = () => {
    try {
      setIsLoading(true);
      
      const guestData = {
        accessToken: `guest_${Date.now()}`,
        refreshToken: `guest_refresh_${Date.now()}`,
        userId: `guest_${Date.now()}`,
        role: "ROLE_USER",
        nickName: "test",
        profileImage: "https://via.placeholder.com/150",
        gender: "male",
        address: "未设置",
        birth: "2000-01-01",
        ageRange: 20,
        dealCount: 0,
        blocked: false
      };


      localStorage.setItem("accessToken", guestData.accessToken);
      localStorage.setItem("refreshToken", guestData.refreshToken);
      localStorage.setItem("userId", guestData.userId);
      localStorage.setItem("role", guestData.role);
      localStorage.setItem("nickName", guestData.nickName);
      localStorage.setItem("isGuest", "true");
      localStorage.setItem("guestProfile", JSON.stringify(guestData));


      navigate("/post", { replace: true });
    } catch (error) {
      console.error("游客登录失败:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
        <Header>간편하게 로그인</Header>
        <LoginIcon width="5rem" />
        {isLoading ? (
          <LoadingText>로딩중입니다</LoadingText>
        ) : (
          <ButtonContainer>
            <GoogleButton setIsLoading={setIsLoading} />
            <KakaoButton />
            <GuestButton onClick={handleGuestLogin}>
              게스트 모드
            </GuestButton>
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
  align-items: center;
`;

const GuestButton = styled.button`
  width: 50vw;
  max-width: 200px;
  height: 45px;
  background-color: ${colorTheme.blue100};
  border: none;
  border-radius: 8px;
  color: ${colorTheme.blue700};
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${colorTheme.blue300};
    color: ${colorTheme.blue900};
  }

  &:active {
    transform: scale(0.98);
    background-color: ${colorTheme.blue500};
  }
`;

const LoadingText = styled.div`
  color: ${colorTheme.blue700};
  font-size: 1.2rem;
`;
