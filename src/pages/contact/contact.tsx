import { styled } from "styled-components";
import { AppBar } from "@/components/common/app-bar";
import { colorTheme } from "@/style/color-theme";
import { useState } from "react";

export const ContactPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <Wrapper>
      <AppBar style={{ backgroundColor: colorTheme.blue900 }}>
        <AppBar.AppBarNavigate
          style={{
            paddingBottom: "1.06rem",
            paddingTop: "2.944rem",
            paddingLeft: "1.94rem",
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
            연락처
          </AppBar.HeaderText>
          <MenuButton onClick={toggleSidebar}>
            <MenuIcon>☰</MenuIcon>
          </MenuButton>
        </AppBar.AppBarNavigate>
      </AppBar>
      
      <ContactContent>
        <ContactSection>
          <ContactTitle>망설이지 말고 무엇이든 물어보세요</ContactTitle>
          <ContactInfo>
            <InfoItem>
              <InfoLabel>전화:</InfoLabel>
              <InfoValue>02-6906-3108</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>이메일:</InfoLabel>
              <InfoValue>sbculture.salon@gmail.com</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>주소:</InfoLabel>
              <InfoValue>02827) 서울시 성북구 아리랑로12길 4(돈암동,시네마빌딩)</InfoValue>
            </InfoItem>
          </ContactInfo>
        </ContactSection>
      </ContactContent>

      <SidebarOverlay isOpen={isSidebarOpen} onClick={closeSidebar} />
      <Sidebar isOpen={isSidebarOpen}>
        <SidebarHeader>
          <SidebarTitle>메뉴</SidebarTitle>
          <CloseButton onClick={closeSidebar}>×</CloseButton>
        </SidebarHeader>
        <SidebarContent>
          <SidebarItem onClick={() => window.location.href = "/"}>홈</SidebarItem>
          <SidebarItem onClick={() => window.location.href = "/notice"}>공지사항</SidebarItem>
          <SidebarItem onClick={() => window.location.href = "/about"}>소개</SidebarItem>
          <SidebarItem onClick={() => window.location.href = "/contact"}>연락처</SidebarItem>
        </SidebarContent>
      </Sidebar>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ContactContent = styled.div`
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
`;

const ContactSection = styled.div`
  margin-bottom: 2rem;
`;

const ContactTitle = styled.h2`
  font-size: 1.8rem;
  color: ${colorTheme.blue900};
  margin-bottom: 1.5rem;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
`;

const InfoLabel = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${colorTheme.blue900};
  width: 100px;
`;

const InfoValue = styled.span`
  font-size: 1.2rem;
  color: ${colorTheme.shade};
`;

const MenuButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MenuIcon = styled.span`
  color: white;
  font-size: 1.8rem;
`;

const SidebarOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
  display: ${props => props.isOpen ? 'block' : 'none'};
`;

const Sidebar = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: ${props => props.isOpen ? '0' : '-300px'};
  width: 300px;
  height: 100%;
  background-color: white;
  z-index: 101;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  transition: right 0.3s ease;
  display: flex;
  flex-direction: column;
`;

const SidebarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid ${colorTheme.blue100};
`;

const SidebarTitle = styled.h2`
  font-size: 1.5rem;
  color: ${colorTheme.blue900};
  margin: 0;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 1.8rem;
  color: ${colorTheme.blue900};
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SidebarContent = styled.div`
  flex: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SidebarItem = styled.div`
  padding: 1rem;
  font-size: 1.2rem;
  color: ${colorTheme.blue900};
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: ${colorTheme.blue100};
  }
`;