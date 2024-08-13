import {initializeApp} from 'firebase/app';
import {getMessaging, getToken, onMessage} from 'firebase/messaging';

import axios from '@/util/axios.ts';

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
onMessage(messaging, payload => {
  console.log('메시지 수신:', payload);
  if (!payload.data) return;
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: payload.data.image,
    // 알림 클릭 시 수행할 작업
    data: {
      url: payload.data.click_action || '/', // 기본 URL 설정
    },
  };

  // 브라우저 알림 표시
  const notification = new Notification(notificationTitle, notificationOptions);

  // 알림 클릭 시 동작
  notification.onclick = _ => {
    window.location.href = notificationOptions.data.url;
  };
});

// FCM 토큰 받아오는 함수 -> 함수를 받으면 백으로 다시 요청해준다.
const requestPermission = async () => {
  try {
    // 사용자에게 알람 권한을 받아옴
    // 허용시 granted 거부시 den
    const permission = await Notification.requestPermission();
    console.log(permission);
    if (permission === 'granted' && !sessionStorage.getItem('fcmToken')) {
      const currentToken = await getToken(messaging, {
        vapidKey:
          'BGVbiPhLWWxijrc2jfn9lTyDs-kcSfSinb2bUmEoDXSc8ljx6sWtur9k82vmjBLND06SSeb10oq-rw7zmzrpoPY',
      });
      // FCM 토큰을 백엔드 서버로 전송
      await axios.post('/user/fcm', currentToken, {
        headers: {'Content-Type': 'application/json'},
      });
      console.log(currentToken);
      sessionStorage.setItem('fcmToken', currentToken);
    } else {
      console.log('알람 권한 X || 이미 토큰 저장');
    }
  } catch (error) {
    console.error('허용 받아오거나 토큰 받아오는데 오류', error);
  }
};

/**
 * 수신 메시지 처리 함수
 * FCM 메시지를 수신하면 알림을 표시한다.
 */
const handleIncomingMessages = () => {
  onMessage(messaging, payload => {
    console.log('메시지 수신:', payload);
    if (!payload.data) return;
    // eslint-disable-next-line no-new
    new Notification(payload.data.title, {
      body: payload.data.body,
      icon: payload.data.image,
    });
  });
};

export {handleIncomingMessages, messaging, requestPermission};