import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";

import { PostingAppBar } from "@/components/posting/posting-app-bar";
import { PostingBoldText } from "@/components/posting/posting-bold-text";
import { PostingDatePicker } from "@/components/posting/posting-date-picker";
import { postingState } from "@/recoil/atoms/posting-state";

export const Posting2 = () => {
  const [posting, setPosting] = useRecoilState(postingState);
  const [startDate, setStartDate] = useState(
    posting.startDateSave ? posting.startDate : new Date(),
  );

  const navigate = useNavigate();

  const handleSave = () => {
    setPosting((prevPosting) => {
      const updatedPosting = {
        ...prevPosting,
        startDate: startDate,
        startDateSave: true,
      };
      return updatedPosting;
    });
  };

  const handlePrev = () => {
    handleSave();
    navigate(-1);
  };

  const handleNext = () => {
    handleSave();
    navigate("/posting/3");
  };

  return (
    <PageContainer>
      <PostingAppBar 
        onCustomClick={handleSave} 
        nowPage={2} 
        onPrevClick={handlePrev}
        onNextClick={handleNext}
      />
      <PostingBoldText style={{ marginBottom: "0.56rem" }}>
        날짜를 선택해주세요
      </PostingBoldText>
      <SelectDay>
        {startDate.toLocaleString("ko-KR", { month: "long", day: "2-digit" })}
      </SelectDay>
      <PostingDatePicker startDate={startDate} setStartDate={setStartDate} />
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
`;

const SelectDay = styled.span`
  margin: 5%;
  font-size: 2.3rem;
  width: 100%;
  text-align: center;
`;