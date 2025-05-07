import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { BottomNavigationBar } from "@/components/common/bottom-navigation-bar";
import globalRouter from "@/hooks/navigate/global-router";

export const GlobalLayout = () => {
  const navigate = useNavigate();
  globalRouter.navigate = navigate;

  const location = useLocation();
  const [currentUrl, setCurrentUrl] = useState<string[]>([]);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  //키보드 수정
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    setCurrentUrl(getCurrentPage(location.pathname));
  }, [location.pathname]);

  //키보드 감지
  useEffect(() => {
  const handleResize = () => {
    const visualHeight = window.visualViewport?.height || window.innerHeight;
    const isOpen = visualHeight < window.innerHeight - 100;
    setIsKeyboardOpen(isOpen);
    console.log("뷰포트 높이:", visualHeight, "키보드 열림:", isOpen);
  };

  window.visualViewport?.addEventListener("resize", handleResize);
  return () => window.visualViewport?.removeEventListener("resize", handleResize);
}, []);


  function getCurrentPage(url: string): string[] {
    return url.split("/");
  }

  const showBottomNav =
    currentUrl[1] === "post" ||
    (currentUrl[1] === "chat" && !currentUrl[2]) ||
    currentUrl[1] === "mypage";

  return (
    <div
      style={{
        width: "100%",
        minHeight: "300vh",   //스크롤위해 임의조정
        paddingBottom: showBottomNav ? "3.5rem" : "0",
        position: "relative",
        overflow: "auto",
        WebkitOverflowScrolling: "touch",
      }}
    >
      <div
        style={{
          width: "100%",
          minHeight: "100%",
          position: "relative",
        }}
      >
        <Outlet />
      </div>
      {showBottomNav && !isKeyboardOpen && <BottomNavigationBar />}
    </div>
  );
};
