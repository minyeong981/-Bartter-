import type {AxiosResponse} from 'axios';

export default {
  getAccessToken: (response: AxiosResponse) => {
    const authorization = (response.headers['authorization'] as string) || null;
    if (!authorization || !authorization.includes('Bearer')) {
      throw new Error('엑세스 토큰이 없습니다.');
    }
    return authorization.split(' ')[1];
  },
};