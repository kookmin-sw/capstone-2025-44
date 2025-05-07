import { useEffect, useState, useRef } from "react";
import { styled } from "styled-components";

import { AppBar } from "@/components/common/app-bar";
import { Sidebar } from "@/components/sidebar";
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
  const sliderRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  
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

  // 메뉴 항목 정의
  const menuItems = [
    { id: 1, title: "홈", path: "/" },
    { id: 2, title: "공지사항", path: "/notice" },
    { id: 3, title: "소개", path: "/about" },
    { id: 4, title: "연락처", path: "/contact" }
  ];

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

  //슬라이딩
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNextClick();
      } else {
        handlePrevClick();
      }
    }
    
    touchStartX.current = null;
    touchEndX.current = null;
  };
  
  const handlePageTouchStart = (e: React.TouchEvent) => {
    if (e.touches[0].clientX < 30) {
      touchStartX.current = e.touches[0].clientX;
    }
  };
  
  const handlePageTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchEndX.current - touchStartX.current;
    
    if (diff > 50 && !isSidebarOpen && touchStartX.current < 30) {
      setIsSidebarOpen(true);
    }
    
    touchStartX.current = null;
    touchEndX.current = null;
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
        content: "시스템 유지 관리를 수행하기 위해 다음 기간 내에 당사 웹 사이트에 대한 액세스가 중단됩니다.2025년 12월 31일 수요일 1:00 - 2:00",
        date: "2000-01-01",
      },
      {
        id: 2,
        title: "title",
        content: "content",
        date: "2000-01-01",
      },
      {
        id: 3,
        title: "title",
        content: "content",
        date: "2000-01-01",
      },
      {
        id: 4,
        title: "title",
        content: "content",
        date: "2000-01-01",
      },
      {
        id: 5,
        title: "title",
        content: "content",
        date: "2000-01-01",
      },
    ]);
  }, []);

  return (
    <Wrapper>
      <AppBar style={{ backgroundColor: colorTheme.blue900 }}>
        <AppBar.AppBarNavigate
          style={{
            paddingBottom: "1.0rem",
            paddingTop: "1.7rem",
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
      <ContentWrapper>
        <ImageNotice>
          <ImageNoticeContent>
            <ImageSlider 
              ref={sliderRef}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <SliderContainer currentIndex={currentImageIndex}>
                {noticeImages.map((image) => (
                  <SliderImage
                    key={image.id}
                    src={image.src}
                    alt={image.alt}
                    onClick={() => handleImageClick(image.link)}
                  />
                ))}
              </SliderContainer>
            </ImageSlider>
            <ButtonContainer>
              <SliderButton onClick={handlePrevClick} position="left">
                &#8249;
              </SliderButton>
              <ImageIndicators>
                {noticeImages.map((_, index) => (
                  <Indicator 
                    key={index} 
                    active={index === currentImageIndex}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </ImageIndicators>
              <SliderButton onClick={handleNextClick} position="right">
                &#8250;
              </SliderButton>
            </ButtonContainer>
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
      </ContentWrapper>
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
  position: relative;
`;

//스크롤바를 숨기지만 스크롤 기능은 유지（phone）.
const ContentWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    &::-webkit-scrollbar {
      width: 0;
      display: none;
    }
    
    scrollbar-width: none;
    
    -ms-overflow-style: none;
  }
`;

const ImageNotice = styled.div`
  width: 100%;
  padding: 0;
  background-color: transparent;
  margin-bottom: 1rem;
  height: 40vh;
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
  overflow: hidden;
`;

const SliderContainer = styled.div<{ currentIndex: number }>`
  display: flex;
  width: 100%;
  height: 100%;
  transform: translateX(${props => -props.currentIndex * 100}%);
  transition: transform 0.5s ease-in-out;
`;

const SliderImage = styled.img`
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  object-fit: fill;
  background-color: transparent;
  border-radius: 0;
  box-shadow: none;
  cursor: pointer;
  padding: 0;

  @media (max-width: 768px) {
    height: 100%;
  }
`;

const SliderButton = styled.button<{ position: 'left' | 'right' }>`
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
  margin: 0 1rem;

  &:hover {
    background: rgba(255, 255, 255, 0.9);
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
    font-size: 1.5rem;
    margin: 0 0.5rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  gap: 1rem;
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
  font-size: 2.2rem;
  font-weight: bold;
  color: ${colorTheme.blue900};
  word-break: keep-all;
  
  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

const NoticeContent = styled.div`
  font-size: 1.8rem;
  color: ${colorTheme.shade};
  word-break: keep-all;
  line-height: 1.4;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
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
