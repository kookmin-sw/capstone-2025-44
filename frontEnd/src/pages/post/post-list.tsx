import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";

import ReadingGlassOrangeSVG from "@/assets/icons/reading-glass-orange.svg";
import PostListEmptyCaseSVG from "@/assets/images/post-list-empty-case.svg";
// import { Modal } from "@/components/common/modal";
import { MypageUpButton } from "@/components/mypage/mypage-up-button";
import { PostCategory } from "@/components/post/post-category";
import { PostListItem } from "@/components/post/post-list-item";
import { PostPostingButton } from "@/components/post/post-posting-button";
import { PostPostingButtonMini } from "@/components/post/post-posting-button-mini";
import { useGetPostList } from "@/hooks/queries/useGetPostList";
import { usePostFcmToken } from "@/hooks/queries/usePostFcmToken";
import { requestPermission, requestToken } from "@/lib/messaging";
import { fcmTokenState } from "@/recoil/atoms/fcm-token-state";
import { colorTheme } from "@/style/color-theme";
import { TypeIdInteractionString } from "@/utils/type-id-interaction-string";

export const PostList = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [miniButtonVisible, setMiniButtonVisible] = useState(false);
  const [tempSearch, setTempSearch] = useState("");
  const [search, setSearch] = useState("");
  const [fcmToken, setFcmToken] = useRecoilState(fcmTokenState);
  const { mutate } = usePostFcmToken();
  const [category, setCategory] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const [isEmptyItem, setIsEmptyItem] = useState(false);
  const [canFetch, setCanFetch] = useState(true);
  const [categoryDiv, setCategoryDiv] = useState(false);
  const { data, fetchNextPage, hasNextPage, refetch } = useGetPostList({
    search: search,
    category: category,
  });

  // const [ready, _] = useState<boolean>(true);

  useEffect(() => {
    // for alarm with fcm token
    const registerToken = async () => {
      if (fcmToken) return; // fcm token is already updated
      const permission = await requestPermission();
      if (permission === "granted") {
        const token = await requestToken();
        setFcmToken(token);
        mutate(token);
      }
    };

    void registerToken();
  }, []);

  useEffect(() => {
    if (headerRef.current) setHeaderHeight(headerRef.current.offsetHeight);

    const handleScroll = () => {
      if (wrapperRef.current) {
        const isScrollingDown = wrapperRef.current.scrollTop > headerHeight;
        setMiniButtonVisible(isScrollingDown);
        if (
          wrapperRef.current.scrollTop + wrapperRef.current.clientHeight >=
          wrapperRef.current.scrollHeight - 60
        ) {
          if (hasNextPage) {
            if (canFetch) void fetchNextPage();
            setCanFetch(false);

            setTimeout(() => {
              setCanFetch(true);
            }, 1000);
          }
        }
      }
    };

    wrapperRef.current?.addEventListener("scroll", handleScroll);
    return () => {
      wrapperRef.current?.removeEventListener("scroll", handleScroll);
    };
  }, [headerHeight, hasNextPage]);

  useEffect(() => {
    if (listRef.current) {
      setIsEmptyItem(listRef.current.children.length === 0);
    }
  }, [data]);

  useEffect(() => {
    void refetch();
  }, [category]);

  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      if (
        categoryRef.current &&
        inputRef.current &&
        !categoryRef.current.contains(e.target as Node) &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setCategoryDiv(false);
      }
    };
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  const handleMiniButton = () => {
    if (wrapperRef.current) {
      wrapperRef.current.scrollTop = 0;
    }
  };

  useEffect(() => {
    // 함수를 window 객체에 추가
    window.handlePermissionResult = (permission) => {
      console.log("Permission status: " + permission);
      // 다른 상태 업데이트나 로직 수행
    };
  
    // 컴포넌트 언마운트 시 함수 제거
    return () => {
      delete window.handlePermissionResult;
    };
  }, []);

  return (
    <>
      <Wrapper ref={wrapperRef}>
        <div style={{ width: "100%" }} ref={headerRef}>
          {miniButtonVisible && <PostPostingButtonMini />}
          {/* <BigHeader>전체게시물</BigHeader> */}
          <InputWrapper>
            {category !== 0 && (
              <CategorySelected
                onClick={() => {
                  setCategory(0);
                }}
              >
                {TypeIdInteractionString({
                  categoryId: category,
                  idToString: true,
                })}{" "}
                X
              </CategorySelected>
            )}
            <InputInnerWrapper>
              <InputTextArea
                value={tempSearch}
                onChange={(e) => setTempSearch(e.target.value)}
                onClick={() => {
                  setCategoryDiv(true);
                }}
                ref={inputRef}
              />
              <SearchButton
                onClick={() => {
                  setSearch(tempSearch);
                  setCategoryDiv(false);
                  setCategory(0);
                }}
              />
            </InputInnerWrapper>
          </InputWrapper>
          {categoryDiv && (
            <CategoryField ref={categoryRef}>
              <PostCategory
                categoryId={category}
                setCategoryId={setCategory}
                resetTextSearch={() => {
                  setSearch("");
                  setTempSearch("");
                }}
              />
            </CategoryField>
          )}
          <SmallHeader>
            {'게시글 만들기 버튼을 눌러\n게시글을 만들어 주세요'}
          </SmallHeader>
          <PostPostingButton />
        </div>
        <div style={{ width: "100%" }} ref={listRef}>
          {data?.pages.map((page, idx) =>
            page.map((item, index) => (
              <PostListItem
                key={`${idx}-${index}`}
                postId={item.postId}
                title={item.title}
                location={item.location}
                startDate={item.startDate}
                pay={item.pay}
                status={item.status}
                currentApplicant={item.currentApplicant}
                maxNumOfPeople={item.maxNumOfPeople}
                writerProfileImg={item.writerInfo.profileImage}
                writerId={item.writerInfo.profileId}
                deleted={item.deleted}
                category={item.categoryId}
              />
            )),
          )}
        </div>
        {isEmptyItem && <EmptyImg src={PostListEmptyCaseSVG} />}
        {miniButtonVisible && <MypageUpButton onHandler={handleMiniButton} />}
      </Wrapper>
      {/* {ready && (
        <Modal onClose={() => devLog("blodk")}>
          <Modal.Title text="지금 서비스를\n재정비중이에요!\n\n내일 오전 6시 이후\n다시 접속부탁드려요🤗" />
        </Modal>
      )} */}
    </>
  );
};
// 게시글 만들기 버튼을 눌러 게시글을 만들어 보아요 -> {'게시글 만들기 버튼을 눌러\n게시글을 만들어 주세요'}
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
  height: 100%;
  align-items: center;
