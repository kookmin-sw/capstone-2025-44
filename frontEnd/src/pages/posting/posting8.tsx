import { ChangeEvent, useState } from "react";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";

import { RequestPostingProps } from "@/api/types/post-type";
import { BottomFixed } from "@/components/common/bottom-fixed";
import { PostingAppBar } from "@/components/posting/posting-app-bar";
import { PostingBoldText } from "@/components/posting/posting-bold-text";
import { PostingInput } from "@/components/posting/posting-input";
import { usePostPosting } from "@/hooks/queries/usePostPosting";
import { postingState } from "@/recoil/atoms/posting-state";
import { FormatDateString } from "@/utils/format-date-string";

export const Posting8 = () => {
  const [posting, setPosting] = useRecoilState(postingState);
  const [content, setContent] = useState(posting.content);
  const postPosting = usePostPosting();

  const handleSave = () => {
    setPosting((prevPosting) => {
      const updatedPosting = { ...prevPosting, content: content };
      return updatedPosting;
    });
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
      <PostingAppBar onCustomClick={() => handleSave()} nowPage={8} />
      <PostingBoldText>활동 내용을 적어보세요</PostingBoldText>
      <PostingInput.InputContent
        value={content}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
          setContent(e.target.value);
        }}
      />
      <BottomFixed>
        <BottomFixed.Button
          color="orange"
          onClick={() => {
            handleSave();
            handlePostPosting();
          }}
        >
          게시물 만들기
        </BottomFixed.Button>
      </BottomFixed>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  
  height: var(--app-height); // 📌 뷰포트 높이 대응
  overflow-y: auto;         // 📌 입력 시 스크롤 가능하게
  padding-bottom: 120px;    // 📌 버튼 영역만큼 여백 확보
`;
