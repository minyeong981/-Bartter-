import axios from 'axios';
import toast from 'react-hot-toast';

import {getFcmToken} from '@/config/firebaseConfig.ts';
import {router} from '@/main.tsx';
import barter from '@/services/barter.ts';
import useRootStore from '@/store';
import parser from '@/util/parser.ts';

// TODO: 배포시 BASE URL 확인할 것, .env 파일에 VITE_BASEURL = {실제 서버 BASE URL} 추가
const instance = axios.create({
  baseURL: import.meta.env.VITE_BASEURL + '/api',
  responseType: 'json',
  timeout: 4000,
  withCredentials: true,
});

instance.interceptors.request.use(
  async config => {
    const token = useRootStore.getState().token;
    if (token) {
      config.headers.setAuthorization(`Bearer ${token}`);
    }

    if (useRootStore.getState().isLogin) {
      await getFcmToken();

      if (sessionStorage.getItem('fcmToken')) {
        await fetch(import.meta.env.VITE_BASEURL + '/api/user/fcm', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          method: 'POST',
          body: JSON.stringify({token: sessionStorage.getItem('fcmToken')}),
        });
      }
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    if (error.response.data.message) {
      toast.dismiss();
      toast.error(error.response.data.message);
    }
    if (error.response.status === 401 && error.response.data.code === 2001) {
      const response = await barter.reIssue();
      const token = parser.getAccessToken(response);
      useRootStore.getState().login(token);
      return instance.request(error.config);
    } else if (
      (error.response.status === 400 && error.response.data.code === 2002) ||
      (error.response.status === 400 && error.response.data.code === 2003) ||
      (error.response.status === 400 && error.response.data.code === 2004)
    ) {
      toast.error('다시 로그인해주세요.');
      localStorage.clear();
      sessionStorage.clear();
      await router.navigate({to: '/entrance/login'});
    }

    return Promise.reject(error);
  },
);

export default instance;
