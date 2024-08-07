import axios from 'axios';

import barter from '@/services/barter.ts';
import useRootStore from '@/store';
import parser from '@/util/parser.ts';

const instance = axios.create({
  baseURL: 'http://localhost:8080',
  responseType: 'json',
  timeout: 4000,
  // headers:{
  //   "Content-Type":'application/json'
  // }
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
    if (error.response.status === 401 && error.response.data.code === 2001) {
      const response = await barter.reIssue();
      const token = parser.getAccessToken(response);
      useRootStore.getState().login(token);
      return instance.request(error.config);
    }
    return Promise.reject(error);
  },
);

export default instance;