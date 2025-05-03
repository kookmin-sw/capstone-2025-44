import { Stomp, CompatClient } from "@stomp/stompjs";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";

import { ChatRoomData, ChatRoomSubMessage } from "./type";

import { ApplicantListBottomSheetChat } from "@/components/apply/applicant-list-bottom-sheet-chat";
import { ChatAppBar } from "@/components/chat/chat-app-bar";
import { ChatAppBarBlock } from "@/components/chat/chat-app-bar-block";
import { ChatEntryExit } from "@/components/chat/chat-entry-exit";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatItem } from "@/components/chat/chat-item";
import { BottomSheet } from "@/components/common/bottom-sheet";
import { DeletedProfileModal } from "@/components/common/deleted-profile-modal";
import { Modal } from "@/components/common/modal";
import { ProfileModal } from "@/components/common/profile-modal";
import { Report } from "@/components/report/report";
import { Transfer } from "@/components/transfer/transfer";
import { useChatDataSetting } from "@/hooks/chat/useChatDataSetting";
import { useGetChatRoomData } from "@/hooks/queries/useGetChatRoomData";
import { UseSendMessages } from "@/hooks/queries/useSendMessages";
import { transferState } from "@/recoil/atoms/transfer-state";
import { FormatDateString } from "@/utils/format-date-string";

