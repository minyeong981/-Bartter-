type CommunityPostId = number;
type Title = string;
type Content = string;
type CreatedAt = string;
type ImageUrl = string;
type HasImage = boolean;
type LocationId = number;
type Name = string;
type sortBy = string;

interface SimpleLocation {
  locationId: LocationId;
  name: Name;
}

// interface MyCommunityPostDetail {
//   communityPostId: CommunityPostId;
//   title: Title;
//   content: Content;
//   createdAt: CreatedAt;
//   imageUrl: ImageUrl;
//   hasImage: HasImage;
//   location: SimpleLocation;
// }

type LikeCount = number;
type IsLike = boolean;
type CommentCount = number;

interface SimpleCommunityPostDetail {
  communityPostId: CommunityPostId;
  title: Title;
  content: Content;
  createdAt: CreatedAt;
  likeCount: LikeCount;
  isLike: IsLike;
  commentCount: CommentCount;
  imageUrl: ImageUrl;
  hasImage: HasImage;
  location: SimpleLocation;
}

type UserId = number;
type ProfileImage = string;

interface SimpleUserProfile {
  userId: UserId;
  nickname: Nickname;
  profileImage: ProfileImage;
}

interface SimpleUserProfileByKeyword {
  userId: UserId;
  nickname: Nickname;
  profileImage: ProfileImage;
  isFollow:IsFollowed;
}

type ImageOrder = number;

interface SimpleCommunityImage {
  imageUrl: ImageUrl;
  imageOrder: ImageOrder;
}

type CommunityPostCommentId = number;

interface CommunityPostCommentDetail {
  communityPostCommentId: CommunityPostCommentId;
  author: SimpleUserProfile;
  content: Content;
  createdAt: CreatedAt;
}

interface CommunityPostDetail {
  communityPostId: CommunityPostId;
  author: SimpleUserProfile;
  location: SimpleLocation;
  title: Title;
  content: Content;
  likeCount: LikeCount;
  isLike: IsLike;
  imageList: SimpleCommunityImage[];
  commentList: CommunityPostCommentDetail[];
  createdAt: CreatedAt;
}

type Image = string;

type CropDiaryId = number;

type CropId = number;

interface SimpleCropProfile {
  userId: UserId;
  cropId: CropId;
  nickname: Nickname;
  image: Image;
}

type PerformDate = string;

interface CropDiaryDetail {
  CropDiaryId: CropDiaryId;
  crop: SimpleCropProfile;
  title: Title;
  content: Content;
  image: Image;
  performDate: PerformDate;
  createdAt: CreatedAt;
}

type CropProfileImage = string;
type UserNickname = string;
type CropNickname = string;
type DayWithCrop = number;
type TradeCount = number;

interface CropForDiaryMetaData {
  cropProfileImage: CropProfileImage;
  userNickname: UserNickname;
  cropNickname: CropNickname;
  dayWithCrop: DayWithCrop;
  tradeCount: TradeCount;
}

interface CropDiaryThumbnail {
  cropDiaryId: CropDiaryId;
  image: Image;
  performDate: PerformDate;
}

interface CropDiaryListDto {
  cropInfo: CropForDiaryMetaData;
  thumbnailList: CropDiaryThumbnail[];
}

interface CropDiaryDetail {
  cropDiaryId: CropDiaryId;
  crop: SimpleCropProfile;
  title: Title;
  content: Content;
  image: Image;
  performDate: PerformDate;
  createdAt: CreatedAt;
}

type ReportId = number;
type ReportTitle = string;
type Month = number;
type WeekOfMonth = number;

interface SimpleCropReportDetail {
  reportId: ReportId;
  cropProfileImage: CropProfileImage;
  reportTitle: ReportTitle;
  month: Month;
  weekOfMonth: WeekOfMonth;
}

type ReportContent = string;

interface CropReportDetail {
  cropReportId: ReportId;
  cropNickname: CropNickname;
  cropProfileImage: CropProfileImage;
  reportTitle: ReportTitle;
  reportContent: ReportContent;
  month: Month;
  weekOfMonth: WeekOfMonth;
}

interface SimpleCropProfile {
  userId: UserId;
  cropId: CropId;
  nickname: Nickname;
  image: File;
}

interface CropTradeHistoryDto {
  give: SimpleCropProfile[];
  receive: SimpleCropProfile[];
}

interface CropDiaryThumbnail {
  cropDiaryId: CropDiaryId;
  image: Image;
  performDate: PerformDate;
}

interface CropDiaryDetailWithUser {
  author: SimpleUserProfile;
  cropDiaryId: CropDiaryId;
  image: Image;
  title: Title;
  content: Content;
  createdAt: CreatedAt;
}

type CropTradePostId = number;

type Status = 'IN_PROGRESS' | 'RESERVED' | 'COMPLETED';

type IsShare = boolean;

