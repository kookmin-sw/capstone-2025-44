import Instance from "./axios-instance";
import {
  ChatFinalResponse,
  ChatListResponse,
  ChatMakeRequest,
  ChatMakeRoom,
  ChatRoomResponse,
  ChatSendRequest,
} from "./types/chat-type";

import { devLog } from "@/utils/dev-log";

export default class ChatApi {
  // 메세지 보내기
  static async sendChatMessages({ message, roomId }: ChatSendRequest) {
    const response = await Instance.post(
      `/chat-service/api/chats/${roomId}/message`,
      message,
    );
    if (response) {
      return response.status;
    } else {
      throw new Error("Invalid response from server");
    }
  }

  // 채팅방 리스트 가져오기
  static async getChatList(type?: string) {
    const response = type
      ? await Instance.get(`/chat-service/api/chatrooms?status=${type}`)
      : await Instance.get(`/chat-service/api/chatrooms`);
    devLog(response);
    if (response) {
      const temp = response.data as ChatListResponse;
      return temp.result;
    } else {
      throw new Error("Invalid response from server");
    }
  }

  // 채팅방 디테일 멤버 정보랑 채팅내역 가져오기
  static async getChatRoomData(data: {
    chatRoomId: string;
    page: number;
    size: number;
  }) {
    const response = await Instance.get(
      `/chat-service/api/chats/${data.chatRoomId}?pagingIndex=${data.page}&pagingSize=${data.size}`,
    );
    if (response) {
      const temp = response.data as ChatRoomResponse;
      return temp.result;
    } else {
      throw new Error("Invalid response from server");
    }
  }

  // 채팅방 새로 만들기
  static async postChatMake(data: ChatMakeRequest) {
    const response = await Instance.post(`/chat-service/api/chatrooms`, data);
    if (response) {
      const temp = response.data as ChatFinalResponse<ChatMakeRoom>;
      return temp.result;
    } else {
      throw new Error("Invalid response from server");
    }
  }

  static async postAddingNewMember(data: {
    chatRoomId: string;
    addingData: ChatMakeRequest;
  }) {
    const response = await Instance.patch(
      `/chat-service/api/chatrooms/${data.chatRoomId}/members`,
      { postId: data.addingData.postId, memberIds: data.addingData.memberIds },
      {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
        withCredentials: true,
      },
    );
    if (response) {
      const temp = response.data as ChatFinalResponse<ChatMakeRoom>;
      return temp.result;
    } else {
      throw new Error("Invalid response from server");
    }
  }

  static async postIdToChatRoom(postId: string | number) {
    const response = await Instance.get(
      `/chat-service/api/chatrooms/post/${postId}`,
    );
    if (response) {
      const temp = response.data as ChatFinalResponse<{ ids: string[] }>;
      return temp.result;
    } else {
      throw new Error("Invalid response from server");
    }
  }
}
