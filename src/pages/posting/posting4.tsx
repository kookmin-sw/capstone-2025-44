import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";

import { BottomFixed } from "@/components/common/bottom-fixed";
import { CommonInput } from "@/components/common/common-input";
import { PostingAppBar } from "@/components/posting/posting-app-bar";
import { PostingBoldText } from "@/components/posting/posting-bold-text";
import { useGetBankData } from "@/hooks/queries/useGetBankData";
import { postingState } from "@/recoil/atoms/posting-state";
import { colorTheme } from "@/style/color-theme";

export const Posting4 = () => {
  const navigate = useNavigate();

  const [posting, setPosting] = useRecoilState(postingState);
  const { data } = useGetBankData();
  const availableBudget = data?.availableBudget || 0;

  const [price, setPrice] = useState(posting.price.toString());
  const [isError, setIsError] = useState(false);
  const [isErrorText, setIsErrorText] = useState(false);

  const handleSave = () => {
    setPosting((prevPosting) => {
      const updatedPosting = {
        ...prevPosting,
        price: Math.ceil(Number(price) / 10) * 10,
      };
      return updatedPosting;
    });
  };

  useEffect(() => {
    if (isErrorText && price !== "") {
      setIsErrorText(false);
    }
  }, [price]);

  return (
    <PageContainer>
      <PostingAppBar onCustomClick={() => handleSave()} nowPage={4} />
      <PostingBoldText style={{ marginBottom: "1.4rem" }}>
        활동의 소요시간을
        <br />
        입력해주세요
      </PostingBoldText>
      <TipMsg
        style={{ color: `${colorTheme.orange400}` }}
      >{`※최소 단위는 30분(타임)입니다※`}</TipMsg>
      <TimeText>{`인당 ${Math.floor(Number(price) / 60)}시간 ${Number(price) % 60}분\n=> ${Math.ceil(Number(price) / 10) * 10}분(타임) 소요`}</TimeText>
      {isError && !isErrorText && (
        <ErrorMsg>
          {` 소요시간은 최소 30분 ~ 최대 ${availableBudget}분 사이로
          설정해주세요`}
        </ErrorMsg>
      )}
      {isErrorText && <ErrorMsg>소요시간을 다시 지정해주세요!</ErrorMsg>}
      <CommonInput style={{ paddingLeft: "15%" }}>
        <CommonInput.InputInner
          value={price}
          setValue={setPrice}
          isError={isError}
          setIsError={setIsError}
          maximum={availableBudget}
          gap={"3%"}
        >
          분
        </CommonInput.InputInner>
      </CommonInput>
      <TipMsg>
        {`10분 단위로 신청할 수 있기 때문에 \n 자동으로 10분 단위로 맞춰드리고 있습니다`}
      </TipMsg>
      <BalanceText>활동시간 10분당 10타임이 소요됩니다</BalanceText>
      <BalanceText style={{ color: colorTheme.orange400, marginTop: "5%" }}>
        지금 내 사용 가능 잔액은 {data?.availableBudget}타임입니다
      </BalanceText>
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
            if (price === "" || price === "0" || Number(price) < 30) {
              setIsErrorText(true);
              setIsError(true);
            } else {
              handleSave();
              navigate("/posting/5", { state: data });
            }
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
  align-items: center;
  flex-direction: column;
`;

const BalanceText = styled.span`
  color: black;
  font-size: 18px;
  margin: 10% 0px 0px 0px;
  text-align: center;
`;

const TimeText = styled.span`
  color: ${colorTheme.orange400};
  font-size: 1.33rem;
  margin-bottom: 5%;
  white-space: pre-line;
  text-align: center;
  line-height: 1.7rem;
`;

const ErrorMsg = styled.div`
  color: ${colorTheme.orange400};
  font-size: 1rem;
  text-align: center;
  font-weight: bold;
  line-height: 1.1rem;
  white-space: pre-line;
`;

const TipMsg = styled.div`
  font-size: 0.7rem;
  color: ${colorTheme.shade};
  text-align: center;
  white-space: pre-line;
  margin-bottom: 0.3rem;
`;
