import { useQuery } from "@tanstack/react-query";

import ChatApi from "@/api/chat-api";

export const useGetChatList = (type?: string) => {
  if (type) {
    return useQuery({
      queryKey: ["chat-list", type],
      queryFn: () => ChatApi.getChatList(type),
    });
  } else {
    return useQuery({
      queryKey: ["chat-list"],
      queryFn: () => ChatApi.getChatList(),
    });
  }
};
