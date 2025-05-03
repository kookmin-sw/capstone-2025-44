import { styled } from "styled-components";

import { categoryType, PostCategorySelect } from "./type";

import { colorTheme } from "@/style/color-theme";

export const PostCategory = ({
  categoryId,
  setCategoryId,
  resetTextSearch,
}: PostCategorySelect) => {
  const categoryList: categoryType[] = [
    { id: 1, name: "이동" },
    { id: 2, name: "심부름" },
    { id: 3, name: "교육" },
    { id: 4, name: "장소" },
    { id: 5, name: "돌봄" },
    { id: 6, name: "수리" },
    { id: 7, name: "기타" },
  ];

  return (
    <Wrapper>
      {categoryList.map((item, idx) => (
        <Button
          key={idx}
          $state={categoryId === item.id}
          onClick={() => {
            if (categoryId === item.id) {
              setCategoryId(0);
            } else {
              setCategoryId(item.id);
              resetTextSearch();
            }
          }}
        >
          {item.name}
        </Button>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding: 0rem 2.3rem 1rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 0.67rem;
`;

const Button = styled.button<{ $state: boolean }>`
  height: 1.9rem;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  border: none;
  font-size: 1rem;
  border-radius: 0.56rem;
  ${({ $state }) =>
    $state
      ? `background-color: ${colorTheme.orange400}; color:white;`
      : `background-color: ${colorTheme.blue100}; color:${colorTheme.blue900};`}
`;
