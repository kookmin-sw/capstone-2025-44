import { styled } from "styled-components";

import { Modal } from "./modal";
import { ProfileModalType } from "./type";

import DeletedUserSVG from "@/assets/images/deleted-user.svg";
import { colorTheme } from "@/style/color-theme";

export const DeletedProfileModal = ({ onClose }: ProfileModalType) => {
  return (
    <Modal onClose={() => onClose()}>
      <Modal.Title text="알 수 없음" />
      <ImgBackground>
        <Img src={DeletedUserSVG} />
      </ImgBackground>
    </Modal>
  );
};

const ImgBackground = styled.div`
  width: 8rem;
  height: 8rem;
  border-radius: 1.17rem;
  border-width: 0.56rem;
  border-color: ${colorTheme.blue300};
  background-color: #d9d9d9;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Img = styled.img`
  width: 3.89rem;
  height: 5.61rem;
`;
