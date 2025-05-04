import { RecoilRoot } from "recoil";
import { useEffect } from "react";
import { Routers } from "./routes";
import { GlobalStyle } from "./style/global";

export const App = () => {
  useEffect(() => {
    const setAppHeight = () => {
      const doc = document.documentElement;
      doc.style.setProperty("--app-height", `${window.innerHeight}px`);
    };

    setAppHeight(); // 처음 실행
    window.addEventListener("resize", setAppHeight); // 화면 크기 바뀔 때마다

    return () => window.removeEventListener("resize", setAppHeight); // 클린업
  }, []);

  return (
    <RecoilRoot>
      <GlobalStyle />
      <Routers />
    </RecoilRoot>
  );
};
