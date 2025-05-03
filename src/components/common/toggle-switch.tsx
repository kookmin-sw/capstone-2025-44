import { motion } from "framer-motion";
import { styled } from "styled-components";

import { SwitchToggleType } from "./type";

import { colorTheme } from "@/style/color-theme";

export const ToggleSwitch = ({
  firstText,
  secondText,
  onChangeSelected,
  isLeftSelected,
  selectBackColor,
  notSelectBackColor,
  selectTextColor,
  notSelectTextColor,
}: SwitchToggleType) => {
  const variants = {
    selected: {
      width: "65%",
      backgroundColor: selectBackColor ? selectBackColor : colorTheme.orange400,
      color: selectTextColor ? selectTextColor : "#ffffff",
    },
    notSelected: {
      width: "35%",
      backgroundColor: notSelectBackColor
        ? notSelectBackColor
        : colorTheme.orange200,
      color: notSelectTextColor ? notSelectTextColor : "#ffffff",
    },
  };

  return (
    <SelectToggleWrapper>
      <SelectToggleButton
        variants={variants}
        initial={false}
        animate={isLeftSelected ? "selected" : "notSelected"}
        onClick={() => onChangeSelected(true)}
      >
        {firstText}
      </SelectToggleButton>
      <SelectToggleButton
        variants={variants}
        initial={false}
        animate={isLeftSelected ? "notSelected" : "selected"}
        onClick={() => onChangeSelected(false)}
      >
        {secondText}
      </SelectToggleButton>
    </SelectToggleWrapper>
  );
};

const SelectToggleWrapper = styled.div`
  width: 100%;
  padding: 0 10%;
  display: flex;
  gap: 1%;
`;

const SelectToggleButton = styled(motion.button)`
  text-align: center;
  font-size: 1rem;
  color: #ffffff;
  width: 100%;
  line-height: 1.61rem;
  padding: 0.44rem 0;
  border: 0;
  border-radius: 1.11rem;
`;
