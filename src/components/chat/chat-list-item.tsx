import { useNavigate } from "react-router";
import { styled } from "styled-components";

import { ChatRoomItemType } from "./type";

import dateSVG from "@/assets/icons/date.svg";
import locationSVG from "@/assets/icons/location.svg";
import PersonOrangeSVG from "@/assets/icons/person-orange.svg";
import { colorTheme } from "@/style/color-theme";
import { BackdateToItemtype } from "@/utils/backdate-to-itemtype";

export const ChatListItem = (props: ChatRoomItemType) => {
  const navigate = useNavigate();

  const HandlerEnterRoom = () => {
    navigate(`/chat/detail`, {
      state: {
        roomId: props.roomId,
        postId: props.postId,
        memberCount: props.memberCount,
        creatorId: props.creatorId,
        deletedPost: props.deletedPost,
        blockedRoom: props.blockedRoom,
      },
    });
  };
  return (
    <ItemContainer onClick={HandlerEnterRoom}>
      <RowDiv>
        {!props.deletedPost &&
          !props.blockedRoom &&
          props.postStatus === "TRANSACTION_COMPLETED" && (
            <LeftColumnDiv style={{ padding: 0 }}>
              <ProfileImg $image={props.creatorProfileImg}>
                {props.memberCount > 1 && (
                  <MemberCount>
                    {"+ "}
                    {props.memberCount - 1}
                  </MemberCount>
                )}
              </ProfileImg>
              <StateFinishDiv>진행완료</StateFinishDiv>
            </LeftColumnDiv>
          )}
        {!props.deletedPost &&
          !props.blockedRoom &&
          props.postStatus !== "TRANSACTION_COMPLETED" && (
            <LeftColumnDiv style={{ padding: 0 }}>
              <ProfileImg $image={props.creatorProfileImg}>
                {props.memberCount > 1 && (
                  <MemberCount>
                    {"+ "}
                    {props.memberCount - 1}
                  </MemberCount>
                )}
              </ProfileImg>
              <StateDiv>진행중</StateDiv>
            </LeftColumnDiv>
          )}
        {props.deletedPost && !props.blockedRoom && (
          <BlockRoom>{"삭제된\n게시글"}</BlockRoom>
        )}
        {!props.deletedPost && props.blockedRoom && (
          <BlockRoom>{"작성자\n탈퇴"}</BlockRoom>
        )}
        <LeftColumnDiv style={{ width: "100%" }}>
          <TitleText>
            {props.postTitle}{" "}
            {props.deletedPost
              ? "(삭제된 게시글)"
              : props.blockedRoom
                ? "(작성자 탈퇴)"
                : ""}
          </TitleText>
          <ContentText>
            <IconImg src={PersonOrangeSVG} />
            {" " + props.creatorNickname + "   "}
          </ContentText>
          <ContentText>
            <IconImg src={dateSVG} />
            {" " + BackdateToItemtype(props.startDate) + "   "}
          </ContentText>
          <ContentText>
            <IconImg src={locationSVG} />
            {" " + props.location + "   "}
          </ContentText>
        </LeftColumnDiv>
      </RowDiv>
      {/* <RightColumnDiv>
        <NewMsgNum
          style={{ visibility: props.msgNum !== 0 ? "visible" : "hidden" }}
        >
          {props.msgNum}
        </NewMsgNum>
        <ItemText style={{ color: "#d9d9d9" }}>{props.time}</ItemText>
      </RightColumnDiv> */}
    </ItemContainer>
  );
};

const ItemContainer = styled.div`
  width: 100%;
  padding: 1.11rem 7.95% 1.11rem 6.92%;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #d9d9d9;
  align-items: center;
`;

const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const ProfileImg = styled.div<{ $image: string }>`
  height: 2.67rem;
  width: 2.67rem;
  background-image: url(${({ $image }) => $image});
  background-size: 2.67rem 2.67rem;
  color: #ffffff;
  text-align: center;
  font-size: 0.72rem;
  border-radius: 0.83rem;
  line-height: 3rem;
  position: relative;
`;

const MemberCount = styled.div`
  height: 1.1rem;
  padding: 0 0.2rem;
  text-align: center;
  font-size: 0.62rem;
  font-weight: bold;
  border-radius: 0.3rem;
  line-height: 1.1rem;
  border: 1px solid ${colorTheme.orange400};
  background-color: #f17447a2;
  color: white;
  position: absolute;
  bottom: 0;
  right: 0;
`;

const StateDiv = styled.div`
  height: 1.3rem;
  width: 2.67rem;
  background-color: ${colorTheme.orange400};
  color: #ffffff;
  text-align: center;
  font-size: 0.72rem;
  border-radius: 0.4rem;
  line-height: 1.3rem;
`;

const StateFinishDiv = styled.div`
  height: 1.3rem;
  width: 2.67rem;
  background-color: #ffffff;
  color: ${colorTheme.orange400};
  border: 1px solid ${colorTheme.orange400};
  line-height: 3rem;
  text-align: center;
  font-size: 0.62rem;
  border-radius: 0.4rem;
  line-height: 1.3rem;
`;

const LeftColumnDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 0 0 4.61%;
  gap: 0.33rem;
`;

const TitleText = styled.span`
  width: 100%;
  font-size: 1.11rem;
  font-weight: bold;
  padding-bottom: 0.2rem;
`;

// const NewMsgNum = styled.span`
//   font-size: 0.56rem;
//   text-align: center;
//   padding: 0.17rem;
//   width: 100%;
//   border-radius: 0.5rem;
//   background-color: ${colorTheme.orange400};
//   color: #ffffff;
// `;

// const ItemText = styled.span`
//   font-size: 0.56rem;
// `;

const ContentText = styled.span`
  font-size: 0.83rem;
  color: #828282;
`;

// const RightColumnDiv = styled.div`
//   display: flex;
//   height: 2.7rem;
//   flex-direction: column;
//   align-items: flex-end;
//   padding: 0 0 0 4.61%;
//   gap: 0.33rem;
//   width: 20%;
// `;

const IconImg = styled.img`
  width: 0.56rem;
  height: 0.56rem;
`;

const BlockRoom = styled.div`
  display: flex;
  height: 3rem;
  width: 3.56rem;
  background-color: #6e6e6e;
  color: #ffffff;
  text-align: center;
  font-size: 0.72rem;
  border-radius: 1.22rem;
  line-height: 0.85rem;
  white-space: pre-line;
  align-items: center;
  justify-content: center;
`;
