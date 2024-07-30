import axios from '@/util/axios';

export default {
  signup: async (data: SignupForm) =>
    axios.post<SignupResponse>('/user/join', data),
  login: async (data: LoginForm) => axios.post<LoginResponse>('/login', data),
  reIssue: async () => axios.post<ReIssueResponse>('/auth/reissue'),
  logout: async () => axios.post<LogoutResponse>('/user/logout'),
  getCurrentLocation: async (data: Coordinate) =>
    axios.post<GetCurrentLocationResponse>('/user/location', data),
  // TODO: 현재 위치 조회
};