interface SimpleTradePostDetail {
  cropTradePostId: CropTradePostId;
  title: Title;
  image: Image;
  status: Status;
  location: SimpleLocation;
  likeCount: LikeCount;
  createdAt: CreatedAt;
  isLike: IsLike;
  isShare: IsShare;
}

type Keyword = string;

type TradePostId = number;

interface SimpleKeywordList {
  userProfileList: SimpleUserProfileByKeyword[];
  communityPostList: SimpleCommunityPostDetail[];
  tradePostList: SimpleTradePostDetail[];
}

type HasCrop = boolean;

interface TradePostDetail {
  tradePostId: TradePostId;
  title: Title;
  content: Content;
  author: SimpleUserProfile;
  isLike: IsLike;
  isShare: IsShare;
  hasCrop: HasCrop;
  cropId: CropId;
  imageList: Image[];
  location: SimpleLocation;
  desiredCategoryList: CropCategoryDetail[];
  createdAt: CreatedAt;
}

type GrowDate = string;
type Description = string;

interface CropProfile {
  cropId: CropId;
  farmer: SimpleUserProfile;
  cropCategory: CropCategoryDetail;
  nickname: Nickname;
  image: Image;
  growDate: GrowDate;
  description: Description;
}

type CropCategoryId = number;

interface CropCategoryDetail {
  cropCategoryId: CropCategoryId;
  name: Name;
  image: Image;
}

interface CommunityPostCommentDetail {
  communityPostCommentId: CommunityPostCommentId;
  author: SimpleUserProfile;
  content: Content;
  createdAt: CreatedAt;
}

type TradeId = number;

interface TradeInfo {
  tradeId: TradeId;
  simpleTradePostDetail: SimpleTradePostDetail;
}

type CHAT_TYPE = 'CHAT' | 'JOIN' | 'LEAVE';

type SenderId = number;

interface ChatMessage {
  type: CHAT_TYPE;
  content: Content;
  senderId: SenderId;
  tradeId: TradeId;
}

interface TradeInfo {
  tradeId: TradeId;
  simpleTradePostDetail: SimpleTradePostDetail;
}

type Latitude = number;
type Longitude = number;

type Username = string;
type Password = string;
type Nickname = string;
type Birth = string;
type Phone = string;
type Email = string;

interface SignupForm {
  username: Username;
  password: Password;
  nickname: Nickname;
  birth: Birth;
  gender: Gender;
  latitude: Latitude;
  longitude: Longitude;
  phone: Phone;
  email: Email;
}

interface LoginForm {
  username: Username;
  password: Password;
}

type Male = 'M';
type Female = 'F';
type Gender = Male | Female;

type ProfileMessage = string;

type FollowerCount = number;
type FolloweeCount = number;
type IsFollowed = boolean;

interface UserProfile {
  userId: UserId;
  profileImage: ProfileImage;
  nickname: Nickname;
  profileMessage: ProfileMessage;
  location: SimpleLocation;
  followerCount: FollowerCount;
  followeeCount: FolloweeCount;
  isFollowed: IsFollowed;
}

interface Auth {
  isLogin: boolean;
  token: string;
  userId: UserId;
  username: Username;
}

interface BarterResponse<T> {
  isSuccess: boolean;
  code: number;
  message: string;
  data: T;
  errors: string[];
}

type Search = string;

type CommunityPostList = CommunityPost[];

interface Position {
  longitude: Longitude;
  latitude: Latitude;
}

interface CropTradeForm {
  create: {
    title: Title;
    content: Content;
    shareStatus: boolean;
    locationId: LocationId;
    cropId?: CropId;
    cropCategoryId: CropCategoryId;
    wishCropCategoryList: CropCategoryId[];
  };
  images: File[];
}

interface CommunityPostForm {
  title: Title;
  content: Content;
  imageList: File[];
}

interface CropProfileForm {
  cropCategoryId: CropCategoryId;
  nickname: Nickname;
  growDate: GrowDate;
  description?: Description;
  image? : File[];
}

interface CropDiaryForm {
  cropId:number;
  title:string;
  content:string;
  image:File[];
  performDate:string;
}

interface SearchContextType {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  keyword:string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  isSearch: boolean;
  setIsSearch : React.Dispatch<React.SetStateAction<boolean>>;
  isSearchBarShow : boolean;
  setIsSearchBarShow: React.Dispatch<React.SetStateAction<boolean>>;
}
type AdditionalInfo = Position;

