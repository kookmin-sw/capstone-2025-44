import { useGetPostIdToChatRoom } from "@/hooks/queries/useGetPostIdToChatRoom";

export const useCheckChatMake = (postId: string | number) => {
  const { data: chatList, error } = useGetPostIdToChatRoom(postId);
  if (error) return "";
  if (chatList) {
    if (chatList.ids.length === 0) return "";
    else return chatList.ids[0];
  }
};
