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
      <PostingAppBar 
        onCustomClick={handleSave} 
        nowPage={8}
        onPrevClick={handlePrev}
        onNextClick={handleFinish}
      />
      <PostingBoldText>{'활동 내용을\n작성해주세요'}</PostingBoldText>
      <PostingInput.InputContent
        value={content}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
          setContent(e.target.value);
        }}
      />
    </PageContainer>
  );
};
//활동 내용을 적어보세요-> {'활동 내용을\n작성해주세요'} 

const PageContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  white-space: pre-line;
  flex-direction: column;
  height: var(--app-height); // 📌 뷰포트 높이 대응
  overflow-y: auto;         // 📌 입력 시 스크롤 가능하게
  padding-bottom: 20px;     // 📌 버튼 영역만큼 여백 확보
`;
//white-space: pre-line; // 줄바꿈을 위해 추가