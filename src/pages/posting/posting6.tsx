import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";

import { PostingAppBar } from "@/components/posting/posting-app-bar";
import { PostingBoldText } from "@/components/posting/posting-bold-text";
import { PostingCategoryButton } from "@/components/posting/posting-category-button";
import { postingState } from "@/recoil/atoms/posting-state";
import { colorTheme } from "@/style/color-theme";

export const Posting6 = () => {
  const [posting, setPosting] = useRecoilState(postingState);
  const [typeState, setTypeState] = useState(posting.activityType);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleSave = () => {
    setPosting((prevPosting) => {
      const updatedPosting = { ...prevPosting, activityType: typeState };
      return updatedPosting;
    });
  };

  const handlePrev = () => {
    handleSave();
    navigate(-1);
  };

  const handleNext = () => {
    if (typeState.filter((category) => category.state).length === 0) {
      setIsError(true);
      return;
    }
    handleSave();
    navigate("/posting/7");
  };

  useEffect(() => {
    if (isError) setIsError(false);
  }, [typeState]);

  return (
    <PageContainer>
      <FixedAppBar>
        <PostingAppBar
          onCustomClick={handleSave}
          nowPage={6}
          onPrevClick={handlePrev}
          onNextClick={handleNext}
        />
      </FixedAppBar>

      <ScrollContainer>
        <PostingBoldText>항목을 선택해주세요</PostingBoldText>
        {isError && <ErrorMsg>항목선택은 필수입니다</ErrorMsg>}
        <Grid>
          {typeState.map((item, index) => (
            <PostingCategoryButton
              key={index}
              state={item.state}
              onClick={() => {
                setTypeState((prevTypeState) =>
                  prevTypeState.map((prevItem, idx) =>
                    idx === index
                      ? { ...prevItem, state: !prevItem.state }
                      : { ...prevItem, state: false }
                  )
                );
              }}
              category={item.id}
            >
              {item.name}
            </PostingCategoryButton>
          ))}
        </Grid>
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
  border-bottom: 1px solid ${colorTheme.blue100};
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
  padding-bottom: 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 4.07%;
  width: 83.07%;
  margin: 0;
`;

const ErrorMsg = styled.div`
  color: ${colorTheme.orange400};
  font-size: 1.7rem;
  text-align: center;
  font-weight: bold;
  line-height: 1.1rem;
  white-space: pre-line;
  margin-bottom: 1rem;
`;