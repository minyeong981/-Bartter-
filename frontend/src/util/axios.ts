import axios from 'axios';
import toast from 'react-hot-toast';

import barter from '@/services/barter.ts';
import useRootStore from '@/store';
import parser from '@/util/parser.ts';

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASEURL,
  responseType: 'json',
  timeout: 4000,
  withCredentials: true,
});

instance.interceptors.request.use(
  config => {
    const token = useRootStore.getState().token;
    if (token) {
      config.headers.setAuthorization(`Bearer ${token}`);
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
    } else if (error.response.status === 401) {
      sessionStorage.clear();
      useRootStore.getState().logout();
    }
    return Promise.reject(error);
  },
);

export default instance;