// serviceWorkerRegistration.js

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
      // 일반 PWA 서비스 워커 등록
      const pwaRegistration =
        await navigator.serviceWorker.register('/service-worker.js');
      console.log('PWA Service Worker 등록 성공:', pwaRegistration.scope);

      // Firebase 서비스 워커 등록
      const firebaseRegistration = await navigator.serviceWorker.register(
        '/firebase-messaging-sw.js',
        {scope: '/firebase-cloud-messaging-push-scope'},
      );
      console.log(
        'Firebase Service Worker 등록 성공:',
        firebaseRegistration.scope,
      );

      if (!sessionStorage.getItem('fcmToken')) {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          console.log(permission);
          // FCM 토큰 가져오기
          const currentToken = await getToken(messaging, {
            vapidKey:
              'BGVbiPhLWWxijrc2jfn9lTyDs-kcSfSinb2bUmEoDXSc8ljx6sWtur9k82vmjBLND06SSeb10oq-rw7zmzrpoPY',
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
          console.log('허용 X');
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