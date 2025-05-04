import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { styled } from "styled-components";

import { PostType } from "@/api/types/post-type";
import BackBlackSVG from "@/assets/icons/back-black.svg";
import { ApplicantListBottomSheetPost } from "@/components/apply/applicant-list-bottom-sheet-post";
import { ActivityBox } from "@/components/common/activity-box";
import { AppBar } from "@/components/common/app-bar";
import { BottomFixed } from "@/components/common/bottom-fixed";
import { BottomSheet } from "@/components/common/bottom-sheet";
import { Button } from "@/components/common/button";
import { Modal } from "@/components/common/modal";
import { ProfileModal } from "@/components/common/profile-modal";
import { DefaultLayout } from "@/components/layout/default-layout";
import { PostDetailCategory } from "@/components/post/post-detail-category";
import { Report } from "@/components/report/report";
import { useCheckChatMakePost } from "@/hooks/chat/useCheckChatMakePost";
import { useDeleteApply } from "@/hooks/queries/useDeleteApply";
import { useDeletePost } from "@/hooks/queries/useDeletePost";
import { useGetPostDetail } from "@/hooks/queries/useGetPostDetail";
import { usePostApply } from "@/hooks/queries/usePostApply";
import { usePullUp } from "@/hooks/queries/usePullUp";
import { postState } from "@/recoil/atoms/post-state";
import { colorTheme } from "@/style/color-theme";
import { devLog } from "@/utils/dev-log";

