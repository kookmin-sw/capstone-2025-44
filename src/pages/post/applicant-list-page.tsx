import { useParams } from "react-router-dom";
import { styled } from "styled-components";

import { ApplicantList } from "./applicant-list";

import { AppBar } from "@/components/common/app-bar";

export const ApplicantListPage = () => {
  const { postId } = useParams();
  return (
    <Wrapper>
      <AppBar isBorderExist>
        <AppBar.AppBarNavigate>
          <AppBar.BackButton />
          <AppBar.HeaderText isBigSizeText>참여관리</AppBar.HeaderText>
        </AppBar.AppBarNavigate>
      </AppBar>
      <ApplicantList postId={postId!} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  max-width: 480px;
  margin: auto;
  font-size: 0.88rem;
  background-color: #ffffff;
`;
