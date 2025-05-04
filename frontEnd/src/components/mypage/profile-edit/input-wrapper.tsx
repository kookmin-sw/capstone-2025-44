import { PropsWithChildren } from "react";
import { styled } from "styled-components";

import EditIconSVG from "@/assets/icons/edit.svg";
import { colorTheme } from "@/style/color-theme";

export const InputWrapper = ({ children }: PropsWithChildren) => {
  return <InputBox>{children}</InputBox>;
};

const InputBox = styled.div`
  width: 100%;
  position: relative;
  padding: 0.38rem;
  border: 1px solid ${colorTheme.orange300};
  border-radius: 10px;
  & > * {
    width: 100%;
    font-size: 1.1rem;
    border: 0;
    background-color: transparent;
  }
  &::after {
    position: absolute;
    width: 1.1rem;
    aspect-ratio: 1;
    right: -5px;
    top: -5px;
    background-image: url(${EditIconSVG});
    background-position: center;
    background-repeat: no-repeat;
    content: " ";
  }
`;
