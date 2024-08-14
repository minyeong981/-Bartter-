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
  getCurrentLocation: async (data: Position) =>
    axios.post<PostUserLocation>('/user/location', data),
    /**
   * 위치 정보 변경
   */
    changeCurrentLocation: async (data: Position) =>
      axios.patch<PostUserLocation>('/user/location', data),
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
    axios.get<GetCommunityPostListByUserId>(`/users/${userId}/community/posts`),

  // 나눔/물물교환
  /**
   * 물물교환 게시글 목록 조회
   */
  getTradePostList: async (
    page?: number,
    limit?: number,
    givenCategory?: number,
  ) =>
    axios.get<GetCropTradeListResponse>(`/trades/posts`, {
      params: {page, limit, givenCategory},
    }),
  /**
   * 물물교환 게시글 상세 조회
   */
  getTradePostDetail: async (tradePostId: TradePostId) =>
    axios.get<GetCropTradeDetailResponse>(`/trades/posts/${tradePostId}`),
  /**
   * 물물교환 글 작성
   */
  postTradePost: async ({create, images}: CropTradeForm) => {
    const formData = new FormData();

    for (const [key, value] of Object.entries(create)) {
      if (value === typeof 'object') {
        if (Array.isArray(value)) {
          for (const arrVal of value) {
            formData.append(key, arrVal);
          }
        } else {
          formData.append(key, JSON.stringify(value));
        }
      } else {
        formData.append(key, String(value));
      }
    }

    images.forEach(image => {
      formData.append('images', image);
    });

    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    return axios.post('/trades/posts', formData, {
      headers: {'Content-Type': 'multipart/form-data'},
    });
  },
  /**
   * 물물교환 게시글 찜
   */
  likeTradePost: async (tradePostId: TradePostId) =>
    axios.post(`/trades/posts/${tradePostId}/like`),
  /**
   * 물물교환 게시글 찜 취소
   */
  unLikeTradePost: async (tradePostId: TradePostId) =>
    axios.delete(`/trades/posts/${tradePostId}/like`),
  /**
   * 물물교환 게시글 예약
   */
  reserveTradePost: async (tradePostId: TradePostId) =>
    axios.post(`/trades/post/${tradePostId}/reservation`),
  /**
   * 유저가 작성한 물물교환 게시글 전체 조회
   */
  getTradePostListByUser: async (userId: UserId) =>
    axios.get<GetTradePostListByUserId>(`/users/${userId}/trades/posts`),
  /**
   * 유저가 찜한 물물교환 게시글 전체 조회
   */
  getPickedTradePostList: async (
    userId: UserId,
    page?: number,
    limit?: number,
  ) =>
    axios.get<GetPickedTradePostListByUserId>(
      `/users/${userId}/trades/posts/likes`,
      {
        params: {page, limit},
      },
    ),
  /**
   * 물물교환 게시글 삭제
   */
  deleteTradePost: async (tradePostId: TradePostId) =>
    axios.delete(`/trades/posts/${tradePostId}`),
  /**
   *  물물교환 진행으로 변경
   */
  putTradeProgress: async (tradePostId: TradePostId) =>
    axios.put(`/trades/posts/${tradePostId}/progress`),
  /**
   * 물물교환 예약으로 변경
   */
  putTradeReservation: async (tradePostId: TradePostId) =>
    axios.put(`/trades/posts/${tradePostId}/reserve`),
  /**
   * 물물교환 완료로 변경
   */
  putTradeComplete: async (tradePostId: TradePostId) =>
    axios.put(`/trades/posts/${tradePostId}/complete`),
  /**
   * 게시글 정보 기준 채팅방 정보 조회
   */
  getChatListByTradePostId: async (tradePostId: TradePostId) =>
    axios.get<getChatListByTradePostIdResponse>(
      `/trades/${tradePostId}/history`,
    ),

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
    year?: number,
    month?: number,
  ) =>
    axios.get<GetDiaryListByUserIdResponse>(`/users/${userId}/crops/diaries`, {
      params: {
        page,
        limit,
        year,
        month,
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
    axios.get<GetDiaryListByDateResponse>(
      `/users/${userId}/crops/diaries/daily`,
      {
        params: {
          date,
        },
      },
    ),
  /**
   * 유저가 교환 & 나눔한 농작물 조회
   */
  getCropListTradedByUser: async (userId: UserId) =>
    axios.get<GetCropsTradedByUserIdResponse>(`/users/${userId}/crops/trades`),
  /**
   * 농사일지 작성
   */
  postCropDiary: async (data: CropDiaryForm) => {
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
      },
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
  /**
   * 키워드 검색어 자동 완성 제안
   */
  getAutoCompletedKeywordListByKeyword: async (keyword: string) =>
    axios.get<GetAutoCompletedKeywordListByKeyword>(`/search/autocomplete`, {
      params: {keyword},
    }),
  /**
   * 키워드 검색 물물교환 게시글 목록 조회
   */
  getTradePostListByKeyword: async (
    keyword: string,
    page?: number,
    limit?: number,
  ) =>
    axios.get<GetTradePostListByKeyword>(`/search/trades`, {
      params: {keyword, page, limit},
    }),
  /**
   * 키워드 검색 동네모임 게시글 목록 조회
   */
  getCommunityPostListByKeyword: async (
    keyword: string,
    page?: number,
    limit?: number,
  ) =>
    axios.get<GetCommunityPostListByKeyword>(`/search/community`, {
      params: {keyword, page, limit},
    }),
  /**
   * 키워드 검색 유저 목록 조회
   */
  getUserListByKeyword: async (
    keyword: string,
    page?: number,
    limit?: number,
  ) =>
    axios.get<GetUserListByKeyword>(`/search/users`, {
      params: {keyword, page, limit},
    }),

  // 하루 농사 알리미
  /**
   * 하루 알리미 조회
   */
  getDailyTip: async () => axios.get<GetDailyTip>('/crops/tips'),

  /**
   * 하루 알리미 삭제
   */
  deleteDailyTip: async () => axios.patch<DeleteDailyTip>('/crops/tips'),

  // AI 요약 리포트
  /**
   * AI 요약 리포트 전체 조회
   */
  getAiReportList: async (startDate: string, endDate: string, desc?: boolean) =>
    axios.get<GetAiReportListResponse>('/crops/reports', {
      params: {
        startDate,
        endDate,
        desc,
      },
    }),
  /**
   * AI 요약 리포트 상세 조회
   */
  getAiReportDetail: async (cropReportId: ReportId) =>
    axios.get<GetAiReportDetailResponse>(`/crops/reports/${cropReportId}`),

  // 채팅
  /**
   * 현재 유저의 채팅 기록 조회
   */
  getChatList: async (userId: UserId) =>
    axios.get<GetChatListResponse>(`/users/${userId}/trades`),
  /**
   * 채팅방 만들기
   */
  createChatRoom: async (tradePostId: TradePostId) =>
    axios.post<CreateChatRoomResponse>(`/trades/${tradePostId}`),
  /**
   * 채팅방 조회
   */
  getChatRoomInfo: async (tradePostId: TradePostId, tradeId: TradeId) => axios.get<GetChatRoomInfoResponse>(`/trades/${tradePostId}/${tradeId}`),

  // FCM 토큰 관련
  /**
   * 사용자 FCM 토큰 저장
   */
  postFcmToken: async (fcmToken: string) =>
    axios.post<null>(
      '/user/fcm',
      {token: fcmToken},
      {
        headers: {'Content-Type': 'application/json'},
      },
    ),
  deleteFcmToken: async () => axios.delete<null>('/user/fcm'),
};