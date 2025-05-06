import { useEffect } from "react";
import { styled } from "styled-components";

import { Button } from "@/components/common/button";
import { DefaultLayout } from "@/components/layout/default-layout";
import { requestPermission, requestToken } from "@/lib/messaging";

export const FCMTest = () => {
  const getAlert = async () => {
    await requestToken();
    // axios 알림 요청
    // const token = await requestToken();
    // await axios({
    //   url: "https://fcm.googleapis.com/fcm/send",
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `key=${process.env.REACT_APP_FIREBASE_MESSAGING_SERVER_KEY}`,
    //   },
    //   data: {
    //     to: `${token}`,
    //     notification: {
    //       title: "test",
    //       body: "알림 성공!",
    //     },
    //   },
    // });
  };

  useEffect(() => {}, []);

  return (
    <DefaultLayout appbar={<div style={{ height: "64px" }}></div>}>
      <ContentLayout>
        <Button onClick={() => void requestPermission()}>
          알림 권한 요청하기 (최초 한번)
        </Button>
        <Button
          onClick={() => {
            void getAlert();
          }}
        >
          토큰 발급받기 (console)
        </Button>
      </ContentLayout>
    </DefaultLayout>
  );
};

const ContentLayout = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;