export const ChatRoom = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as ChatRoomData;

  const [transfer] = useRecoilState(transferState);
  const [newRoomMsgs, setNewRoomMsgs] = useState<ChatRoomSubMessage[]>([]);

  useChatDataSetting(state);
  const { data: roomData, fetchNextPage } = useGetChatRoomData(state.roomId);

  const [appBarHeight, setAppBarHeight] = useState(0);
  const [appBerVisibility, setAppBarVisibility] = useState(true);
  const chatListRef = useRef<HTMLDivElement | null>(null);
  const [pageMsgs, setPageMsgs] = useState(false);

  const [isBottomSheetOpened, setIsBottomSheetOpened] = useState(false);
  const [isTransfer, setIsTransfer] = useState(false);
  const [isReport, setIsReport] = useState(false);
  const [reportModal, setReportModal] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const [deletedProfileModal, setDeletedProfileModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [transferErrorModal, setTransferErrorModal] = useState(false);
  const [leaveModal, setLeaveModal] = useState(false);

  const [profileUserId, setProfileUserId] = useState<number>(0);
  const [isApplySheet, setIsApplySheet] = useState(false);
  const [applyLength, setApplyLength] = useState(0);
  const [isEmptyItem, setIsEmptyItem] = useState(false);

  const client = useRef<CompatClient | null>(null);
  const { mutate: sendMsg } = UseSendMessages();
  const tempId = localStorage.getItem("userId");
  const myId = tempId === null ? "" : tempId;
  const tempNickName = localStorage.getItem("nickName");
  const myNickName = tempNickName === null ? "" : tempNickName;
  const [isConnected, setIsConnected] = useState(false);

  const connectHandler = () => {
    const socket = new WebSocket(
      `${process.env.REACT_APP_CHAT_WS_BASE_URL}/ws/init`,
    );
    client.current = Stomp.over(socket);

    // 운영 환경에서는 디버깅(destination, endpoints 노출) 안되도록 설정 
    client.current.debug = () => {};

    client.current.connect({}, () => {
      setIsConnected(true);
      const subscription = client.current?.subscribe(
        `/sub/room/${state.roomId}`,
        (message) => {
          const temp = JSON.parse(message.body) as ChatRoomSubMessage;

          if (temp.type === "LEAVE" && temp.message.includes(myNickName)) {
            setLeaveModal(true);
            if (subscription) subscription.unsubscribe();
          } else {
            setNewRoomMsgs((prevHistory) => {
              return prevHistory ? [...prevHistory, temp] : [];
            });
          }
        },
      );
    });
  };
  useEffect(() => {
    if (!pageMsgs) {
      setNewRoomMsgs([]);
    } else {
      setPageMsgs(false);
      if (chatListRef.current) {
        const firstItem = chatListRef.current.firstChild as HTMLElement | null;
        if (firstItem) {
          const firstItemHeight = firstItem.clientHeight || 0;
          chatListRef.current.scrollTop = firstItemHeight;
        }
      }
    }
    if (chatListRef.current) {
      setIsEmptyItem(chatListRef.current.children.length === 0);
    }
  }, [roomData]);

  const handlePagenation = () => {
    void fetchNextPage();
    setPageMsgs(true);
  };

  useEffect(() => {
    if (!isConnected) {
      connectHandler();
    }

    return () => {
      if (isConnected && client.current) {
        client.current.disconnect(() => {
          setIsConnected(false);
        });
      }
    };
  }, [isConnected]);

  useEffect(() => {
    const handleScroll = () => {
      if (chatListRef.current) {
        if (chatListRef.current.scrollTop === 0) {
          handlePagenation();
        }
      }
    };

    chatListRef.current?.addEventListener("scroll", handleScroll);
    return () => {
      chatListRef.current?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToBottom = () => {
    if (chatListRef.current !== null)
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
  };

  useEffect(() => {
    scrollToBottom();
  }, [newRoomMsgs]);

  useEffect(() => {
    if (chatListRef.current) {
      const chatItems = chatListRef.current.querySelectorAll(".chat-item");
      const chatItems2 = chatListRef.current.querySelectorAll(
        ".chat-entry-exit-item",
      );
      setIsEmptyItem(chatItems.length + chatItems2.length === 0);
    }
  }, [newRoomMsgs, roomData]);

  const refreshPage = () => {
    navigate(`/chat/detail`, {
      state: {
        roomId: state.roomId,
        postId: state.postId,
        memberCount: applyLength + 1,
        creatorId: state.creatorId,
        deletedPost: state.deletedPost,
        blockedRoom: state.blockedRoom,
      },
      replace: true,
    });
  };

  const sendHandler = (inputValue: string) => {
    if (client.current && client.current.connected) {
      const temp = {
        type: "CHAT",
        roomIdx: state.roomId,
        message: inputValue,
        userId: myId,
        createdAt: FormatDateString(new Date()),
      };
      client.current.send(
        `/chat/room/${state.roomId}/message`,
        {},
        JSON.stringify(temp),
      );
    }
  };

  const handleSendMessage = (inputValue: string) => {
    sendHandler(inputValue);
    sendMsg({ roomId: state.roomId, message: inputValue });
  };

  return (
    <PageContainer>
      {appBerVisibility && !state.blockedRoom && !state.deletedPost && (
        <ChatAppBar
          onClickTransfer={() => {
            setIsBottomSheetOpened(true);
            setIsTransfer(true);
          }}
          setAppBarHeight={setAppBarHeight}
          onClickReport={() => {
            setIsBottomSheetOpened(true);
            setIsReport(true);
          }}
          postId={state.postId.toString()}
          setErrorModal={() => {
            setErrorModal(true);
          }}
          creatorId={state.creatorId}
          onClickApply={() => {
            setIsBottomSheetOpened(true);
            setIsApplySheet(true);
          }}
          memberCount={state.memberCount}
          setTransferErrorModal={() => {
            setTransferErrorModal(true);
          }}
          isEmpty={isEmptyItem}
        />
      )}
      {(state.blockedRoom || state.deletedPost) && (
        <ChatAppBarBlock
          setAppBarHeight={setAppBarHeight}
          isDelted={state.deletedPost}
          isBlocked={state.blockedRoom}
        />
      )}
      <ChatList
        ref={chatListRef}
        style={{
          paddingTop: appBerVisibility ? `${appBarHeight + 10}px` : "10px",
        }}
      >
        {roomData?.pages
          .slice(0)
          .reverse()
          .map((page, idx) => {
            return (
              <div key={idx} style={{ width: "100%" }}>
                {page.messages
                  .slice(0)
                  .reverse()
                  .map((item, index) => {
                    if (item.senderInfo !== null) {
                      return (
                        <ChatItem
                          key={index}
                          userId={
                            item.senderInfo.deleted
                              ? -2
                              : item.senderInfo.userId
                          }
                          userName={
                            item.senderInfo.deleted
                              ? "(알 수 없음)"
                              : item.senderInfo.nickName
                          }
                          setProfileModal={setProfileModal}
                          setProfileUserId={setProfileUserId}
                          imgurl={
                            item.senderInfo.deleted
                              ? undefined
                              : item.senderInfo.profileImage
                          }
                          setDeletedProfileModal={setDeletedProfileModal}
                          date={item.createdAt}
                          msg={item.message.replace(/^"(.*)"$/, "$1")}
                          creator={item.senderInfo.creator}
                        />
                      );
                    } else if (item.type === "JOIN" || item.type === "LEAVE") {
                      return (
                        <ChatEntryExit
                          key={`${idx}-${index}`}
                          msg={item.message}
                        />
                      );
                    }
                  })}
              </div>
            );
          })}
        {newRoomMsgs?.map((item, index) => {
          const temp = transfer.users.find((e) => {
            if (e.userId === Number(item.userId)) return e;
          });
          if (item.type === "CHAT") {
            return (
              <ChatItem
                key={index}
                userId={
                  temp
                    ? Number(item.userId)
                    : item.userId === myId
                      ? Number(myId)
                      : -2
                }
                userName={temp ? temp.nickName : "(알 수 없음)"}
                setProfileModal={setProfileModal}
                setProfileUserId={setProfileUserId}
                imgurl={temp ? temp.profileImage : undefined}
                setDeletedProfileModal={setDeletedProfileModal}
                date={item.createdAt}
                msg={item.message.replace(/^"(.*)"$/, "$1")}
                creator={
                  roomData
                    ? item.userId ===
                      roomData.pages[0].postInfo.userInfo.userId.toString()
                    : false
                }
              />
            );
          } else {
            return <ChatEntryExit key={index} msg={item.message} />;
          }
        })}
      </ChatList>
      <ChatInput
        onFocus={setAppBarVisibility}
        onClick={handleSendMessage}
        blockedRoom={state.blockedRoom}
      />
      {!state.deletedPost && !state.blockedRoom && (
        <BottomSheet
          style={{ height: window.innerHeight > 720 ? "81%" : "90%" }}
          isOpened={isBottomSheetOpened}
          onChangeIsOpened={() => {
            setIsBottomSheetOpened(false);
            setIsReport(false);
            setIsTransfer(false);
            setIsApplySheet(false);
          }}
        >
          {isTransfer && (
            <Transfer
              onClick={() => {
                setIsBottomSheetOpened(false);
                setIsTransfer(false);
              }}
              memberCount={state.memberCount}
            />
          )}
          {isReport && (
            <Report
              postId={state.postId.toString()}
              onSuccessReport={() => {
                setIsBottomSheetOpened(false);
                setIsReport(false);
                setReportModal(true);
              }}
              creatorId={state.creatorId}
            />
          )}
          {isApplySheet && (
            <ApplicantListBottomSheetChat
              postId={state.postId.toString()}
              chatId={state.roomId}
              onFinishApply={() => {
                setIsApplySheet(false);
                setIsBottomSheetOpened(false);
              }}
              isApplyChange={() => {
                refreshPage();
              }}
              setApplyLength={setApplyLength}
            />
          )}
        </BottomSheet>
      )}
      {reportModal && (
        <Modal
          onClose={() => {
            setReportModal(false);
            navigate("/chat");
          }}
        >
          <Modal.Title text="신고가 접수되었습니다." />
        </Modal>
      )}
      {profileModal && (
        <ProfileModal
          userId={profileUserId}
          onClose={() => {
            setProfileModal(false);
          }}
        />
      )}
      {errorModal && (
        <Modal
          onClose={() => {
            setErrorModal(false);
          }}
        >
          <Modal.Title text="아직 지원하지 않는 \n 서비스입니다." />
        </Modal>
      )}
      {transferErrorModal && (
        <Modal
          onClose={() => {
            setTransferErrorModal(false);
          }}
        >
          <Modal.Title text="채팅방에 소속된 유저가 없어 \n 송금할 수 없습니다." />
        </Modal>
      )}
      {deletedProfileModal && (
        <DeletedProfileModal
          onClose={() => {
            setDeletedProfileModal(false);
          }}
        />
      )}
      {leaveModal && (
        <Modal
          onClose={() => {
            setLeaveModal(false);
            navigate("/chat", { replace: true });
          }}
        >
          <Modal.Title text="해당 거래에서\n제외되셨습니다." />
          <Modal.Button
            onClick={() => {
              navigate("/chat", { replace: true });
            }}
            style={{ fontSize: "1.5rem" }}
          >
            이전 화면으로 이동
          </Modal.Button>
        </Modal>
      )}
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
  height: 100%;
`;

const ChatList = styled.div`
  overflow: scroll;
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
  padding-bottom: 3.89rem;
`;
