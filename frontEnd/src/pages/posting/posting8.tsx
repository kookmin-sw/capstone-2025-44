import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";

import { RequestPostingProps } from "@/api/types/post-type";
import { PostingAppBar } from "@/components/posting/posting-app-bar";
import { PostingBoldText } from "@/components/posting/posting-bold-text";
import { PostingInput } from "@/components/posting/posting-input";
import { usePostPosting } from "@/hooks/queries/usePostPosting";
import { postingState } from "@/recoil/atoms/posting-state";
import { FormatDateString } from "@/utils/format-date-string";

export const Posting8 = () => {
  const [posting, setPosting] = useRecoilState(postingState);
  const [content, setContent] = useState(posting.content);
  const navigate = useNavigate();
  const postPosting = usePostPosting();

  const handleSave = () => {
    setPosting((prevPosting) => {
      const updatedPosting = { ...prevPosting, content: content };
      return updatedPosting;
    });
  };

  const handlePrev = () => {
    handleSave();
    navigate(-1);
  };

  const handleFinish = () => {
    handleSave();
    handlePostPosting();
  };

  const handlePostPosting = () => {
    const tempProps: RequestPostingProps = {
      title: posting.title,
      content: content,
      startDate: FormatDateString(posting.startDate),
      location: posting.location,
      volunteerTime: posting.price,
      maxNumOfPeople: posting.memberNum,
      categoryId: posting.activityType.filter(
        (category) => category.state === true,
      )[0].id,
    };

    console.log(tempProps);

    postPosting.mutate(tempProps);
  };

  return (
    <PageContainer>
      <FixedAppBar>
        <PostingAppBar 
          onCustomClick={handleSave} 
          nowPage={8}
          onPrevClick={handlePrev}
          onNextClick={handleFinish}
        />
      </FixedAppBar>

      <ScrollContainer>
        <PostingBoldText>{'활동 내용을\n작성해주세요'}</PostingBoldText>
        <PostingInput.InputContent
          value={content}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
            setContent(e.target.value);
          }}
        />
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
  white-space: pre-line;
`;