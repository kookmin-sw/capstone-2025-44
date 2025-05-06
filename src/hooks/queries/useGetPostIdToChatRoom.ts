import { useQuery } from "@tanstack/react-query";

import ChatApi from "@/api/chat-api";

export const useGetPostIdToChatRoom = (postId: string | number) => {
  return useQuery({
    queryKey: ["chat-room-ids", postId],
    queryFn: () => ChatApi.postIdToChatRoom(postId),
  });
};
