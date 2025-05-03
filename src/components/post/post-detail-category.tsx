import { styled } from "styled-components";

import Category1WhiteSVG from "@/assets/icons/category1-white.svg";
import Category2WhiteSVG from "@/assets/icons/category2-white.svg";
import Category3WhiteSVG from "@/assets/icons/category3-white.svg";
import Category4WhiteSVG from "@/assets/icons/category4-white.svg";
import Category5WhiteSVG from "@/assets/icons/category5-white.svg";
import Category6WhiteSVG from "@/assets/icons/category6-white.svg";
import Category7WhiteSVG from "@/assets/icons/category7-white.svg";
import { colorTheme } from "@/style/color-theme";
import { TypeIdInteractionString } from "@/utils/type-id-interaction-string";

export const PostDetailCategory = ({ category }: { category: number }) => {
  return (
    <Wrapper>
      {category === 1 && (
        <img
          src={Category1WhiteSVG}
          style={{ width: "1.06rem", height: "1.06rem" }}
        />
      )}
      {category === 2 && (
        <img
          src={Category2WhiteSVG}
          style={{ width: "1.30 rem", height: "0.91rem" }}
        />
      )}
      {category === 3 && (
        <img
          src={Category3WhiteSVG}
          style={{ width: "1.33rem", height: "1.09rem" }}
        />
      )}
      {category === 4 && (
        <img
          src={Category4WhiteSVG}
          style={{ width: "1.06rem", height: "1.13rem" }}
        />
      )}
      {category === 5 && (
        <img
          src={Category5WhiteSVG}
          style={{ width: "1rem", height: "1rem" }}
        />
      )}
      {category === 6 && (
        <img
          src={Category6WhiteSVG}
          style={{ width: "1rem", height: "1rem" }}
        />
      )}
      {category === 7 && (
        <img
          src={Category7WhiteSVG}
          style={{ width: "1rem", height: "1rem" }}
        />
      )}
      <span>
        {TypeIdInteractionString({ categoryId: category, idToString: true })}
      </span>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 2.06rem;
  padding: 0 0.89rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0.39rem;
  background-color: ${colorTheme.blue500};
  color: white;
  font-size: 1.11rem;
  font-weight: bold;
  border-radius: 0.61rem;
`;
