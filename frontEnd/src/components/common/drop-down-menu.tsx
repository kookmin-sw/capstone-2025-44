import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { styled } from "styled-components";

import { colorTheme } from "@/style/color-theme";
import { fadeInDown } from "@/style/keyframes";

export const DropDownMenu = ({ children }: PropsWithChildren) => {
  return <Container>{children}</Container>;
};

const MenuItem = ({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <MenuItemWrapper {...props}>{children}</MenuItemWrapper>;
};

DropDownMenu.MenuItem = MenuItem;

const Container = styled.div`
  position: absolute;
  display: flex;
  min-width: 260px;
  margin-top: 5px;
  background-color: white;
  border-radius: 1.3rem 0 1.3rem 1.3rem;
  flex-direction: column;
  top: 100%;
  right: 0;
  z-index: 10;
  animation: ${fadeInDown} 1s;
  & > button {
    border-top: 1px solid ${colorTheme.orange300};
  }
  & > button:first-child {
    border: 0;
  }
`;

const MenuItemWrapper = styled.button`
  padding: 1rem;
  background-color: transparent;
  border: 1px solid transparent;
  font-size: 1.38rem;
  color: ${colorTheme.orange400};
`;
