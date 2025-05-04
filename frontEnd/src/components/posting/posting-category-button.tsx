import { styled } from "styled-components";

import { SelectToggleType } from "./type";

import Category1WhiteSVG from "@/assets/icons/category1-white.svg";
import Category2WhiteSVG from "@/assets/icons/category2-white.svg";
import Category3WhiteSVG from "@/assets/icons/category3-white.svg";
import Category4WhiteSVG from "@/assets/icons/category4-white.svg";
import Category5WhiteSVG from "@/assets/icons/category5-white.svg";
import Category6WhiteSVG from "@/assets/icons/category6-white.svg";
import Category7WhiteSVG from "@/assets/icons/category7-white.svg";
import CheckSVG from "@/assets/images/check.svg";
import { colorTheme } from "@/style/color-theme";

export const PostingCategoryButton = ({
  state,
  onClick,
  children,
  category,
}: SelectToggleType) => {
  return (
    <CheckTypeStyle
      style={{
        backgroundColor: state ? colorTheme.orange400 : colorTheme.blue300,
      }}
      onClick={onClick}
    >
      <CheckBoxContainer>
        <CheckBox></CheckBox>
        {state ? <CheckImg src={CheckSVG} /> : <></>}
      </CheckBoxContainer>
      <ColumnBox>
        {category === 1 && (
          <img
            src={Category1WhiteSVG}
            style={{ width: "2.47rem", height: "1.73rem" }}
          />
        )}
        {category === 2 && (
          <img
            src={Category2WhiteSVG}
            style={{ width: "2.32rem", height: "2.36rem" }}
          />
        )}
        {category === 3 && (
          <img
            src={Category3WhiteSVG}
            style={{ width: "2.88rem", height: "2.35rem" }}
          />
        )}
        {category === 4 && (
          <img
            src={Category4WhiteSVG}
            style={{ width: "2.27rem", height: "2.43rem" }}
          />
        )}
        {category === 5 && (
          <img
            src={Category5WhiteSVG}
            style={{ width: "2.11rem", height: "2.11rem" }}
          />
        )}
        {category === 6 && (
          <img
            src={Category6WhiteSVG}
            style={{ width: "2.42rem", height: "2.42rem" }}
          />
        )}
        {category === 7 && (
          <img
            src={Category7WhiteSVG}
            style={{ width: "1.78rem", height: "1.78rem" }}
          />
        )}
        <TypeSpan>{children}</TypeSpan>
      </ColumnBox>
    </CheckTypeStyle>
  );
};

const CheckTypeStyle = styled.button`
  width: 100%;
  height: 6.3rem;
  border: 0;
  border-radius: 1.39rem;
  display: flex;
  /* flex-direction: column; */
  padding: 0.67rem 7% 1.27rem 7%;
`;

const CheckImg = styled.img`
  width: 1.78rem;
  height: 1.28rem;
  position: absolute;
  top: -1%;
  right: 0;
  left: -1%;
`;

const CheckBoxContainer = styled.div`
  position: relative;
`;

const CheckBox = styled.div`
  position: relative;
  /* margin: 8% 0% 0% 4%; */
  width: 1.56rem;
  height: 1.56rem;
  background-color: #ffffff;
  border-radius: 0.56rem;
`;

const ColumnBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: column;
  gap: 0.3rem;
`;

const TypeSpan = styled.span`
  text-align: center;
  /* width: 100%; */
  /* height: 100%; */
  font-size: 1rem;
  color: #ffffff;
`;
