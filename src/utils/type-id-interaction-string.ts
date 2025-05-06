import { categoryType } from "@/components/post/type";

type categoryUtil = {
  categoryId?: number;
  categoryString?: string;
  idToString: boolean;
};

export const TypeIdInteractionString = ({
  categoryId,
  categoryString,
  idToString,
}: categoryUtil) => {
  const categoryList: categoryType[] = [
    { id: 1, name: "이동" },
    { id: 2, name: "심부름" },
    { id: 3, name: "교육" },
    { id: 4, name: "장소" },
    { id: 5, name: "돌봄" },
    { id: 6, name: "수리" },
    { id: 7, name: "기타" },
  ];

  if ((!categoryId && !categoryString) || (categoryId && categoryString))
    return;
  if (categoryId && 0 < categoryId && categoryId < 8) {
    if (idToString)
      return categoryList.filter((category) => category.id === categoryId)[0]
        .name;
    else return;
  }
  if (categoryString) {
    if (idToString) return;
    const temp = categoryList.filter(
      (category) => category.name === categoryString,
    );
    if (!temp.length) return;
    else return temp[0].id;
  }
};
