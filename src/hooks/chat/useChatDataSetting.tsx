import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

import { ChatMakeRoom, ChatRoomMember } from "@/api/types/chat-type";
import { useGetBankData } from "@/hooks/queries/useGetBankData";
import { useGetChatRoomData } from "@/hooks/queries/useGetChatRoomData";
import { lastTransferState } from "@/recoil/atoms/last-transfet-state";
import { transferState } from "@/recoil/atoms/transfer-state";

export const useChatDataSetting = (props: ChatMakeRoom) => {
  const setTransfer = useSetRecoilState(transferState);
  const setLastTransfer = useSetRecoilState(lastTransferState);

  const { data: roomData } = useGetChatRoomData(props.roomId);
  const { data: bankData } = useGetBankData();

  useEffect(() => {
    const myId = localStorage.getItem("userId") || "0";
    const users: ChatRoomMember[] =
      roomData?.pages[0].userInfos?.filter(
        (item) => item.userId !== Number(myId),
      ) || [];
    const price: number = roomData ? roomData.pages[0].postInfo.pay : -1;
    const status: boolean =
      roomData?.pages[0].postInfo.status === "TRANSACTION_COMPLETED";
    const dealId: number = roomData ? roomData.pages[0].postInfo.dealId : -1;
    const availableBudget: number = bankData ? bankData.availableBudget : -1;
    const title: string = roomData ? roomData.pages[0].postInfo.title : "";
    // const creatorNickname: string = roomData
    //   ? roomData.pages[0].postInfo.userInfo.creatorNickname
    //   : "";

    setTransfer({
      users: users,
      price: price,
      availableBudget: availableBudget,
      member: users.length,
      postId: props.postId.toString(),
      dealId: dealId,
      transferState: status,
      title: title,
      // creatorNickname: creatorNickname,
    });

    setLastTransfer({
      users: users,
      price: price,
      availableBudget: availableBudget,
      member: users.length,
      postId: props.postId.toString(),
      dealId: dealId,
      transferState: status,
      title: title,
      // creatorNickname: creatorNickname,
    });
  }, [roomData, bankData]);

  // return roomData?.pages[0].messages;
};
