import { styled } from "styled-components";

import { ChatListItem } from "./chat-list-item";
import { ChatRoomItemType } from "./type";

import ChatListEmptySVG from "@/assets/images/chat-list-empty.svg";
import { useGetChatList } from "@/hooks/queries/useGetChatList";

export const ChatList = ({ type }: { type: string }) => {
  const { data: chatList } = useGetChatList(type);

  return (
    <ScrollContainer>
      {chatList ? (
        chatList?.map((item, index) => {
          const tempItem: ChatRoomItemType = {
            roomId: item.roomId,
            postId: item.postId,
            memberCount: item.memberCount,
            postTitle: item.title,
            postStatus: item.status,
            time: "",
            chatMsg: "",
            msgNum: 0,
            creatorId: item.creatorId,
            startDate: item.startDate,
            creatorNickname: item.creatorNickname,
            location: item.location,
            deletedPost: item.deletedPost,
            blockedRoom: item.blockedRoom,
            creatorProfileImg: item.creatorProfileImg,
          };
          return <ChatListItem key={index} {...tempItem} />;
        })
      ) : (
        <EmptyImg src={ChatListEmptySVG} />
      )}
    </ScrollContainer>
  );
};

const ScrollContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
`;

const EmptyImg = styled.img`
  width: 18.16rem;
  height: 18.16rem;
`;
