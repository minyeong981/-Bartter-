importScripts('https://www.gstatic.com/firebasejs/8.7.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.7.1/firebase-messaging.js');

self.addEventListener('install', _ => {
  self.skipWaiting();
});

self.addEventListener('activate', _ => {
  console.log('fcm service worker가 실행되었습니다.');
});

const config = {
  apiKey: 'AIzaSyDVao9JFScs8JuN-qo-mNTlX62AiAMVQjc',
  authDomain: 'bartter-cd301.firebaseapp.com',
  projectId: 'bartter-cd301',
  storageBucket: 'bartter-cd301.appspot.com',
  messagingSenderId: '579916384859',
  appId: '1:579916384859:web:6be105cb5439fcec050d7e',
  measurementId: 'G-1SLH8QV3ZQ',
};

firebase.initializeApp(config);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: payload.data.image,
    data: {
      url: payload.data.url, // 알림 클릭시 이동할 URL
    },
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});

// 알림 클릭 이벤트 처리
self.addEventListener('notificationclick', event => {
  event.notification.close(); // 알림 닫기
  // 알림에서 설정한 URL로 이동
  const clickActionUrl = event.notification.data.url;
  if (clickActionUrl) {
    event.waitUntil(clients.openWindow(clickActionUrl));
  }
});