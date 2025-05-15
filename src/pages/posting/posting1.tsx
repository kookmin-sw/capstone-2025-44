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

  const handlePrev = () => {
    handleSave();
    navigate(-1);
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
      <FixedAppBar>
        <PostingAppBar
          onCustomClick={() => resetRecoil()}
          nowPage={1}
          onPrevClick={handlePrev}
          onNextClick={handleNext}
        />
      </FixedAppBar>

      <ScrollContainer>
        <PostingBoldText>위치를 입력해 주세요</PostingBoldText>
        <InputBox.InputMap
          value={location}
          setValue={setLocation}
          setIsError={setIsError}
          isError={isError}
        />
        {isError && <ErrorMsg>위치 입력은 필수 항목입니다</ErrorMsg>}
      </ScrollContainer>
    </PageContainer>
  );
};

const FixedAppBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  background-color: white;
  border-bottom: 1px solid #eee;
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  padding-top: 6.44rem;
`;

const ScrollContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
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