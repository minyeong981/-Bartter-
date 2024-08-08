import axios from '@/util/axios';

export default {
  // 회원기능
  /**
   * 회원가입
   */
  signup: async (data: SignupForm) => axios.post<PostJoin>('/user/join', data),
  /**
   * 일반 로그인
   */
  login: async (data: LoginForm) => axios.post<null>('/login', data),
  /**
   *  유저 AccessToken 재요청
   */
  reIssue: async () => axios.post<null>('/auth/reissue'),
  /**
   * 로그아웃
   */
  logout: async () => axios.post<null>('/user/logout'),
  /**
   * 현재 위치 조회
   */
  getCurrentLocation: async (data: Location) =>
    axios.post<PostUserLocation>('/user/location', data),
  /**
   * 유저 프로필 조회
   */
  getUserProfile: async (userId: UserId) =>
    axios.get<GetUserProfileResponse>(`/user/${userId}/profile`),
  /**
   * 유저 위치 조회
   */
  getUserLocation: async (userId: UserId) =>
    axios.get<GetUserLocationResponse>(`/user/${userId}/location`),
  /**
   * 회원 탈퇴
   */
  deleteUser: async (userId: UserId) => axios.delete(`/user/${userId}`),
  /**
   * 유저 팔로우
   */
  follow: async (userId: UserId) => axios.post(`/follow/${userId}`),
  /**
   * 유저 팔로우 취소
   */
  unfollow: async (userId: UserId) => axios.delete(`/follow/${userId}`),
  /**
   * 카카오 로그인 후 추가 정보 기입
   */
  additionalInfo: async (additionalInfo: AdditionalInfo) =>
    axios.post<null>('/auth/additional-info', additionalInfo, {
      withCredentials: true,
    }),

  // 동네 모임
  /**
   * 전체 게시글 조회
   */
  // eslint-disable-next-line max-params
  getCommunityPostList: async (
    page?: number,
    limit?: number,
    isCommunity?: boolean,
    keyword?: string,
  ) =>
    axios.get<GetCommunityPostListByUserId>('/community/posts', {
      params: {page, limit, isCommunity, keyword},
    }),
  /**
   * 게시글 작성
   */
  postCommunityPost: async (data: CommunityPostForm) => {
    const formData = new FormData();

    formData.append('title', data.title);
    formData.append('content', data.content);
    // 이미지 파일 추가
    if (data.imageList && data.imageList.length > 0) {
      data.imageList.forEach(image => {
        formData.append('imageList', image);
      });
    }
    const response = await axios.post<PostCommunityPostResponse>(
      '/community/posts',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response;
  },

  /**
   * 게시글 조회
   */
  getCommunityPost: async (communityPostId: CommunityPostId) =>
    axios.get<GetCommunityPostDetailResponse>(
      `/community/posts/${communityPostId}`,
    ),
  /**
   * 게시글 삭제
   */
  deleteCommunityPost: async (communityPostId: CommunityPostId) =>
    axios.delete<DeleteCommunityPostResponse>(
      `/community/posts/${communityPostId}`,
    ),
  /**
   * 커뮤니티 댓글 작성
   */
  postCommunityComment: async (
    communityPostId: CommunityPostId,
    data: Content,
  ) =>
    axios.post<null>(`/community/posts/${communityPostId}/comment`, {
      content: data,
    }),
  /**
   * 커뮤니티 댓글 삭제
   */
  deleteCommunityComment: async (
    communityPostId: CommunityPostId,
    commentId: CommunityPostCommentId,
  ) =>
    axios.delete<null>(
      `/community/posts/${communityPostId}/comment/${commentId}`,
    ),
  /**
   * 커뮤니티 게시글 좋아요
   */
  likeCommunityPost: async (communityPostId: CommunityPostId) =>
    axios.post<PostCommunityPostLikeResponse>(
      `/community/posts/${communityPostId}/like`,
    ),
  /**
   * 커뮤니티 게시글 좋아요 취소
   */
  unLikeCommunityPost: async (communityPostId: CommunityPostId) =>
    axios.delete<DeleteCommunityPostLikeResponse>(
      `/community/posts/${communityPostId}/like`,
    ),
  /**
   * 유저가 작성한 동네모임 게시글 전체 조회
   */
  getCommunityPostListByUser: async (userId: UserId) =>
    axios.get<GetCommunityPostListByUserId>(
      `/users/${userId}/community/posts`,
    ),

  // 나눔/물물교환
  /**
   * 물물교환 게시글 목록 조회
   */
  getTradePostList: async (page: number, limit: number) =>
    axios.get<GetCropTradeListResponse>(
      `/trades/posts?page=${page}&limit=${limit}`,
      {params: {page, limit}},
    ),
  /**
   * 물물교환 게시글 상세 조회
   */
  getTradePostDetail: async (tradePostId: TradePostId) =>
    axios.get<GetCropTradeDetailResponse>(`/trades/posts/${tradePostId}`),
  /**
   * 물물교환 글 작성
   */
  postTradePost: async (data: CropTradeForm) =>
    axios.post('/trade/posts', data),
  /**
   * 물물교환 게시글 찜
   */
  dipTradePost: async (tradePostId: TradePostId) =>
    axios.post(`/trades/posts/${tradePostId}/like`),
  /**
   * 물물교환 게시글 찜 취소
   */
  unDipTradePost: async (tradePostId: TradePostId) =>
    axios.delete(`/trades/posts/${tradePostId}/like`),
  /**
   * 물물교환 게시글 예약
   */
  reserveTradePost: async (tradePostId: TradePostId) =>
    axios.post(`/trades/post/${tradePostId}/reservation`),

  // 농사일지
  /**
   * 농작물 카테고리 전체 조회 & 검색
   */
  getCropCategoryList: async () =>
    axios.get<GetCropCategoryList>('/crops/categories'),
  /**
   * 농작물 프로필 등록
   */
  postCropProfile: async (data: CropProfileForm) => {
    const form = new FormData();

    for (const [key, value] of Object.entries(data)) {
      if (!value) continue;
      if (key === 'image') {
        console.log(value);
        form.append(key, value[0]);
      } else {
        form.append(key, value);
      }
    }

    const response = axios.post('/crops', form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  },
  /**
   * 농작물 프로필 상세조회
   */
  getCropProfile: async (cropId: CropId) =>
    axios.get<GetCropProfile>(`/crops/${cropId}`),
  /**
   * 유저가 기르는 농작물 전체 조회 & 검색
   */
  getCropProfileListByUser: async (userId: UserId) =>
    axios.get<GetCropsByUserIdResponse>(`/users/${userId}/crops`),
  /**
   * 유저가 쓴 농사일지 전체 목록 조회
   */
  // eslint-disable-next-line max-params
  getCropDiaryListByUser: async (
    userId: UserId,
    page?: number,
    limit?: number,
    isCommunity?: boolean,
    keyword?: string,
  ) =>
    axios.get<GetDiaryListByUserIdResponse>(`/users/${userId}/crops/diaries`, {
      params: {
        page,
        limit,
        isCommunity,
        keyword,
      },
    }),
  /**
   * 특정 농작물의 농사일지 전체 목록 조회
   */
  // eslint-disable-next-line max-params
  getCropDiaryListByCrop: async (cropId: CropId) =>
    axios.get<GetDiaryListByCropIdResponse>(`/crops/diaries/${cropId}/diaries`),
  /**
   * 특정 날짜에 유저가 작성한 농사일지 전체 목록 조회
   */
  getCropDiaryListByDate: async (userId: UserId, date: string) =>
    axios.get<GetDiaryListByDateResponse>(`/users/${userId}/crops/diaries/daily`, {
      params: {
        date
      }
    }),  
  /**
   * 유저가 교환 & 나눔한 농작물 조회
   */
  getCropListTradedByUser: async (userId: UserId) =>
    axios.get<GetCropsTradedByUserIdResponse>(`/users/${userId}/crops/trades`),
  /**
   * 농사일지 작성
   */
  postCropDiary: async (data: CropDiaryDetail) => {
    const form = new FormData();
    for (const [key, value] of Object.entries(data)) {
      if (!value) continue;
      if (key === 'image') {
        console.log(value);
        form.append(key, value[0]);
      } else {
        form.append(key, value);
      }
    }

    const response = axios.post('/crops/diaries', form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  },

  /**
   * 농사일지 상세조회
   */
  getCropDiary: async (cropDiaryId: CropDiaryId) =>
    axios.get<GetDiaryDetailResponse>(`/crops/diaries/${cropDiaryId}`),
  /**
   * 농사일지 삭제
   */
  deleteCropDiary: async (cropDiaryId: CropDiaryId) =>
    axios.delete(`/crops/diaries/${cropDiaryId}`),
  /**
   * 현재 로그인한 유저의 이웃의 농사일지 조회
   */
  getNeighborCropDiaryList: async (count: number) =>
    axios.get<GetDiaryListOfNeighborResponse>(`/users/follows/diaries`, {
      params: {count},
    }),
  /**
   * 현재 로그인한 유저가 특정 달에 농사일지를 작성한 일지들을 조회
   */
  getHasDiary: async (year: number, month: number) =>
    axios.get<GetHasDiaryResponse>(`users/crops/diaries/dates`, {
      params: {
        year,
        month,
      }
    }),
  // 통합검색
  /**
   * 최근 검색 키워드
   */
  getRecentSearchKeywordList: async () =>
    axios.get<GetRecentKeyword>('/search/recent'),
  /**
   * 최근 검색 키워드 삭제
   */
  deleteRecentSearchKeyword: async (keyword: Search) =>
    await axios.delete<DeleteKeyword>(`/search/recent`, {
      params: {keyword},
    }),
  /**
   * 키워드 통합 검색
   */
  searchByKeyword: async (keyword: string) =>
    axios.get<GetSearch>('/search', {params: {keyword}}),
};