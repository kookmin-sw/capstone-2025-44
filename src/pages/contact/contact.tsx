import { styled } from "styled-components";
import { AppBar } from "@/components/common/app-bar";
import { Sidebar } from "@/components/sidebar";
import { colorTheme } from "@/style/color-theme";
import { useState } from "react";

export const ContactPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 定义菜单项
  const menuItems = [
    { id: 1, title: "홈", path: "/" },
    { id: 2, title: "공지사항", path: "/notice" },
    { id: 3, title: "소개", path: "/about" },
    { id: 4, title: "연락처", path: "/contact" }
  ];

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

      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={closeSidebar} 
        menuItems={menuItems}
      />
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