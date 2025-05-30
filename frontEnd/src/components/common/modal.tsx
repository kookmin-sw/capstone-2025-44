import { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from "react";
import { createPortal } from "react-dom";
import { styled } from "styled-components";

import { ReactComponent as BackSVG } from "@/assets/icons/modal-back.svg";
import { ReactComponent as CloseSVG } from "@/assets/icons/modal-close.svg";
import { colorTheme } from "@/style/color-theme";
import { fadeInDown } from "@/style/keyframes";

type CloseButtonType = {
  icon: "close" | "back";
  onClick: MouseEventHandler<HTMLDivElement>;
};

type TitleType = {
  text: string;
};

type ButtonType = {
  color?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type">;

type ModalType = {
  bottomFixed?: boolean;
  icon?: "close" | "back";
  onClose: MouseEventHandler<HTMLDivElement>;
  children: ReactNode;
};

const CloseButton = ({ icon, onClick }: CloseButtonType) => (
  <CloseButtonWrapper className="modal-close-button" onClick={onClick}>
    {{ close: <CloseSVG />, back: <BackSVG /> }[icon]}
  </CloseButtonWrapper>
);

const Title = ({ text }: TitleType) => {
  return (
    <TitleWrapper>
      {text.split("\\n").map((t) => (
        <span key={t}>{t}</span>
      ))}
    </TitleWrapper>
  );
};

const Button = ({ color = "blue", children, ...props }: ButtonType) => {
  return (
    <ButtonWrapper color={color} {...props}>
      {children}
    </ButtonWrapper>
  );
};

export const Modal = ({
  bottomFixed = false,
  icon = "close",
  onClose,
  children,
}: ModalType) => {
  return (
    <>
      {createPortal(
        <ModalBackground>
          <Content $bottomFixed={bottomFixed}>
            <CloseButton icon={icon} onClick={onClose} />
            {children}
          </Content>
        </ModalBackground>,
        document.body,
      )}
    </>
  );
};

Modal.Button = Button;
Modal.Title = Title;

const CloseButtonWrapper = styled.div`
  width: 64px;
  height: 64px;
  position: absolute;
  background-color: transparent;
  top: -12px;
  right: -14px;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 1.38rem;
  font-weight: 500;
  word-wrap: break-word;
`;

const ButtonWrapper = styled.button<{ color?: string }>`
  width: 100%;
  padding: 20px;
  background-color: #f17547;
  border: 1px solid transparent;
  border-radius: 30px;
  color: white;
  ${({ color }) =>
    color === "blue"
      ? `
    background-color: ${colorTheme.blue900};
    &:active{
      border: 1px solid ${colorTheme.blue900};
      background-color: white;
      color: ${colorTheme.blue900};
    }
  `
      : `background-color: ${colorTheme.orange400};
  &:active{
    border: 1px solid ${colorTheme.orange400};
    background-color: white;
    color: ${colorTheme.orange400};
  }`}
  font-size: 1.6rem;
  font-weight: 400;
`;

const ModalBackground = styled.div`
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: var(--app-init-height);
  background-color: rgba(217, 217, 217, 0.7);
  z-index: 80;
`;

const Content = styled.div<{ $bottomFixed: boolean }>`
  position: relative;
  display: flex;
  max-width: 90%;
  max-height: calc(var(--app-init-height) * 0.9);
  padding: 45px 40px 40px;
  background-color: #f5f5f5;
  border-radius: 35px;
  box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.25);
  font-size: 18px;
  font-weight: 400;
  line-height: 120%;
  flex-direction: column;
  text-align: center;
  gap: 30px;
  z-index: 100;
  animation: ${fadeInDown} 0.8s;
  & > * {
    flex: 1;
  }
  ${({ $bottomFixed }) => $bottomFixed && `position: absolute; bottom: 40%;`}
`;