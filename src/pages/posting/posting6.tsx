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
      <PostingAppBar 
        onCustomClick={handleSave} 
        nowPage={6}
        onPrevClick={handlePrev}
        onNextClick={handleNext}
      />
      <ScrollContainer>
        <PostingBoldText>항목을 선택해주세요</PostingBoldText>
        {isError && <ErrorMsg>항목선택은 필수입니다</ErrorMsg>}
        <Grid>
          {typeState.map((item, index) => (
            <PostingCategoryButton
              key={index}
              state={item.state}
              onClick={() => {
                setTypeState((prevTypeState) => {
                  const updatedTypeState = prevTypeState.map(
                    (prevStateItem, idx) => {
                      if (idx === index) {
                        return {
                          ...prevStateItem,
                          state: !prevStateItem.state,
                        };
                      } else {
                        return { ...prevStateItem, state: false };
                      }
                    },
                  );
                  return updatedTypeState;
                });
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

const PageContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  flex-direction: column;
`;

const ScrollContainer = styled.div`
  overflow: auto;
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
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
//기존 1rem -> 1.7
//http://localhost:3000/posting/6 항목선택은 필수입니다 크기 조절