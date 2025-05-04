import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";

import { BottomFixed } from "@/components/common/bottom-fixed";
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

  useEffect(() => {
    if (isError) setIsError(false);
  }, [typeState]);

  return (
    <PageContainer>
      <PostingAppBar onCustomClick={() => handleSave()} nowPage={6} />
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
            if (typeState.filter((category) => category.state).length === 0) {
              setIsError(true);
              return;
            }
            handleSave();
            navigate("/posting/7");
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
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 4.07%;
  width: 83.07%;
  margin: 0px 0px 150px 0px;
`;

const ErrorMsg = styled.div`
  color: ${colorTheme.orange400};
  font-size: 1rem;
  text-align: center;
  font-weight: bold;
  line-height: 1.1rem;
  white-space: pre-line;
  margin-bottom: 1rem;
`;