`;

// const BigHeader = styled.div`
//   width: 100%;
//   font-size: 1.8rem;
//   padding: 2.9rem 9% 0.7rem;
// `;

const SmallHeader = styled.div`
  width: 100%;
  text-align: center;
  font-size: 1.4rem;
  padding: 0 8.5% 0.3rem;
  white-space: pre-line;
  line-height: 1.1
`;
//기존 0.83rem -> 1.4
//text-align: center; 추가
//white-space: pre-line; 줄바꿈을 위해 추가
//http://localhost:3000/post 게시글 만들기 버튼을 눌러 게시글을 만들어 보아요 크기 조절
//line-height: 1.1 줄간격 지정된 폰트 사이즈(12xp)의 1.1배
//padding: 0 8.5% 0.6rem; -> padding: 0 8.5% 0.3rem; 게시글만들어 보아요와 게시글만들기 버튼 사이 간격 조절

const InputWrapper = styled.div`
  width: 100%;
  padding: 0 7.94% 0.7rem;
  margin-top: 2rem;
  display: flex;
  flex-direction: row;
  gap: 0.7rem;
`;

const CategorySelected = styled.button`
  height: 2.78rem;
  width: 8.2rem;
  border: none;
  border-radius: 0.56rem;
  display: flex;
  flex-direction: row;
  /* gap: 0.3rem; */
  align-items: center;
  padding: 0.22rem 0.7rem;
  font-size: 1rem;
  background-color: ${colorTheme.orange400};
  color: white;
  justify-content: center;
`;

const InputInnerWrapper = styled.div`
  width: 100%;
  height: 2.78rem;
  border-radius: 0.56rem;
  border-color: ${colorTheme.orange400};
  border-width: 2px;
  border-style: solid;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.16rem 0.16rem 0.16rem 0.4rem;
`;

const InputTextArea = styled.textarea`
  width: 100%;
  font-size: 1rem;
  margin-right: 0.2rem;
  color: black;
  border: none;
  background-color: transparent;
  margin-top: 0.4rem;
`;

const SearchButton = styled.button`
  background-image: url(${ReadingGlassOrangeSVG});
  width: 2.33rem;
  height: 2.33rem;
  background-color: transparent;
  border: none;
  background-repeat: no-repeat;
  background-size: cover;
`;

const EmptyImg = styled.img`
  width: 18.16rem;
  height: 18.16rem;
`;

const CategoryField = styled.div`
  width: 100%;
`;