type GetCommunityPostListByUserId = BarterResponse<MyCommunityPostDetail[]>;
type GetCommunityPostList = BarterResponse<SimpleCommunityPostDetail[]>;
type PostCommunityPostResponse = BarterResponse<CommunityPostDetail>;
type PostCommunityPostLikeResponse = BarterResponse<null>;
type DeleteCommunityPostLikeResponse = BarterResponse<null>;
type GetCommunityPostDetailResponse = BarterResponse<CommunityPostDetail>;
type DeleteCommunityPostResponse = BarterResponse<null>;
type PostDiaryResponse = BarterResponse<CropDiaryDetail>;
type GetDiaryListByCropIdResponse = BarterResponse<CropDiaryListDto>;
type GetDiaryDetailResponse = BarterResponse<CropDiaryDetail>;
type DeleteDiaryResponse = BarterResponse<null>;
type GetAiReportListResponse = BarterResponse<SimpleCropReportDetail[]>;
type GetAiReportDetailResponse = BarterResponse<CropReportDetail>;
type GetDailyTip = BarterResponse<string>;
type DeleteDailyTip = BarterResponse<null>;
type GetCropsByUserIdResponse = BarterResponse<SimpleCropProfile[]>;
type GetCropsTradedByUserIdResponse = BarterResponse<CropTradeHistoryDto>;
type GetDiaryListByUserIdResponse = BarterResponse<CropDiaryThumbnail[]>;
type GetDiaryListByDateResponse = BarterResponse<CropDiaryDetail[]>;
type GetDiaryListOfNeighborResponse = BarterResponse<CropDiaryDetailWithUser[]>;
type GetSearch = BarterResponse<SimpleKeywordList>;
type GetRecentKeyword = BarterResponse<string[]>;
type GetTradePostListByKeyword = BarterResponse<SimpleTradePostDetail[]>;
type GetCommunityPostListByKeyword = BarterResponse<SimpleCommunityPostDetail[]>;
type GetUserListByKeyword = BarterResponse<SimpleUserProfile[]>;
type DeleteKeyword = BarterResponse<null>;
type GetCropTradeListResponse = BarterResponse<SimpleTradePostDetail[]>;
type GetTradePostListByUserId = BarterResponse<SimpleTradePostDetail[]>;
type GetPickedTradePostListByUserId = BarterResponse<SimpleTradePostDetail[]>;
type GetCropTradeDetailResponse = BarterResponse<TradePostDetail>;
type GetCropProfile = BarterResponse<CropProfile>;
type GetCropCategoryList = BarterResponse<CropCategoryDetail[]>;
type GetTradeInfo = BarterResponse<TradeInfo>;
type GetTradeChat = BarterResponse<ChatMessage[]>;
type PostLocation = BarterResponse<SimpleLocation>;
type PatchLocation = BarterResponse<SimpleLocation>;
type PostJoin = BarterResponse<null>;
type GetUserProfileResponse = BarterResponse<UserProfile>;
type PostUserLocation = BarterResponse<SimpleLocation>;
type GetUserLocationResponse = BarterResponse<SimpleLocation>;
type GetHasDiaryResponse = BarterResponse<string[]>;

// TODO: 농작물 물물교환 API 부터는 GET요청만 정의
// type SignupResponse = BarterResponse<null>;
// type LoginResponse = BarterResponse<null>;
// type ReIssueResponse = BarterResponse<null>;
// type LogoutResponse = BarterResponse<null>;
// type GetCurrentLocationResponse = BarterResponse<SimpleLocation>;
// type GetUserProfileResponse = BarterResponse<UserProfile>;
// type GetUserLocationResponse = BarterResponse<UserLocation>;
// type GetCommunityPostListResponse = BarterResponse<CommunityPostList>;
// type GetCommunityPostResponse = BarterResponse<CommunityPost>;
// type GetCommunityPostListByUserResponse = BarterResponse<>;
// type PostCommentResponse = BarterResponse<PostComment>;
// type DeleteCommentResponse = BarterResponse<null>;
// type PostLikeResponse = BarterResponse<null>;
// type PostUnLikeResponse = BarterResponse<null>;
// type GetTradePostListResponse = BarterResponse<SimpleCropTradePostList>;
// type GetTradePostResponse = BarterResponse<CropTradePost>;
// type GetCropCategoryListResponse = BarterResponse<CropCategoryDetail[]>;
// type PostCropProfileResponse = BarterResponse<CropProfile>;
// type GetCropProfileResponse = BarterResponse<CropProfile>;
// type GetCropProfileListByUserResponse = BarterResponse<CropProfile[]>;
// type GetCropDiaryListByUser = BarterResponse<CropDiary[]>;
// type GetCropDiaryListByCrop = BarterResponse<CropDiary[]>;
// type GetCropTradedByUser = BarterResponse<CropProfile[]>;
// type PostCropDiaryResponse = BarterResponse<CropDiary>;
// type GetCropDiaryResponse = BarterResponse<CropDiary>;
// type DeleteCropDiaryResponse = BarterResponse<null>;
// type GetNeighborCropDiaryListResponse = BarterResponse<CropDiary[]>;
// type GetRecentSearchKeywordListResponse = BarterResponse<string[]>;
// type DeleteRecentSearchKeywordResponse = BarterResponse<null>;
// type GetSearchResultResponse = BarterResponse<SearchResult>;
// type PostAdditionalInfoResponse = BarterResponse<null>;