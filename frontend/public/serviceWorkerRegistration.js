import {initializeApp} from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js';
import {
  getMessaging,
  getToken,
} from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging.js';

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
const messaging = getMessaging(app);

async function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    try {
      console.log('서비스 워커 등록 시도 중...');
      const firebaseRegistration = await navigator.serviceWorker.register(
        '/firebase-messaging-sw.js',
      );
      console.log('Firebase Service Worker 등록 성공:');

      console.log('서비스 워커 활성화 대기 중...');

      const serviceWorker = await navigator.serviceWorker.ready;

      console.log('서비스 워커 활성화');
      if (serviceWorker && !sessionStorage.getItem('fcmToken')) {
        console.log('세션 체크 중...');
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          console.log('알림 권한 허용됨');
          const currentToken = await getToken(messaging, {
            vapidKey:
              'BGVbiPhLWWxijrc2jfn9lTyDs-kcSfSinb2bUmEoDXSc8ljx6sWtur9k82vmjBLND06SSeb10oq-rw7zmzrpoPY',
            serviceWorkerRegistration: firebaseRegistration,
          });
          if (currentToken) {
            console.log('FCM Token:', currentToken);
            sessionStorage.setItem('fcmToken', currentToken);
          } else {
            console.warn(
              'FCM 토큰을 가져올 수 없습니다. 권한이 없거나 문제가 발생했습니다.',
            );
          }
        } else {
          console.log('알림 권한이 거부되었습니다.');
        }
      }
    } catch (error) {
      console.error('Service Worker 등록 실패:', error);
    }
  } else {
    console.warn('Service Worker not supported in this browser');
  }
}

// 서비스 워커 등록 함수 호출
registerServiceWorker();
