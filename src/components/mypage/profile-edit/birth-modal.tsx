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

  const [step, setStep] = useState<number>(0);

  const nextStep = (targetStep: number) => {
    return setStep((step) => (step < targetStep ? step + 1 : step));
  };

  const onClick = () => {
    if (errorMsg === "INITIAL" && step === 2) {
      setProfileEdit((prev) => ({
        ...prev,
        birth: `${bYear}-${bMonth}-${bDay}`,
      }));

      onClose();
    }
    errorMsg === "INITIAL" &&
      [bYear, bMonth, bDay][step].length &&
      nextStep(step + 1);
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
            onBlur={() => {
              if (validateDate.year(bYear)) {
                setErrorMsg("INITIAL");
              } else setErrorMsg("YEAR");
            }}
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
                onBlur={() => {
                  if (validateDate.month(bMonth)) {
                    setErrorMsg("INITIAL");
                    setBMonth((prev) => prev.padStart(2, "0"));
                  } else setErrorMsg("MONTH");
                }}
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
                onBlur={() => {
                  if (validateDate.day(bYear, bMonth, bDay)) {
                    setErrorMsg("INITIAL");
                    setBDay((prev) => prev.padStart(2, "0"));
                  } else setErrorMsg("DAY");
                }}
              />
            )}
          </RowBox>
        </>
        <NextButton onClick={onClick}>
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
