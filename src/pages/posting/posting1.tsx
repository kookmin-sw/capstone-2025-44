import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useResetRecoilState } from "recoil";
import { styled } from "styled-components";

import { InputBox } from "@/components/common/Input-box";
import { PostingAppBar } from "@/components/posting/posting-app-bar";
import { PostingBoldText } from "@/components/posting/posting-bold-text";
import { postingState } from "@/recoil/atoms/posting-state";
import { colorTheme } from "@/style/color-theme";

export const Posting1 = () => {
  const resetRecoil = useResetRecoilState(postingState);
  const [posting, setPosting] = useRecoilState(postingState);
  const [location, setLocation] = useState(posting.location);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleSave = () => {
    setPosting((prevPosting) => {
      const updatedPosting = { ...prevPosting, location: location };
      return updatedPosting;
    });
  };

  const handleNext = () => {
    if (!location.length) {
      setIsError(true);
      return;
    }
    handleSave();
    navigate("/posting/2");
  };

  useEffect(() => {
    if (isError && location !== "") {
      setIsError(false);
    }
  }, [location]);

  return (
    <PageContainer>
      <PostingAppBar 
        onCustomClick={() => resetRecoil()} 
        nowPage={1}
        onNextClick={handleNext}
      />
      <PostingBoldText>위치를 입력해 주세요</PostingBoldText>
      <InputBox.InputMap
        value={location}
        setValue={setLocation}
        setIsError={setIsError}
        isError={isError}
      />
      {isError && <ErrorMsg>위치 입력은 필수 항목입니다</ErrorMsg>}
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
  font-size: 1.7rem;
  text-align: center;
  font-weight: bold;
  line-height: 1.1rem;
  white-space: pre-line;
  margin-top: 2rem;
`;
//기존 1rem -> 1.7
//http://localhost:3000/posting/1 위치 입력은 필수 항목입니다 크기 조절