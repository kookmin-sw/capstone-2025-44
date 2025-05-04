import { getToken } from "@firebase/messaging";

import { messaging } from "@/lib/firebase";
import { devLog } from "@/utils/dev-log";

export type PermissionType = "granted" | "denied" | "default";

async function requestPermission(): Promise<PermissionType> {
  if (window.Android) {
      // Android 인터페이스를 통해 알림 권한을 요청
      const permission: PermissionType = await window.Android.requestNotificationPermission() as PermissionType;
      return permission;
    } else {
      // 기존 Notification API를 사용
      return await Notification.requestPermission().then((permission) => {
          devLog(permission === "granted" ? "권한 승인" : "권한 거부");
          return permission as PermissionType;
      });
    }
}

async function requestToken(): Promise<string> {
  const token = await getToken(messaging, {
    vapidKey: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
  })
    .then((currentToken) => {
      if (currentToken) {
        devLog(currentToken);
      } else {
        devLog("알림 권한이 거부되어있습니다.");
      }
      return currentToken;
    })
    .catch((err) => {
      // alert("권한이 허가되어있지 않아 알림을 보낼 수 없습니다");
      devLog("토큰을 받는 과정에서 에러가 발생하였습니다 ", err);
      // ...
    });
  return token as string;
}

export { requestPermission, requestToken };
