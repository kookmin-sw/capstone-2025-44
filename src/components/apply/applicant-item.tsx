import { motion } from "framer-motion";
import { MouseEvent, ReactNode, useState } from "react";
import { styled } from "styled-components";

import { ApplicantItemDetailProps } from "./type";

import LeftArrowWhiteSVG from "@/assets/icons/left-arrow-white.svg";
import LocationSVG from "@/assets/icons/location.svg";
import RightArrowWhiteSVG from "@/assets/icons/right-arrow-white.svg";
import DeletedUserBackExistSVG from "@/assets/images/deleted-user-back-exist.svg";
import { colorTheme } from "@/style/color-theme";
import { widthUp2 } from "@/style/keyframes";

type SelectedWrapperProps = {
  selected: boolean;
  onSelect: (event: MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
};
export const SelectedWrapper = ({
  selected,
  onSelect,
  children,
}: SelectedWrapperProps) => {
  const [cancelToggle, setCancelToggle] = useState<boolean>(false);

  return (
    <>
      <SelectedItemWrapper>
        {selected && (
          <SelecteItemBackground
            onClick={() => {
              setCancelToggle(!cancelToggle);
            }}
          >
            {cancelToggle && (
              <CancelButton onClick={onSelect}>취소</CancelButton>
            )}

            <ArrowAbsoluteBox
              animate={cancelToggle ? { left: "30%" } : { left: "0" }}
            >
              <Arrow
                src={cancelToggle ? LeftArrowWhiteSVG : RightArrowWhiteSVG}
              />
              <span>터치</span>
            </ArrowAbsoluteBox>

            <SelectedText>선택완료</SelectedText>
          </SelecteItemBackground>
        )}
        {children}
      </SelectedItemWrapper>
    </>
  );
};

export const ApplicantItem = (props: ApplicantItemDetailProps) => {
  return (
    <SelectedWrapper selected={props.selected} onSelect={props.onSelect}>
      <ApplicantItemWrapper>
        <ApplicantImage>
          <img
            src={
              props.isDeletedUser
                ? DeletedUserBackExistSVG
                : props.applicantInfo.profileImage
            }
          />
        </ApplicantImage>
        {props.isDeletedUser && (
          <ApplicantInfo style={{ justifyContent: "center" }}>
            <ApplicantDeletedUserDiv>알 수 없음</ApplicantDeletedUserDiv>
          </ApplicantInfo>
        )}
        {!props.isDeletedUser && (
          <ApplicantInfo>
            <ApplicantLocation>{props.applicantInfo.address}</ApplicantLocation>
            <ApplicantNickname>
              {props.applicantInfo.nickName}
            </ApplicantNickname>
            <ApplicantMoreInfo>
              도움횟수 {props.applicantInfo.dealCount} <Bullet />{" "}
              {props.applicantInfo.gender === "male" ? "남" : "여"} <Bullet />{" "}
              {props.applicantInfo.ageRange * 10}대
            </ApplicantMoreInfo>
          </ApplicantInfo>
        )}
        {props.isDeleted || props.isDeletedUser ? (
          <ApplyButtonNotClick>선택불가</ApplyButtonNotClick>
        ) : (
          <ApplyButton onClick={props.onSelect}>선택</ApplyButton>
        )}
      </ApplicantItemWrapper>
    </SelectedWrapper>
  );
};

const SelectedItemWrapper = styled.div`
  width: 100%;
  height: 30%;
  position: relative;
`;

const SelecteItemBackground = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 2rem;
  background-color: rgba(37, 54, 89, 0.7);
  z-index: 10;
  & + div {
    filter: blur(1.5px);
  }
`;

const SelectedText = styled.span`
  color: white;
  font-size: 25px;
  font-weight: 600;
  text-align: right;
`;

const CancelButton = styled.button`
  position: absolute;
  width: 30%;
  height: 100%;
  left: 0;
  background-color: ${colorTheme.orange400};
  border: 0;
  color: white;
  font-size: 25px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  animation: ${widthUp2} 1s;
`;

const ApplicantItemWrapper = styled.div`
  height: 100%;
  display: flex;
  padding: 20px 25px;
  gap: 10px;
  border-top: 1px solid #e4e8f1;
  align-items: center;
`;

const ApplicantImage = styled.div`
  height: 100%;
  display: flex;
  position: relative;
  align-items: center;
  & img {
    width: 3.944rem;
    height: 3.944rem;
    aspect-ratio: 1/1;
    border-radius: 10px;
  }
`;

const ApplicantInfo = styled.div`
  display: flex;
  flex: 3;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 2px;
  height: 80%;
  /* height: 100%; */
`;

const ApplicantLocation = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.83rem;
  &::before {
    width: 14px;
    height: 17px;
    border-radius: 1px;
    background-image: url(${LocationSVG});
    background-position: center;
    background-repeat: no-repeat;
    content: " ";
  }
`;

const ApplicantNickname = styled.div`
  color: ${colorTheme.blue900};
  font-size: 1.1rem;
  font-weight: 500;
`;

const ApplicantMoreInfo = styled.div`
  display: flex;
  gap: 4px;
  font-size: 0.72rem;
  align-items: center;
`;

const Bullet = styled.span`
  display: inline-block;
  width: 4px;
  height: 4px;
  background-color: black;
  border-radius: 50%;
`;

const ApplyButton = styled.button`
  flex: 1.1;
  display: flex;
  padding: 30px 10px;
  border: 0;
  border-radius: 15px;
  background-color: #e4e8f1;
  color: ${colorTheme.blue500};
  font-size: 0.8rem;
  justify-content: center;
  align-items: center;
  background-color: ${colorTheme.orange400};
  color: white;
`;

const ApplyButtonNotClick = styled.div`
  flex: 1.1;
  display: flex;
  padding: 30px 10px;
  border: 0;
  border-radius: 15px;
  background-color: #e4e8f1;
  color: ${colorTheme.gray300};
  font-size: 0.8rem;
  justify-content: center;
  align-items: center;
`;

const ApplicantDeletedUserDiv = styled.div`
  font-size: 1.11rem;
  color: #d9d9d9;
`;

const Arrow = styled.img`
  width: 2.39rem;
  height: 1.25rem;
`;

const ArrowAbsoluteBox = styled(motion.div)`
  width: 2.39rem;
  height: 100%;
  display: flex;
  position: absolute;
  left: 0;
  top: 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
  color: white;
  font-size: 1rem;
  margin-left: 10%;
`;
