import { motion } from "framer-motion";
import { PropsWithChildren, useEffect, useRef } from "react";
import { styled } from "styled-components";

import { TextAreaType } from "./type";

import { InputType } from "@/components/common/type";
import { colorTheme } from "@/style/color-theme";

export const PostingInput = ({ children }: PropsWithChildren) => {
  return <>{children}</>;
};

const InputTitle = ({ value, setValue, isError, setIsError }: InputType) => {
  useEffect(() => {
    const errorTimeout = setTimeout(() => {
      if (setIsError) setIsError(false);
    }, 5000);

    return () => {
      clearTimeout(errorTimeout);
    };
  }, [value]);
  return (
    <InputWrapper>
      <InputContainer
        animate={{
          x: isError ? [-5, 5, -4, 4, -3, 3, -2, 2, -1, 1, 0] : 0,
        }}
        transition={{ duration: 0.5, repeat: 0 }}
        style={{
          color: isError ? "white" : "black",
          backgroundColor: isError ? colorTheme.blue700 : colorTheme.blue100,
        }}
      >
        <InputTitleBox
          maxLength={20}
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        <InputLeft>{value.toString().length}/20자</InputLeft>
      </InputContainer>
    </InputWrapper>
  );
};

const InputContent = (props: TextAreaType) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <InputWrapper>
      <InputContainer>
        <InputContentBoxContainer onClick={handleClick}>
          <InputContentBox ref={inputRef} maxLength={99} {...props} />
        </InputContentBoxContainer>
        <InputLeft>{props.value?.toString().length}/100자</InputLeft>
      </InputContainer>
    </InputWrapper>
  );
};

const InputWrapper = styled.div`
  width: 100%;
  padding: 0 9.8%;
`;

const InputContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1.06rem 1.17rem;
  background-color: ${colorTheme.blue300};
  border-radius: 0.61rem;
  color: black;
  align-items: flex-start;
`;

const InputTitleBox = styled.input`
  font-size: 1.39rem;
  font-weight: bold;
  width: 100%;
  background-color: transparent;
  border: 0;
`;

const InputLeft = styled.span`
  font-size: 0.83rem;
  width: 100%;
  border: 0;
  padding-top: 0.56rem;
  text-align: end;
`;

const InputContentBoxContainer = styled.div`
  width: 100%;
  background-color: transparent;
  border: 0;
  height: 11.45rem;
`;

const InputContentBox = styled.textarea`
  width: 100%;
  height: 100%;
  font-size: 1rem;
  background-color: transparent;
  resize: vertical;
  border: 0;
`;

PostingInput.InputTitle = InputTitle;
PostingInput.InputContent = InputContent;
