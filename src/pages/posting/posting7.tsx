import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";

import { BottomFixed } from "@/components/common/bottom-fixed";
import { PostingAppBar } from "@/components/posting/posting-app-bar";
import { PostingBoldText } from "@/components/posting/posting-bold-text";
import { PostingInput } from "@/components/posting/posting-input";
import { postingState } from "@/recoil/atoms/posting-state";
import { colorTheme } from "@/style/color-theme";

export const Posting7 = () => {
  const [posting, setPosting] = useRecoilState(postingState);
  const [title, setTitle] = useState(posting.title);
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  const handleSave = () => {
    setPosting((prevPosting) => {
      const updatedPosting = { ...prevPosting, title: title };
      return updatedPosting;
    });
  };

  useEffect(() => {
    if (isError && title !== "") {
      setIsError(false);
    }
  }, [title]);

  return (
    <PageContainer>
      <PostingAppBar onCustomClick={() => handleSave()} nowPage={7} />
      <PostingBoldText>활동 제목을 적어보세요</PostingBoldText>
      <PostingInput.InputTitle
        value={title}
        setValue={setTitle}
        isError={isError}
        setIsError={setIsError}
      />
      {isError && <ErrorMsg>활동 제목은 필수 항목입니다</ErrorMsg>}
      <BottomFixed alignDirection="row">
        <BottomFixed.Button
          color="blue"
          onClick={() => {
            handleSave();
            navigate(-1);
          }}
        >
          이전
        </BottomFixed.Button>
        <BottomFixed.Button
          color="blue"
          onClick={() => {
            if (!title.length) {
              setIsError(true);
              return;
            }
            console.log(posting);

            handleSave();
            navigate("/posting/8");
          }}
        >
          다음
        </BottomFixed.Button>
      </BottomFixed>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
`;

const ErrorMsg = styled.div`
  color: ${colorTheme.orange400};
  font-size: 1rem;
  text-align: center;
  font-weight: bold;
  line-height: 1.1rem;
  white-space: pre-line;
  margin-top: 1rem;
`;
