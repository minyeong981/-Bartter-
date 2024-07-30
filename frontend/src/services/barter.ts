import axios from '@/util/axios';

export default {
  signup: async (data: SignupForm) =>
    axios.post<SignupResponse>('/user/join', data),
  login: async (data: LoginForm) => axios.post<LoginResponse>('/login', data),
  reIssue: async () => axios.post<ReIssueResponse>('/auth/reissue'),
  logout: async () => axios.post<LogoutResponse>('/user/logout'),
  getCurrentLocation: async (data: Coordinate) =>
    axios.post<GetCurrentLocationResponse>('/user/location', data),
  getUserProfile: async (userId: UserId) =>
    axios.get<GetUserProfileResponse>(`/user/${userId}/profile`),
  getUserLocation: async (userId: UserId) =>
    axios.get<GetUserLocationResponse>(`/user/${userId}/location`),
  deleteUser: async (userId: UserId) => axios.delete(`/user/${userId}`),
  follow: async (userId: UserId) => axios.post(`/user/${userId}/follow`),
  unfollow: async (userId: UserId) => axios.post(`/user/${userId}/unfollow`),
  // getCommunityPostList:
  getTradePostList: async (page: number, limit: number) =>
    axios.get<GetTradePostListResponse>(
      `/trades/posts?page=${page}&limit=${limit}`,
    ),
  getTradePostDetail: async (tradePostId: TradePostId) =>
    axios.get<GetTradePostResponse>(`/trades/posts/${tradePostId}`),
};