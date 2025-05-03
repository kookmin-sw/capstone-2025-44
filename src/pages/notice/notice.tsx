import { useEffect, useState } from "react";
import { styled } from "styled-components";

import { AppBar } from "@/components/common/app-bar";
import { colorTheme } from "@/style/color-theme";
import noticeImage1 from "@/assets/images/notice1.png";
import noticeImage2 from "@/assets/images/notice2.png";
import noticeImage3 from "@/assets/images/notice3.png";

  //  공지 목록 상태 (지금은 하드코딩됨)
export const NoticePage = () => {
  const [notices, setNotices] = useState<Array<{
    id: number;
    title: string;
    content: string;
    date: string;
  }>>([]);

  //  사이드바 상태
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const noticeImages = [
    {
      id: 1,
      src: noticeImage1,
      alt: "공지사진1",
      link: "https://sbsalon.org/"
    },
    {
      id: 2,
      src: noticeImage2,
      alt: "공지사진2",
      link: "https://sbsalon.org/"
    },
    {
      id: 3,
      src: noticeImage3,
      alt: "공지사진3",
      link: "https://sbsalon.org/"
    }
  ];

  //  자동으로 이미지 전환
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === noticeImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [noticeImages.length]);

  const handleImageClick = (link: string) => {
    window.open(link, '_blank');
  };

  const handlePrevClick = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? noticeImages.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === noticeImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    setNotices([
      {
        id: 1,
        title: "시스템 유지관리 공지",
        content: "시스템 유지 관리를 수행하기 위해 다음 기간 내에 당사 웹 사이트에 대한 액세스가 중단됩니다.",
        date: "2024년 11월 24일 일요일 14:00 - 15:00",
      },
      {
        id: 2,
        title: "test",
        content: "af dsfgjsdkgj fdg   eg 123124124ㄱㅇㄴㄹㅇㄴㄹ",
        date: "2000-01-01",
      },
    ]);
  }, []);

  return (
    <Wrapper>
      <AppBar style={{ backgroundColor: colorTheme.blue900 }}>
        <AppBar.AppBarNavigate
          style={{
            paddingBottom: "0.5rem",
            paddingTop: "1.5rem",
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
            게시판
          </AppBar.HeaderText>
          <MenuButton onClick={toggleSidebar}>
            <MenuIcon>☰</MenuIcon>
          </MenuButton>
        </AppBar.AppBarNavigate>
      </AppBar>
      <ImageNotice>
        <ImageNoticeContent>
          <ImageSlider>
            <SliderButton onClick={handlePrevClick} position="left">
              &#8249;
            </SliderButton>

            {noticeImages.map((image, index) => (
              <SliderImage
                key={image.id}
                src={image.src}
                alt={image.alt}
                isVisible={index === currentImageIndex}
                onClick={() => handleImageClick(image.link)}
              />
            ))}

            <SliderButton onClick={handleNextClick} position="right">
              &#8250;
            </SliderButton>
          </ImageSlider>
          <ImageIndicators>
            {noticeImages.map((_, index) => (
              <Indicator 
                key={index} 
                active={index === currentImageIndex}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </ImageIndicators>
        </ImageNoticeContent>
      </ImageNotice>
      <NoticeList>
        {notices.map((notice) => (
          <NoticeItem key={notice.id}>
            <NoticeTitle>{notice.title}</NoticeTitle>
            <NoticeContent>{notice.content}</NoticeContent>
            <NoticeDate>{notice.date}</NoticeDate>
          </NoticeItem>
        ))}
      </NoticeList>

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
  overflow-y: scroll;
  overflow: hidden;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const ImageNotice = styled.div`
  width: 100%;
  padding: 0;
  background-color: transparent;
  margin-bottom: 1rem;
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ImageNoticeContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ImageSlider = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SliderImage = styled.img<{ isVisible: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: fill;
  background-color: transparent;
  border-radius: 0;
  box-shadow: none;
  cursor: pointer;
  padding: 0;

  opacity: ${props => (props.isVisible ? 1 : 0)};
  transition: opacity 0.6s ease-in-out;
  pointer-events: ${props => (props.isVisible ? "auto" : "none")};

  @media (max-width: 768px) {
    height: 100%;
  }
`;


const SliderButton = styled.button<{ position: 'left' | 'right' }>`
  position: absolute;
  ${props => props.position}: 16px;
  background: rgba(255, 255, 255, 0.7);
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 2rem;
  color: ${colorTheme.blue900};
  transition: background-color 0.2s ease, transform 0.2s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  z-index: 10;

  &:hover {
    background: rgba(255, 255, 255, 0.9);
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
    font-size: 1.5rem;
  }
`;


const ImageIndicators = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 1rem;
  
  @media (max-width: 768px) {
    gap: 6px;
  }
`;

const Indicator = styled.div<{ active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${props => props.active ? colorTheme.blue900 : colorTheme.blue300};
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: ${colorTheme.blue700};
  }
  
  @media (max-width: 768px) {
    width: 6px;
    height: 6px;
  }
`;

const NoticeList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  
  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const NoticeItem = styled.div`
  width: 100%;
  padding: 1rem;
  border-bottom: 1px solid ${colorTheme.blue100};
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
  @media (max-width: 768px) {
    padding: 0.75rem;
    gap: 0.3rem;
  }
`;

const NoticeTitle = styled.div`
  font-size: 2.0rem;
  font-weight: bold;
  color: ${colorTheme.blue900};
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const NoticeContent = styled.div`
  font-size: 1.5rem;
  color: ${colorTheme.shade};
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const NoticeDate = styled.div`
  font-size: 1.2rem;
  color: ${colorTheme.shade};
  align-self: flex-end;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
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