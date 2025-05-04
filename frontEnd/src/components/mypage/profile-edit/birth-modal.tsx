import {
  ChangeEvent,
  forwardRef,
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import { useSetRecoilState } from "recoil";
import { css, styled } from "styled-components";

import { Modal } from "@/components/common/modal";
import { profileEditState } from "@/recoil/atoms/profile-edit-state";
import { colorTheme } from "@/style/color-theme";
import { fadeIn, fadeInDown, slideUp, widthUp } from "@/style/keyframes";
import { validateDate } from "@/utils/date-utils";

type BirthInputProps = {
  suffix: string;
  appear: boolean;
  appearEffect: "down" | "fadeIn" | "widthUp";
  moveEffect: "none" | "up";
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

type ErrorMessageType = "INITIAL" | "YEAR" | "MONTH" | "DAY";

const ErrorMessageMap = {
  INITIAL: "",
  YEAR: "연도가 올바르지 않습니다",
  MONTH: "월은 1부터 12까지 입력 가능합니다",
  DAY: "일자가 올바르지 않습니다",
};

export const BirthModal = ({ onClose }: { onClose: () => void }) => {
  const [bYear, setBYear] = useState<string>("");
  const [bMonth, setBMonth] = useState<string>("");
  const [bDay, setBDay] = useState<string>("");

  const yRef = useRef<HTMLInputElement>(null);
  const mRef = useRef<HTMLInputElement>(null);
  const dRef = useRef<HTMLInputElement>(null);

  const setProfileEdit = useSetRecoilState(profileEditState);

  const [errorMsg, setErrorMsg] = useState<ErrorMessageType>("INITIAL");
  const [focusStep, setFocusStep] = useState<number>(0);
  const [step, setStep] = useState<number>(0);

  const nextStep = (targetStep: number) => {
    return setStep((step) => (step < targetStep ? step + 1 : step));
  };

  
  // --- 통합 유효성 검사 함수 (오류 유형만 반환) ---
  const validateUpToStep = (stepToValidate: number): ErrorMessageType => {
    // 0단계: 연도 검사
    if (bYear.length === 0 || !validateDate.year(bYear)) {
      return "YEAR";
    }

    // 1단계: 월 검사 (stepToValidate가 1 이상일 때만)
    if (stepToValidate >= 1) {
      const paddedMonth = bMonth.padStart(2, '0');
      if (bMonth.length === 0 || !validateDate.month(paddedMonth)) {
        return "MONTH";
      }
      // (선택적) 검사 통과 시 포맷팅 - 함수 외부에서 해도 됨
      // if (bMonth !== paddedMonth) setBMonth(paddedMonth);
    }

    // 2단계: 일 검사 (stepToValidate가 2 이상일 때만)
    if (stepToValidate >= 2) {
      const paddedMonth = bMonth.padStart(2, '0'); // 일 검사에도 월 필요
      const paddedDay = bDay.padStart(2, '0');
      if (bDay.length === 0 || !validateDate.day(bYear, paddedMonth, paddedDay)) {
        return "DAY";
      }
      // (선택적) 검사 통과 시 포맷팅
      // if (bDay !== paddedDay) setBDay(paddedDay);
    }

    // 모든 검사 통과
    return "INITIAL";
  };
  // ---

    // --- 오류 처리 및 포커스 이동 함수 ---
    const handleError = (errorType: ErrorMessageType) => {
      setErrorMsg(errorType);
      switch (errorType) {
          case "YEAR":
              yRef.current?.focus();
              setFocusStep(0); // 포커스 단계 동기화
              break;
          case "MONTH":
              mRef.current?.focus();
              setFocusStep(1);
              break;
          case "DAY":
              dRef.current?.focus();
              setFocusStep(2);
              break;
          case "INITIAL":
          default:
              // 성공 시에는 포커스 이동은 다른 로직에서 처리
              break;
      }
  };
  // ---

  // --- '다음' 또는 '완료하기' 버튼 클릭 핸들러 (통합 검증 사용) ---
  const handleNextOrSubmit = () => {
    let validationResult: ErrorMessageType = "INITIAL";
    let stepToValidate: number;

    // '완료하기' 상태일 때 검증할 단계 = 2
    if (step === 2) {
      stepToValidate = 2;
    }
    // '다음' 상태일 때 검증할 단계 = 현재 포커스된 단계
    else {
      stepToValidate = focusStep;
    }

    // 결정된 단계까지 유효성 검사 수행
    validationResult = validateUpToStep(stepToValidate);

    // 검증 결과 처리
    if (validationResult === "INITIAL") {
      // 성공!
      setErrorMsg("INITIAL"); // 혹시 모를 이전 오류 클리어

      // '다음' 로직 처리
      if (step < 2) {
        const nextStepIndex = focusStep + 1;
        setStep((prevMaxStep) => Math.max(prevMaxStep, nextStepIndex));
        setFocusStep(nextStepIndex); // 다음 단계로 포커스 이동 요청
         // 성공 시 값 포맷팅 (패딩) - validateUpToStep 내부에서 안 했다면 여기서 수행
        if (focusStep === 1 && bMonth.length > 0) setBMonth(bMonth.padStart(2,'0'));
        if (focusStep === 2 && bDay.length > 0) setBDay(bDay.padStart(2,'0'));
      }
      // '완료하기' 로직 처리
      else {
        // 최종 저장 전 값 포맷팅 확인
        const finalYear = bYear;
        const finalMonth = bMonth.padStart(2, '0');
        const finalDay = bDay.padStart(2, '0');
        setProfileEdit((prev) => ({
          ...prev,
          birth: `${finalYear}-${finalMonth}-${finalDay}`,
        }));
        onClose();
      }
    } else {
      // 실패! 오류 처리 함수 호출
      handleError(validationResult);
    }
  };

  useEffect(() => {
    // step에 따른 input 자동 포커싱
    switch (step) {
      case 0:
        yRef.current && yRef.current.focus();
        break;
      case 1:
        mRef.current && mRef.current.focus();
        break;
      case 2:
        dRef.current && dRef.current.focus();
        break;
    }
  }, [step]);

  return (
    <Modal bottomFixed icon="back" onClose={onClose}>
      <ModalInner>
        <Modal.Title text="생년월일을\n입력해주세요" />
        {errorMsg !== "INITIAL" ? (
          <ErrorMessage>{ErrorMessageMap[errorMsg]}</ErrorMessage>
        ) : (
          <></>
        )}
        <>
          <BirthInput
            ref={yRef}
            suffix="년도"
            appear={step === 0}
            appearEffect="down"
            moveEffect={step === 1 ? "up" : "none"}
            maxLength={4}
            value={bYear}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setBYear(e.target.value)
            }
            onFocus={() => setFocusStep(0)}
          />
          <RowBox>
            {step >= 1 && (
              <BirthInput
                ref={mRef}
                suffix="월"
                appear={step === 1}
                appearEffect="fadeIn"
                moveEffect="none"
                maxLength={2}
                value={bMonth}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setBMonth(e.target.value)
                }
                onFocus={() => setFocusStep(1)}
              />
            )}
            {step >= 2 && (
              <BirthInput
                ref={dRef}
                appear={step === 2}
                appearEffect="widthUp"
                moveEffect={"none"}
                suffix="일"
                maxLength={2}
                value={bDay}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setBDay(e.target.value)
                }
                onFocus={() => setFocusStep(2)}
              />
            )}
          </RowBox>
        </>
        <NextButton onClick={handleNextOrSubmit}>
          {step < 2 ? "다음" : "완료하기"}
        </NextButton>
      </ModalInner>
    </Modal>
  );
};

