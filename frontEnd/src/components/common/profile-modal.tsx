import { useState } from "react";
import { styled } from "styled-components";

import { MyProfileModalType, ProfileModalType } from "./type";

import LocationSVG from "@/assets/icons/location.svg";
import { Modal } from "@/components/common/modal";
import { useDeleteBlock } from "@/hooks/queries/useDeleteBlock";
import { useGetProfile } from "@/hooks/queries/useGetProfile";
import { usePostBlock } from "@/hooks/queries/usePostBlock";
import { colorTheme } from "@/style/color-theme";
import { calculateAge } from "@/utils/date-utils";
import { devLog } from "@/utils/dev-log";

export const MyProfileModal = ({
  profileData,
  onEdit,
  onClose,
}: MyProfileModalType) => {
  return (
    <Modal
      onClose={() => {
        onClose();
      }}
    >
      <ModalDiv>
        <ModalHeader>
          <span>{profileData.nickName}</span>
          <ModalHeaderLine />
          <span>{profileData.gender === "male" ? "남" : "여"}</span>
          <ModalHeaderLine />
          <span>{`${calculateAge(profileData.birth)}세`}</span>
        </ModalHeader>
        <Img src={profileData.profileImage} />
        <AddressSpan>
          <img style={{ width: "1rem", height: "1rem" }} src={LocationSVG} />
          {profileData?.address}
        </AddressSpan>
        <Modal.Button color="orange" onClick={() => onEdit()}>
          프로필 수정하기
        </Modal.Button>
      </ModalDiv>
    </Modal>
  );
};

export const ProfileModal = ({ userId, onClose }: ProfileModalType) => {
  const { data: profileData } = useGetProfile(userId);
  const isBlocked = profileData?.blocked;

  const [checkBlock, setCheckBlock] = useState(false);
  const [blockFinish, setBlockFinish] = useState(false);

  const postBlock = usePostBlock();
  const deleteBlock = useDeleteBlock();
  devLog("Profile-Modal:: ", userId);

  let myId: number = -1;
  let myIdStorage: string | null = null;
  myIdStorage = localStorage.getItem("userId");
  if (myIdStorage) myId = Number(myIdStorage);

  const handleBlock = () => {
    isBlocked
      ? deleteBlock.mutate(+userId!, {
          onSuccess: () => {
            setCheckBlock(false);
            setBlockFinish(true);
          },
        })
      : postBlock.mutate(+userId!, {
          onSuccess: () => {
            setCheckBlock(false);
            setBlockFinish(true);
          },
        });
  };

  return (
    <Modal
      onClose={() => {
        onClose();
        setCheckBlock(false);
        setBlockFinish(false);
      }}
    >
      {checkBlock && (
        <ModalDiv>
          <Modal.Title text={`${profileData?.nickName}님을`} />
          <div style={{ height: "5px" }} />
          <Modal.Title
            text={isBlocked ? "차단해제하시겠습니까?" : "차단하시겠습니까?"}
          />
          <Modal.Button
            style={{ width: "100%", marginTop: "15%" }}
            color={isBlocked ? "blue" : "orange"}
            onClick={() => handleBlock()}
          >
            {isBlocked ? "차단해제" : "차단하기"}
          </Modal.Button>
        </ModalDiv>
      )}
      {blockFinish && (
        <ModalDiv>
          <Modal.Title text={`${profileData?.nickName}님이`} />
          <div style={{ height: "5px" }} />
          <Modal.Title
            text={isBlocked ? "차단해제되었습니다" : "차단되었습니다"}
          />
        </ModalDiv>
      )}
      {!checkBlock && !blockFinish && (
        <div>
          <ModalDiv>
            <ModalHeader>
              <span>{profileData?.nickName}</span>
              <ModalHeaderLine />
              <span>{profileData?.gender === "male" ? "남" : "여"}</span>
              <ModalHeaderLine />
              <span>{Number(profileData?.ageRange) * 10 + "대"}</span>
            </ModalHeader>
            <Img src={profileData?.profileImage} />
            <AddressSpan>
              <img
                style={{ width: "1rem", height: "1rem" }}
                src={LocationSVG}
              />
              {profileData?.address}
            </AddressSpan>
          </ModalDiv>
          {myId !== userId && (
            <Modal.Button
              style={{ width: "100%" }}
              onClick={() => setCheckBlock(true)}
              color={isBlocked ? "blue" : "orange"}
            >
              {isBlocked ? "차단해제" : "차단하기"}
            </Modal.Button>
          )}
        </div>
      )}
    </Modal>
  );
};

const ModalDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 11rem;
`;

const ModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: center;
  font-size: 1.39rem;
  margin-bottom: 1.11rem;
`;

const ModalHeaderLine = styled.div`
  height: 1.11rem;
  width: 0.11rem;
  border-radius: 1px;
  background-color: ${colorTheme.blue300};
  margin: 0 0.33rem;
`;

const Img = styled.img`
  width: 50vw;
  max-width: 500px;
  aspect-ratio: 1;
  border-radius: 1.17rem;
  border: 10px solid ${colorTheme.blue100};
  object-fit: cover;
`;

const AddressSpan = styled.span`
  width: 100%;
  text-align: center;
  font-size: 1rem;
  padding: 1.11rem 0;
`;
