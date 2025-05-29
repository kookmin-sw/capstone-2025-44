import { useLocation, useNavigate } from "react-router-dom";
import { useResetRecoilState } from "recoil";
import { styled } from "styled-components";

import { AppBar } from "@/components/common/app-bar";
import { PostingBoldText } from "@/components/posting/posting-bold-text";
import { postingState } from "@/recoil/atoms/posting-state";
import { colorTheme } from "@/style/color-theme";

export const Posting9 = () => {
  const location = useLocation();
  const state = location.state as { postId: number };
  const resetRecoil = useResetRecoilState(postingState);
  const navigate = useNavigate();

  const handleViewPost = () => {
    resetRecoil();
    navigate(`/post/${state.postId}`, { state: { replace: "/post" } });
  };

  return (
    <PageContainer>
      <AppBar>
        <AppBar.AppBarNavigate>
          <AppBar.BackButton
            onCustomClick={() => {
              resetRecoil();
              localStorage.removeItem("postId");
              navigate(`/post/${state.postId}`, {
                state: { replace: "/post" },
              });
            }}
            isBack={false}
          />
          <div style={{ width: "30px" }}></div>
          <CompleteButton onClick={handleViewPost}>
            게시물 보러가기
          </CompleteButton>
        </AppBar.AppBarNavigate>
      </AppBar>
      <PostingBoldText style={{ marginTop: "50px" }}>
        게시물이
        <br />
        완성되었습니다!
      </PostingBoldText>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
  padding-bottom: 20px;
`;

const CompleteButton = styled.button`
  background: none;
  border: none;
  color: ${colorTheme.orange400};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  padding: 5px 10px;
  min-width: 110px;
  text-align: center;
`;