import { motion } from "framer-motion";
import { PropsWithChildren, useEffect } from "react";
import { styled } from "styled-components";

import { InputType } from "./type";

import ReadingGlassSVG from "@/assets/icons/reading-glass.svg";
import { colorTheme } from "@/style/color-theme";

export const InputBox = ({ children }: PropsWithChildren) => {
  return <>{children}</>;
};

const InputNum = ({ value, setValue, children }: InputType) => {
  return (
    <InputBoxContainer>
      <InputBoxCom
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <WonText>{children}</WonText>
    </InputBoxContainer>
  );
};

const InputMap = ({ value, setValue, isError, setIsError }: InputType) => {
  useEffect(() => {
    const errorTimeout = setTimeout(() => {
      if (setIsError) setIsError(false);
    }, 5000);

    return () => {
      clearTimeout(errorTimeout);
    };
  }, [value]);

  return (
    <InputMapContainer>
      <Icon src={ReadingGlassSVG} />
      <InputMapBox
        type="text"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        animate={{
          x: isError ? [-5, 5, -4, 4, -3, 3, -2, 2, -1, 1, 0] : 0,
        }}
        transition={{ duration: 0.5, repeat: 0 }}
        style={{
          color: isError ? "white" : "black",
          backgroundColor: isError ? colorTheme.blue700 : colorTheme.blue100,
        }}
      />
    </InputMapContainer>
  );
};

const InputBoxContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  padding-left: 21.5%;
`;

const InputBoxCom = styled.input`
  font-size: 2.78rem;
  font-weight: bold;
  color: white;
  text-align: center;
  border: 0;
  width: 70%;
  height: 79px;
  background-color: ${colorTheme.orange400};
  border-radius: 0.61rem;
  padding: 0.61rem;
`;

const WonText = styled.span`
  color: black;
  font-size: 1.11rem;
  vertical-align: bottom;
  margin: 0 0 5% 7%;
`;

const InputMapContainer = styled.div`
  width: 100%;
  height: 2.17rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Icon = styled.img`
  width: 1.78rem;
  margin: 0 1.28% 0 0;
  height: 1.89rem;
`;

const InputMapBox = styled(motion.input)`
  width: 69.12%;
  height: 100%;
  padding: 7.4%;
  font-size: 1rem;
  color: black;
  background-color: ${colorTheme.blue100};
  border-radius: 0.61rem;
  border: 0;
`;

InputBox.InputNum = InputNum;
InputBox.InputMap = InputMap;
