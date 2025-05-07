import { useEffect, useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import { styled } from "styled-components";

import { BottomFixed } from "@/components/common/bottom-fixed";
import { Modal } from "@/components/common/modal";
import { Header } from "@/components/profile/header";
import { Input } from "@/components/profile/input";
import { profileState } from "@/recoil/atoms/profile-state";
import { colorTheme } from "@/style/color-theme";
import { validateDate } from "@/utils/date-utils";

type BirthPageProps = {
  nextStep: () => void;
  onModal: () => void;
};

export const BirthPage = ({ nextStep, onModal }: BirthPageProps) => {
  const [bYear, setBYear] = useState<string>("");
  const [bMonth, setBMonth] = useState<string>("");
  const [bDay, setBDay] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [yearError, setYearError] = useState<boolean>(false);
  const firstInputRef = useRef<HTMLInputElement>(null);

  const setProfile = useSetRecoilState(profileState);

  const saveProfile = () => {
    // 생년월일(4자리) 두자리 입력 방지를 위한 에러 플로팅
    if (bYear.length < 4) {
      setYearError(true);
      return;
    }
    if (!validateDate.all(bYear, bMonth, bDay)) {
      setError(true);
      return;
    }

    setProfile((profile) => ({
      ...profile,
      birth: [bYear, bMonth.padStart(2, "0"), bDay.padStart(2, "0")].join("-"),
    }));

    nextStep();
  };

  useEffect(() => {
    firstInputRef.current?.focus();
  }, []);

  return (
    <ContentLayout>
      <Header text="생년월일을 입력해주세요" />
      <InputContainer>
        <InputWrapper>
          <Input
            ref={firstInputRef}
            maxLength={4}
            inputMode="numeric"
            onChange={(event) => setBYear(event.target.value)}
          />
          <span>년도</span>
        </InputWrapper>
        <InputWrapper>
          <Input
            maxLength={2}
            inputMode="numeric"
            onChange={(event) => setBMonth(event.target.value)}
          />
          <span>월</span>
          <Input
            maxLength={2}
            inputMode="numeric"
            onChange={(event) => setBDay(event.target.value)}
          />
          <span>일</span>
        </InputWrapper>
      </InputContainer>
      {error && <ErrorMessage>올바른 생년월일을 입력해주세요</ErrorMessage>}
      <BottomFixed>
        <BottomFixed.Button
          color="orange"
          onClick={() => (bYear && bMonth && bDay ? saveProfile() : onModal())}
        >
          다음
        </BottomFixed.Button>
      </BottomFixed>
      {yearError && (
        <Modal onClose={() => setYearError(false)}>
          <Modal.Title text="연도는 4자리로 입력\n해주세요" />
          <ExampleYear>예시: 1987</ExampleYear>
        </Modal>
      )}
    </ContentLayout>
  );
};

const ContentLayout = styled.div`
  display: flex;
  width: 100%;
  height: 90%;
  margin-top: 86px;
  flex-direction: column;
  align-items: center;
  gap: 50px;
`;

const InputContainer = styled.div`
  max-width: 90%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputWrapper = styled.div`
  flex: 1;
  display: flex;
  gap: 10px;
  & > input {
    padding: 12px 15px; // 가로폭이 좁은 기기(like galaxy fold) 고려
  }
  & > span {
    display: flex;
    font-size: 1.67rem;
    font-color: #a1a1a1;
    white-space: nowrap;
    justify-content: center;
    align-items: center;
  }
`;

const ErrorMessage = styled.span`
  font-size: 0.83rem;
  color: red;
`;

const ExampleYear = styled.span`
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 1.38rem;
  font-weight: 500;
  color: ${colorTheme.orange400};
  word-wrap: break-word;
`;
