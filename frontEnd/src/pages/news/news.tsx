import { styled } from "styled-components";
import { AppBar } from "@/components/common/app-bar";
import { Sidebar } from "@/components/sidebar";
import { colorTheme } from "@/style/color-theme";
import { useState, useEffect } from "react";

interface NewsItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
}

export const NewsPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [newsList, setNewsList] = useState<NewsItem[]>([]);

  const menuItems = [
    { id: 1, title: "홈", path: "/mypage" },
    { id: 2, title: "공지사항", path: "/notice" },
    { id: 3, title: "신문", path: "/news" },
    { id: 4, title: "뱃지함", path: "/badge" },
    { id: 5, title: "연락처", path: "/contact" }
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    const fetchNews = async () => {
      const clientId = "RyeaFSkDqg8sPdcklK4Y";
      const clientSecret = "nXhQTJewEz";
      const query = encodeURIComponent("정릉");

      try {
        const response = await fetch(
          `https://openapi.naver.com/v1/search/news.json?query=${query}&display=6&sort=date`,
          {
            headers: {
              "X-Naver-Client-Id": clientId,
              "X-Naver-Client-Secret": clientSecret
            }
          }
        );

        const data = (await response.json()) as { items: NewsItem[] };
        setNewsList(data.items);
      } catch (error) {
        console.error("뉴스 데이터를 불러오는 데 실패했습니다:", error);
      }
    };

    void fetchNews();
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
            alignItems: "center"
          }}
        >
          <AppBar.HeaderText
            style={{
              fontSize: "1.78rem",
              color: "#ffffff",
              textAlign: "start"
            }}
          >
            신문
          </AppBar.HeaderText>
          <MenuButton onClick={toggleSidebar}>
            <MenuIcon>☰</MenuIcon>
          </MenuButton>
        </AppBar.AppBarNavigate>
      </AppBar>

      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} menuItems={menuItems} />

      <Content>
        {newsList.map((news, index) => (
          <NewsCard key={index}>
            <NewsTitle
              href={news.link}
              target="_blank"
              dangerouslySetInnerHTML={{ __html: news.title }}
            />
            <NewsDesc dangerouslySetInnerHTML={{ __html: news.description }} />
            <NewsDate>{news.pubDate}</NewsDate>
          </NewsCard>
        ))}
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
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

const Content = styled.div`
  padding: 1.5rem;
  background: #f9f9f9;
  flex: 1;
  overflow-y: auto;
`;

const NewsCard = styled.div`
  background: white;
  border-radius: 0.8rem;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.05);
`;

const NewsTitle = styled.a`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${colorTheme.blue900};
  text-decoration: none;
`;

const NewsDesc = styled.p`
  font-size: 0.95rem;
  color: #444;
  margin: 0.5rem 0;
`;

const NewsDate = styled.p`
  font-size: 0.8rem;
  color: #888;
  text-align: right;
`;