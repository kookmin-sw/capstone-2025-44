import { useInfiniteQuery } from "@tanstack/react-query";

import ChatApi from "@/api/chat-api";

export const useGetChatRoomData = (roomId: string) => {
  return useInfiniteQuery({
    queryKey: ["chat-room", roomId],
    queryFn: ({ pageParam }) => {
      let size = 20;
      if (pageParam === 0 || pageParam === 1) size = 10;
      return ChatApi.getChatRoomData({
        chatRoomId: roomId,
        page: pageParam,
        size: size,
      });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.messages.length !== 0 ? allPages.length : undefined;
    },
  });
};
