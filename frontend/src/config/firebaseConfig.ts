import {initializeApp} from 'firebase/app';
import {getMessaging, getToken, onMessage} from 'firebase/messaging';
import toast from 'react-hot-toast';

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
  onMessage(messaging, payload => {
    if (!payload.data) return;

    const {body} = payload.data;
    toast.dismiss();
    toast.success(body);
  });
};

/**
 * FCM 토큰을 가져오는 함수
 * 사용자에게 알림 권한을 요청하고, FCM 토큰을 반환한다.
 */
const getFcmToken = async () => {
  // 세션 스토리지에 FCM 토큰이 있는지 확인
  const existingToken = sessionStorage.getItem('fcmToken');
  if (existingToken) {
    return existingToken; // 이미 토큰이 있는 경우, 해당 토큰을 반환
  }

  try {
    // 알림 권한 요청
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      console.log('Notification permission granted.');

      // FCM 토큰 가져오기
      const currentToken = await getToken(messaging, {
        vapidKey:
          'BGVbiPhLWWxijrc2jfn9lTyDs-kcSfSinb2bUmEoDXSc8ljx6sWtur9k82vmjBLND06SSeb10oq-rw7zmzrpoPY', // VAPID 키
      });

      if (currentToken) {
        console.log('FCM Token:', currentToken);
        // 토큰을 세션 스토리지에 저장
        sessionStorage.setItem('fcmToken', currentToken);
        return currentToken;
      } else {
        console.warn(
          'FCM 토큰을 가져올 수 없습니다. 권한이 없거나 문제가 발생했습니다.',
        );
        return null;
      }
    } else {
      console.log('Notification permission denied.');
      return null;
    }
  } catch (error) {
    console.error('FCM 토큰을 가져오는 중 오류 발생:', error);
    return null;
  }
};

export {messaging, handleForegroundMessages, getFcmToken};
