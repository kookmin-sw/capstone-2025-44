import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";

import { BankAccountData } from "@/api/types/bank-type";
import { CommonInput } from "@/components/common/common-input";
import { PostingAppBar } from "@/components/posting/posting-app-bar";
import { PostingBoldText } from "@/components/posting/posting-bold-text";
import { postingState } from "@/recoil/atoms/posting-state";
import { colorTheme } from "@/style/color-theme";

export const Posting5 = () => {
  const [posting, setPosting] = useRecoilState(postingState);
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state as BankAccountData;
  const availableBudget = data?.availableBudget || 0;

  const [member, setMember] = useState(posting.memberNum.toString());
  const [isError, setIsError] = useState(false);
  const [isErrorText, setIsErrorText] = useState(false);

  const handleSave = () => {
    setPosting((prevPosting) => {
      const updatedPosting = { ...prevPosting, memberNum: Number(member) };
      return updatedPosting;
    });
  };

  const handlePrev = () => {
    handleSave();
    navigate(-1);
  };

  const handleNext = () => {
    if (member === "" || member === "0") {
      setIsErrorText(true);
      setIsError(true);
    } else {
      handleSave();
      navigate("/posting/6");
    }
  };

  useEffect(() => {
    if (isErrorText && member !== "") {
      setIsErrorText(false);
    }
  }, [member]);

  return (
    <PageContainer>
      <PostingAppBar 
        onCustomClick={handleSave} 
        nowPage={5}
        onPrevClick={handlePrev}
        onNextClick={handleNext}
      />
      <PostingBoldText style={{ marginBottom: "1.8rem" }}>
        필요한 인원을
        <br />
        입력해주세요
      </PostingBoldText>
      <CommonInput style={{ paddingLeft: "15%" }}>
        <CommonInput.InputInner
          value={member}
          setValue={setMember}
          isError={isError}
          setIsError={setIsError}
          maximum={Math.floor(availableBudget / posting.price)}
          minimum={0}
          gap={"3%"}
        >
          명
        </CommonInput.InputInner>
      </CommonInput>
      <ErrorMsg>
        {isError &&
          !isErrorText &&
          `잔액이 모자랍니다!
          필요 인원은 1~${Math.floor(availableBudget / posting.price)}명 사이로
          설정해주세요`}
        {isErrorText && `필요 인원을 1명 이상 정해주세요!`}{" "}
      </ErrorMsg>
      <BalanceText>지금 내 잔액은 {availableBudget}타임 입니다.</BalanceText>
      <SumContainer>
        <SumText>합계</SumText>
        <SumNumberText>{posting.price * Number(member)}</SumNumberText>
        <SumText>타임</SumText>
      </SumContainer>
      <BalanceText style={{ marginTop: "3%" }}>
        게시물 작성 후 내 잔액은{" "}
        {availableBudget - posting.price * Number(member)}
        타임입니다.
      </BalanceText>
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

const BalanceText = styled.div`
  color: ${colorTheme.orange400};
  font-size: 1.4rem;
  width: 90%;
  text-align: center;
  margin: 3% 0px 3% 0px;
`;

const ErrorMsg = styled.div`
  color: ${colorTheme.orange400};
  font-size: 1.2rem;
  text-align: center;
  font-weight: bold;
  line-height: 1.2rem;
  min-height: 2.5rem;
  height: auto;
  white-space: pre-line;
  padding: 0.5rem;
`;

const SumContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 64.6%;
  border: solid;
  border-width: 1px 0;
  border-color: #d9d9d9;
  padding: 1.72rem 0;
  align-items: flex-end;
  justify-content: space-between;
`;

const SumText = styled.span`
  font-size: 2rem;
  font-weight: bold;
  color: black;
`;

const SumNumberText = styled.span`
  font-size: 3rem;
  font-weight: bold;
  color: ${colorTheme.orange400};
`;