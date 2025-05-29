export type PostListItemProps = {
  postId: number;
  title: string;
  location: string;
  startDate: string;
  pay: number;
  status: string;
  currentApplicant: number;
  maxNumOfPeople: number;
  writerProfileImg: string;
  writerId: number;
  deleted: boolean;
  category: number;
};

export type PostCategorySelect = {
  categoryId: number;
  setCategoryId: React.Dispatch<React.SetStateAction<number>>;
  resetTextSearch: () => void;
};

export type categoryType = {
  id: number;
  name: string;
};
