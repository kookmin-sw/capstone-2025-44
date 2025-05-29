import { styled } from "styled-components";

import { ChatItemType } from "./type";

import ChatCreatorIconSVG from "@/assets/icons/chat-creator-icon.svg";
import { colorTheme } from "@/style/color-theme";
import { ChatdateToMsgtype } from "@/utils/chatdate-to-msgtype";

export const ChatItem = ({
  userId,
  imgurl,
  userName,
  setProfileModal,
  setProfileUserId,
  setDeletedProfileModal,
  date,
  msg,
  creator,
}: ChatItemType) => {
  const tempId = localStorage.getItem("userId");
  const myId = tempId ? Number(tempId) : -1;

  return (
    <Container
      style={{
        justifyContent: userId === myId ? "flex-end" : "flex-start",
      }}
      className="chat-item"
    >
      {userId === myId && (
        <DateDiv>{date ? ChatdateToMsgtype(date) : ""}</DateDiv>
      )}
      <RowBox>
        {userId !== myId && (
          <ProfileImg
            onClick={() => {
              if (userId !== -2) {
                setProfileUserId(Number(userId));
                setProfileModal(true);
              } else {
                setDeletedProfileModal(true);
              }
            }}
            src={imgurl}
          ></ProfileImg>
        )}
        <ChatColumnBox
          style={{
            alignItems: userId === myId ? "flex-end" : "flex-start",
            marginRight: userId === myId ? "1.28rem" : "0rem",
          }}
        >
          {userId !== myId && (
            <NameDiv>
              {userName} {creator && <CreatorIcon src={ChatCreatorIconSVG} />}
            </NameDiv>
          )}
          <ChatBox
            style={{
              backgroundColor:
                userId === myId ? colorTheme.blue100 : colorTheme.blue300,
            }}
          >
            <ChatText>
              {msg.split("\\n").map((t, idx) => (
                <div key={idx}>{t}</div>
              ))}
            </ChatText>
          </ChatBox>
        </ChatColumnBox>
      </RowBox>
      {userId !== myId && (
        <DateDiv>{date ? ChatdateToMsgtype(date) : ""}</DateDiv>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  margin-bottom: 3.14%;
  height: auto;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 0.5rem;
`;

const ProfileImg = styled.img`
  width: 2.22rem;
  height: 2.22rem;
  margin: 0.6rem 1rem 0 1.78rem;
  border-radius: 0.83rem;
  background-color: #d9d9d9;
`;

const ChatBox = styled.div`
  max-width: 100%;
  height: auto;
  width: auto;
  padding: 0.5rem 0.61rem;
  border-radius: 0.28rem;
`;

const ChatText = styled.div`
  color: black;
  font-size: 1.2rem;
  white-space: pre-wrap;
`;

const ChatColumnBox = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 12.9rem;
  gap: 0.4rem;
`;

const NameDiv = styled.div`
  font-size: 0.83rem;
  color: #707379;
`;

const DateDiv = styled.div`
  font-size: 0.56rem;
  color: #707379;
`;

const RowBox = styled.div`
  display: flex;
  direction: row;
  align-items: flex-start;
`;

const CreatorIcon = styled.img`
  width: 0.78rem;
  height: 0.56rem;
`;
