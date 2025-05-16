import { motion } from "framer-motion";
import { styled } from "styled-components";

import { PostingAppBarProps } from "./type";

import { AppBar } from "@/components/common/app-bar";
import { colorTheme } from "@/style/color-theme";

export const PostingAppBar = (props: PostingAppBarProps) => {
  const { onPrevClick, onNextClick } = props;

  return (
    <AppBar isBorderExist={true}>
      <KeyboardawareAppBarNavigate>
        {onPrevClick ? (
          <NavButton onClick={onPrevClick}>이전</NavButton>
        ) : (
          <AppBar.BackButton onCustomClick={props.onCustomClick} />
        )}
        <AppBar.HeaderText>{props.nowPage}/8</AppBar.HeaderText>
        {onNextClick ? (
          <NavButton onClick={onNextClick}>다음</NavButton>
        ) : (
          <div style={{ width: "30px" }} />
        )}
      </KeyboardawareAppBarNavigate>
      <StateLine>
        <NowStateLine
          initial={{ width: `calc((100% / 8) * ${props.nowPage - 1})` }}
          animate={{ width: `calc((100% / 8) * ${props.nowPage})` }}
        />
      </StateLine>
    </AppBar>
  );
};

const StateLine = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  height: 0.44rem;
  background-color: ${colorTheme.blue100};
`;

const NowStateLine = styled(motion.div)`
  background-color: ${colorTheme.orange400};
  height: 0.44rem;
`;

const KeyboardawareAppBarNavigate = styled(AppBar.AppBarNavigate)`
    @media (max-height: 400px) {
        display: none !important;
    }
    height: 6.0rem;
    padding: 0 15px;
`;

const NavButton = styled.button`
  background: none;
  border: none;
  color: ${colorTheme.blue900};
  font-size: 1.5rem;
  font-weight: 600;
  cursor: pointer;
  padding: 4px 8px;
  min-width: 70px;
  text-align: center;
`;
