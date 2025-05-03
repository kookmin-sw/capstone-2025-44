import { useEffect, useState } from "react";
import { styled } from "styled-components";

import { ChatList } from "@/components/chat/chat-list";
import { ToggleSwitchVer2 } from "@/components/common/toggle-switch-ver2";
import { colorTheme } from "@/style/color-theme";

export const Chat = () => {
  const [appBarHeight, setAppBarHeight] = useState(0);
  const [type, setType] = useState(true);

  useEffect(() => {
    const element = document.getElementById("AppBar");
    if (element) {
      const height = element.offsetHeight;
      setAppBarHeight(height);
    }
  }, [setAppBarHeight]);

  return (
    <Wrapper style={{ paddingTop: `${appBarHeight}px` }}>
      <HeaderWrapper>
        <PageText>채팅</PageText>
      </HeaderWrapper>
      <HeaderSwitchWrapper>
        <ToggleSwitchVer2
          firstText="진행중"
          secondText="진행완료"
          isLeftSelected={type}
          onChangeSelected={setType}
          notSelectBackColor={colorTheme.blue900}
        />
      </HeaderSwitchWrapper>
      <ChatList
        type={type ? "RECRUITMENT_COMPLETED" : "TRANSACTION_COMPLETED"}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
  overflow: auto;
  height: 100%;
`;

const PageText = styled.div`
  color: black;
  font-size: 1.78rem;
  width: 100%;
  padding: 1.39rem 7.95% 0.56rem;
  font-weight: 500;
  vertical-align: bottom;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  height: 5.56rem;
  padding: 0.83rem 1.07rem;
  background-color: ${colorTheme.blue100};
`;

const HeaderSwitchWrapper = styled.div`
  width: 100%;
  background-color: ${colorTheme.blue100};
  border-bottom: 1px solid #d9d9d9;
`;