type LocationType = {
  state: {
    replace?: string;
  };
};
export const PostDetailPage = () => {
  const { postId } = useParams();

  const [editModal, setEditModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false); // TODO: remove this
  const [deleteModal, setDeleteModal] = useState(false);
  const [statusModal, setStatusModal] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  // const [reportModal, setReportModal] = useState(false);
  const [repostModal, setRepostModal] = useState(false);
  const [bottomSheet, setBottomSheet] = useState(false);
  const [reportBottomSheetRendering, setReportBottomSheetRendering] =
    useState(false);
  const [isApplySheet, setIsApplySheet] = useState(false);

  const [applyModal, setApplyModal] = useState<boolean>(false);

  const { data } = useGetPostDetail(postId!);
  const chatData = useCheckChatMakePost(postId!);
  const setPost = useSetRecoilState(postState);
  const { mutate: deletePost } = useDeletePost(postId!);
  const { mutate: applyActivity } = usePostApply(postId!);
  const { mutate: cancelActivity } = useDeleteApply(postId!);
  const { mutate: pullUp } = usePullUp(postId!);

  const navigate = useNavigate();
  const location = useLocation() as LocationType;

  useEffect(() => {
    if (data) setPost(data);
    devLog(location);
  }, [data]);

  return (
    <DefaultLayout
      scrollbar
      appbar={
        <AppBar>
          <AppBar.AppBarNavigate>
            <StyledButton
              onClick={() => {
                location.state?.replace
                  ? navigate(location.state.replace)
                  : navigate(-1);
              }}
            >
              <BackButtonSVG src={BackBlackSVG} />
            </StyledButton>
          </AppBar.AppBarNavigate>
        </AppBar>
      }
    >
      <PaddingWrapper $isWriter={data?.userCurrentStatus.writer ?? false}>
        {/* {data?.marketPostResponse.status === "RECRUITING" ? (
          data?.userCurrentStatus.writer ? (
            <JustifyWrapper>
              <Button
                color="orange"
                onClick={() => {
                  setErrorModal(true);
                }}
              >
                모집완료
              </Button>
              <Button
                color="orange"
                onClick={() => {
                  setEditModal(true);
                }}
              >
                편집하기
              </Button>
            </JustifyWrapper>
          ) : (
            <></>
          )
        ) : (
          <DoneWrapper>모집완료</DoneWrapper>
        )} */}
        <RowBox>
          <PostDetailCategory
            category={data?.marketPostResponse.categoryId ?? 7}
          />
          <RowBoxInRow onClick={() => setProfileModal(true)}>
            <ProfileImg
              src={data ? data.marketPostResponse.writerInfo.profileImage : ""}
            />
            <ProfileName>
              {data?.marketPostResponse.writerInfo.nickName ?? ""}
            </ProfileName>
          </RowBoxInRow>
        </RowBox>
        <ActivityBox data={{ ...data?.marketPostResponse } as PostType} />
        {!data?.userCurrentStatus.writer && (
          <ButtonWrapper>
            <Button
              rounded
              color="orange"
              onClick={() => {
                setBottomSheet(true);
                setReportBottomSheetRendering(true);
              }}
            >
              신고
            </Button>
          </ButtonWrapper>
        )}
        <BottomSheet
          style={{ height: window.innerHeight > 720 ? "81%" : "90%" }}
          isOpened={bottomSheet}
          onChangeIsOpened={() => {
            setReportBottomSheetRendering(false);
            setBottomSheet(false);
            setIsApplySheet(false);
          }}
        >
          {reportBottomSheetRendering && (
            <Report
              postId={data?.marketPostResponse.postId.toString() ?? ""}
              onSuccessReport={() => {
                setReportBottomSheetRendering(false);
                setBottomSheet(false);
                // setReportModal(true);
              }}
              creatorId={data?.marketPostResponse.writerInfo.userId.toString()}
            />
          )}
          {isApplySheet && (
            <ApplicantListBottomSheetPost
              postId={postId!}
              onFinishApply={() => {
                setIsApplySheet(false);
                setBottomSheet(false);
              }}
            />
          )}
        </BottomSheet>
        {/* {reportModal && (
          <Modal
            onClose={() => {
              setReportModal(false);
            }}
          >
            <Modal.Title text="신고가 접수되었습니다." />
          </Modal>
        )} */}

        {/** BottomFixed Buttons */}
        <BottomFixed alignDirection="column">
          {data?.userCurrentStatus.writer ? (
            data?.marketPostResponse.status === "RECRUITING" ? (
              <>
                <RowContainer>
                  <BottomFixed.Button 
                      style={{ backgroundColor: "#e4e8f1", color: "#253659" }}
                      onClick={() => {
                        if (data && data?.marketPostResponse.currentApplicant > 0) {
                          setErrorModal(true); // temp
                        } else {
                          navigate("edit");
                        }
                      }}
                  >
                    수정하기
                  </BottomFixed.Button>
                  <BottomFixed.Button 
                    style={{ backgroundColor: "#e4e8f1", color: "#eb5242" }}
                    onClick={() => setDeleteModal(true)}
                  >
                    삭제하기
                  </BottomFixed.Button>
                </RowContainer>
                <BottomFixed.Button onClick={() => setRepostModal(true)}>
                  끌어올리기
                </BottomFixed.Button>
                <BottomFixed.Button
                  onClick={() => {
                    setBottomSheet(true);
                    setIsApplySheet(true);
                  }}
                >
                  참여관리
                </BottomFixed.Button>
              </>
            ) : (
              <>
                <BottomFixed.Button
                  onClick={() => {
                    if (chatData !== null) {
                      navigate(`/chat/detail`, {
                        state: {
                          roomId: chatData.roomId,
                          postId: chatData.postId,
                          memberCount: chatData.memberCount,
                          creatorId: chatData.creatorId,
                        },
                      });
                    }
                  }}
                >
                  채팅방으로 가기
                </BottomFixed.Button>
                {data?.marketPostResponse.status ===
                  "RECRUITMENT_COMPLETED" && (
                  <BottomFixed.Button
                    onClick={() => {
                      setBottomSheet(true);
                      setIsApplySheet(true);
                    }}
                  >
                    참여관리
                  </BottomFixed.Button>
                )}
              </>
            )
          ) : data?.marketPostResponse.status === "RECRUITING" ? (
            !data?.userCurrentStatus.applicant ? (
              <BottomFixed.Button
                color="orange"
                onClick={() => {
                  setApplyModal(true);
                }}
              >
                신청하기
              </BottomFixed.Button>
            ) : (
              <BottomFixed.Button
                style={{ backgroundColor: "#e4e8f1", color: "#eb5242" }}
                onClick={() => {
                  setApplyModal(true);
                }}
              >
                신청 취소하기
              </BottomFixed.Button>
            )
          ) : (
            <></>
          )}
        </BottomFixed>

        {/** Modal */}
        {applyModal &&
          (!data?.userCurrentStatus.applicant ? (
            <Modal
              onClose={() => {
                setApplyModal(false);
                applyActivity();
              }}
            >
              <EmptyBox>
                <Modal.Title text="신청되었습니다" />
              </EmptyBox>
            </Modal>
          ) : (
            <Modal onClose={() => setApplyModal(false)}>
              <Modal.Title text="신청을\n취소하시겠습니까?" />
              <Modal.Button
                color="orange"
                onClick={() => {
                  const userIdTemp = localStorage.getItem("userId");
                  if (userIdTemp)
                    cancelActivity({
                      applyId: data.userCurrentStatus.applyId,
                      userId: Number(userIdTemp),
                    });
                  setApplyModal(false);
                }}
              >
                취소하기
              </Modal.Button>
            </Modal>
          ))}
        {repostModal && (
          <Modal onClose={() => setRepostModal(false)}>
            <Modal.Title text="게시물을\n끌어올릴까요?" />
            <p>
              끌어올릴 시 전체 게시물
              <br />
              상단으로 올라갑니다
            </p>
            <Modal.Button
              color="orange"
              onClick={() => {
                setRepostModal(false);
                pullUp();
              }}
            >
              끌어올리기
            </Modal.Button>
          </Modal>
        )}
        {statusModal && (
          <Modal onClose={() => setStatusModal(false)}>
            <Modal.Title text="모집을\n끝내시겠습니까?" />

            <Modal.Button color="orange">모집종료</Modal.Button>
          </Modal>
        )}
        {editModal && (
          <Modal onClose={() => setEditModal(false)}>
            <Modal.Title text="편집하시겠습니까?" />
            <EditModalButtonWrapper>
              <Modal.Button
                color="orange"
                onClick={() => {
                  if (data && data?.marketPostResponse.currentApplicant > 0) {
                    setErrorModal(true); // temp
                  } else {
                    navigate("edit");
                  }
                  setEditModal(false);
                  setErrorModal(true);
                }}
              >
                수정하기
              </Modal.Button>
              <Modal.Button
                onClick={() => {
                  setEditModal(false);
                  setDeleteModal(true);
                }}
              >
                삭제하기
              </Modal.Button>
            </EditModalButtonWrapper>
          </Modal>
        )}
        {deleteModal && (
          <Modal onClose={() => setDeleteModal(false)}>
            <Modal.Title text="게시글을 삭제할까요?" />
              <DeleteModalButtonWrapper>
                <Modal.Button
                    style={{ backgroundColor: "#e4e8f1", color: "#253659" }}
                    onClick={() => setDeleteModal(false)}
                  >
                    취소
                  </Modal.Button>
                  <Modal.Button
                    color="orange"
                    onClick={() => deletePost()}
                  >
                    삭제
                  </Modal.Button>
              </DeleteModalButtonWrapper>
          </Modal>
        )}
        {errorModal && (
          <Modal
            onClose={() => {
              setErrorModal(false);
            }}
          >
            <Modal.Title text="현재 지원자가 있어\n게시글 수정이 불가합니다" />
          </Modal>
        )}
        {profileModal && (
          <ProfileModal
            userId={data?.marketPostResponse.writerInfo.userId}
            onClose={() => setProfileModal(false)}
          />
        )}
      </PaddingWrapper>
    </DefaultLayout>
  );
};

const RowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%; /* 컨테이너의 너비에 맞춤 */
  max-width: calc(480px - 3.2rem); /* 최대 너비를 설정하여 초과 방지 */
  margin: auto;
`;

const PaddingWrapper = styled.div<{ $isWriter: boolean }>`
  position: relative;
  display: flex;
  width: 100%;
  height: auto;
  min-height: 100%;
  padding-bottom: ${({ $isWriter }) => ($isWriter ? "120px" : "6rem")};
  flex-direction: column;
`;

const StyledButton = styled.button`
  width: 1.67rem;
  height: 1.78rem;
  align-items: center;
  justify-content: center;
  border: 0;
  background-color: transparent;
`;

const BackButtonSVG = styled.img`
  width: 0.56rem;
  height: 0.56rem;
`;

// const JustifyWrapper = styled.div`
//   display: flex;
//   justify-content: space-between;
//   margin-bottom: 20px;
// `;

// const DoneWrapper = styled.div`
//   width: 120%;
//   position: relative;
//   right: 10%;
//   padding: 25px;
//   margin-bottom: 20px;
//   background-color: ${colorTheme.blue100};
//   color: white;
//   font-size: 1.3rem;
//   text-align: center;
// `;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const EmptyBox = styled.div`
  padding: 10px;
`;

const EditModalButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 0.78rem;
`;

const DeleteModalButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  gap: 0.78rem;
  justifyContent: 'space-between'
`;

const ProfileImg = styled.img`
  width: 2.06rem;
  height: 2.06rem;
  border: 0.17rem solid ${colorTheme.orange400};
  border-radius: 0.56rem;
`;

const RowBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 0.56rem;
`;

const ProfileName = styled.div`
  font-size: 1.11rem;
  margin-left: 0.39rem;
  color: ${colorTheme.shade};
`;

const RowBoxInRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 0.3rem;
`;
