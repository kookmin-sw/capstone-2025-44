importScripts(
  "https://www.gstatic.com/firebasejs/10.7.2/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.7.2/firebase-messaging-compat.js",
);

const app = firebase.initializeApp({
  apiKey: "AIzaSyDL6M57Z3PAo5nAjKbwm05FBz0CfDX5gSI",
  projectId: "k-eum2023",
  messagingSenderId: 761364583261,
  appId: "1:761364583261:web:588b54a65b3d7ebf0f8eb4",
});

const messaging = firebase.messaging(app);

messaging.onBackgroundMessage((payload) => {
  const title = payload.notification.title;
  const options = {
    body: payload.notification.body,
  };

  self.registration.showNotification(title, options);
});

messaging.onMessage(function (payload) {
  console.log(payload.notification.title);
  console.log(payload.notification.body);
});

self.addEventListener("push", function (e) {
  if (!e.data.json()) return;

  const resultData = e.data.json().notification;
  const notificationTitle = resultData.title;
  const notificationOptions = {
    body: resultData.body,
    icon: resultData.image,
    tag: resultData.tag,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", function (event) {
  const url = "/";
  event.notification.close();
  event.waitUntil(clients.openWindow(url));
});