export const BirthInput = forwardRef<HTMLInputElement, BirthInputProps>(
  function BirthInput(
    { suffix, appear, appearEffect, moveEffect, value, onChange, ...props },
    ref,
  ) {
    return (
      <InputWrapper
        appear={appear}
        appearEffect={appearEffect}
        moveEffect={moveEffect}
      >
        <input
          ref={ref}
          type="text"
          inputMode="numeric"
          value={value}
          onChange={onChange}
          {...props}
        />
        <span>{suffix}</span>
      </InputWrapper>
    );
  },
);

const ModalInner = styled.div`
  width: 100%;
  max-width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
`;

const ErrorMessage = styled.div`
  color: ${colorTheme.orange400};
  font-size: 0.83rem;
`;

const InputWrapper = styled.div<{
  appear: boolean;
  appearEffect: "down" | "fadeIn" | "widthUp";
  moveEffect: "none" | "up";
}>`
  flex: 1;
  display: flex;
  font-size: 1.1rem;
  color: #828282;
  white-space: nowrap;
  align-items: center;
  gap: 10px;
  transition: all 1s;
  ${({ appear, appearEffect }) => {
    if (!appear) return "";
    switch (appearEffect) {
      case "down":
        return css`
          animation: ${fadeInDown} 1s;
        `;
      case "fadeIn":
        return css`
          animation: ${fadeIn} 1s;
        `;
      case "widthUp":
        return css`
          animation: ${widthUp} 1s;
        `;
    }
  }}

  ${({ moveEffect }) => {
    return moveEffect === "up"
      ? css`
          animation: ${slideUp} 1s;
        `
      : "";
  }}

  & > input {
    padding: 12px 15px; // 가로폭이 좁은 기기(like galaxy fold) 고려

    width: 100%;
    background-color: #e4e8f1;
    border: 0;
    border-radius: 10px;
    color: #4b6db4;
    font-size: 1.1rem;
    text-align: center;
  }
  & > span {
    width: 3rem;
  }
`;

const RowBox = styled.div`
  display: flex;
  margin-top: -0.5rem;
  gap: 0.83rem;
`;

const NextButton = styled.button`
  width: 100%;
  padding: 0.5rem;
  border: 0;
  border-radius: 30px;
  background-color: ${colorTheme.orange400};
  color: white;
  font-size: 1.38rem;
`;
