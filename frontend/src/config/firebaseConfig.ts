import {initializeApp} from 'firebase/app';
import {getMessaging, onMessage} from 'firebase/messaging';

// Firebase 구성
const firebaseConfig = {
  apiKey: 'AIzaSyDVao9JFScs8JuN-qo-mNTlX62AiAMVQjc',
  authDomain: 'bartter-cd301.firebaseapp.com',
  projectId: 'bartter-cd301',
  storageBucket: 'bartter-cd301.appspot.com',
  messagingSenderId: '579916384859',
  appId: '1:579916384859:web:6be105cb5439fcec050d7e',
  measurementId: 'G-1SLH8QV3ZQ',
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);

/**
 * Messaging 초기화
 * 사용자에게 알림 권한을 요청하고, FCM 토큰을 반환한다.
 */
const messaging = getMessaging(app);

/**
 * 수신 메시지 처리 함수
 * FCM 메시지를 수신하면 알림을 표시한다.
 */
const handleForegroundMessages = () => {
  onMessage(messaging, (payload) => {
    console.log('메시지 수신(포그라운드):', payload);
    if (!payload.data) return;
    const notificationTitle = payload.data.title + ' 포그라운드';
    const notificationOptions = {
      body: payload.data.body,
      icon: payload.data.image,
      data: {
        url: payload.data.click_action || '/', // 기본 URL 설정
      },
    };

    // 브라우저 알림 표시
    const notification = new Notification(notificationTitle, notificationOptions);

    // 알림 클릭 시 동작
    notification.onclick = () => {
      console.log(notificationOptions.data.url);
      window.location.href = notificationOptions.data.url;
    };
  });
};

export {messaging, handleForegroundMessages};