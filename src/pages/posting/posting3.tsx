import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";

import { CommonInput } from "@/components/common/common-input";
import { ToggleSwitch } from "@/components/common/toggle-switch";
import { PostingAppBar } from "@/components/posting/posting-app-bar";
import { PostingBoldText } from "@/components/posting/posting-bold-text";
import { postingState } from "@/recoil/atoms/posting-state";
import { colorTheme } from "@/style/color-theme";

export const Posting3 = () => {
  const navigate = useNavigate();
  const [posting, setPosting] = useRecoilState(postingState);
  const hour = posting.startTimeSave ? posting.startDate.getHours() : -1;
  const [minuteValue, setMinuteValue] = useState(
    posting.startTimeSave ? posting.startDate.getMinutes().toString() : "",
  );
  const [isLeftSelected, SetIsLeftSelected] = useState(
    hour < 12 ? true : false,
  );
  const [hourValue, setHourValue] = useState(
    hour === -1
      ? ""
      : hour < 12
        ? hour === 0
          ? "12"
          : hour.toString()
        : hour - 12 === 0
          ? "12"
          : (hour - 12).toString(),
  );
  const [isHourError, setIsHourError] = useState(false);
  const [isMinuteError, setIsMinuteError] = useState(false);
  const [isAllError, setIsAllError] = useState(false);

  const handleSave = () => {
    let tempHour = 0;
    if (isLeftSelected) {
      tempHour = Number(hourValue) === 12 ? 0 : Number(hourValue);
    } else {
      tempHour = Number(hourValue) === 12 ? 12 : Number(hourValue) + 12;
    }
    posting.startDate.setHours(tempHour);
    posting.startDate.setMinutes(Number(minuteValue));
    setPosting((prevPosting) => {
      const updatedPosting = {
        ...prevPosting,
        startDate: posting.startDate,
        startTimeSave: true,
      };
      return updatedPosting;
    });
  };

  const handlePrev = () => {
    handleSave();
    navigate(-1);
  };

  const handleNext = () => {
    if (hourValue === "" || minuteValue === "") {
      setIsAllError(true);
      setIsHourError(true);
      setIsMinuteError(true);
    } else {
      handleSave();
      navigate("/posting/4");
    }
  };

  return (
    <PageContainer>
      <PostingAppBar 
        onCustomClick={handleSave} 
        nowPage={3}
        onPrevClick={handlePrev}
        onNextClick={handleNext}
      />
      <PostingBoldText>
        시작 시간을
        <br />
        선택해주세요
      </PostingBoldText>
      <ToggleSwitch
        firstText="오전"
        secondText="오후"
        isLeftSelected={isLeftSelected}
        onChangeSelected={SetIsLeftSelected}
      />
      <CommonInput style={{ paddingTop: "10%" }}>
        <CommonInput.InputInner
          value={hourValue}
          setValue={setHourValue}
          isError={isHourError}
          setIsError={setIsHourError}
          maximum={12}
          minimum={1}
        >
          시
        </CommonInput.InputInner>
        <CommonInput.InputInner
          value={minuteValue}
          setValue={setMinuteValue}
          isError={isMinuteError}
          setIsError={setIsMinuteError}
          maximum={59}
          minimum={0}
        >
          분
        </CommonInput.InputInner>
      </CommonInput>
      {isHourError && !isMinuteError && !isAllError && (
        <ErrorMsg>1~12시 사이로 입력해주세요!</ErrorMsg>
      )}
      {!isHourError && isMinuteError && !isAllError && (
        <ErrorMsg>0~59분 사이로 입력해주세요!</ErrorMsg>
      )}
      {isAllError && <ErrorMsg>정확한 시작 시간을 입력해주세요!</ErrorMsg>}
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
  height: var(--app-height); // 📌 뷰포트 높이 대응
  overflow-y: auto; // 📌 입력 시 스크롤 가능하게
  padding-bottom: 20px; // 📌 버튼 영역만큼 여백 확보
`;

const ErrorMsg = styled.div`
  color: ${colorTheme.orange400};
  font-size: 1.4rem;
  text-align: center;
  font-weight: bold;
  line-height: 2rem;
`;