import { useEffect, useRef, useState } from "react";
//import { useLocation } from "react-router-dom";
import { styled } from "styled-components";

import { AppBar } from "@/components/common/app-bar";
import { ToggleSwitchVer2 } from "@/components/common/toggle-switch-ver2";
import { MypageList } from "@/components/mypage/mypage-list";
import { MypageListProfile } from "@/components/mypage/mypage-list-profile";
import { MypageUpButton } from "@/components/mypage/mypage-up-button";
import { Sidebar } from "@/components/sidebar";
import { colorTheme } from "@/style/color-theme";

export const Mypage = () => {
  const [isLeftSelected, setIsLeftSelected] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//  const location = useLocation();

  const wrapperRef = useRef<HTMLDivElement>(null);
  const [miniButtonVisible, setMiniButtonVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (wrapperRef.current) {
        const isScrollingDown = wrapperRef.current.scrollTop > 600;
        setMiniButtonVisible(isScrollingDown);
      }
    };

    wrapperRef.current?.addEventListener("scroll", handleScroll);
    return () => {
      wrapperRef.current?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleMiniButton = () => {
    if (wrapperRef.current) {
      wrapperRef.current.scrollTop = 0;
    }
  };

  const menuItems = [
    { id: 1, title: "홈", path: "/mypage" },
    { id: 2, title: "공지사항", path: "/notice" },
    { id: 3, title: "신문", path: "/news" },
    { id: 4, title: "연락처", path: "/contact" }
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <PageContainer>
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        menuItems={menuItems}
      />
      <MainContent $isSidebarOpen={isSidebarOpen}>
        <Wrapper ref={wrapperRef}>
          <AppBar style={{ backgroundColor: colorTheme.blue900 }}>
            <AppBar.AppBarNavigate
              style={{
                paddingBottom: "1.06rem",
                paddingTop: "2.944rem",
                paddingLeft: "1.94rem",
                paddingRight: "1.94rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <AppBar.HeaderText
                style={{
                  fontSize: "1.78rem",
                  color: "#ffffff",
                  textAlign: "start",
                }}
              >
                마이페이지
              </AppBar.HeaderText>
              <MenuButton onClick={toggleSidebar}>
                <span>☰</span>
              </MenuButton>
            </AppBar.AppBarNavigate>
            <MypageListProfile />
            <div
              style={{
                width: "100%",
                backgroundColor: colorTheme.blue100,
              }}
            >
              <ToggleSwitchVer2
                firstText="내게시물"
                secondText="신청내역"
                isLeftSelected={isLeftSelected}
                onChangeSelected={setIsLeftSelected}
              />
            </div>
          </AppBar>
          <MypageList type={isLeftSelected ? "postlist" : "apply"} />
          {miniButtonVisible && <MypageUpButton onHandler={handleMiniButton} />}
        </Wrapper>
      </MainContent>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;

const MainContent = styled.div<{ $isSidebarOpen: boolean }>`
  flex: 1;
  transition: margin-left 0.3s ease;
  margin-left: ${props => props.$isSidebarOpen ? "240px" : "0"};
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  
  &:hover {
    opacity: 0.8;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  max-width: 480px;
  margin: auto;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;
