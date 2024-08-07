type Male = 'M';
type Female = 'F';
type Username = string;
type Password = string;
type Nickname = string;
type Birth = string;
type Gender = Male | Female;
type Latitude = number;
type Longitude = number;
type Phone = string;
type Email = string;

type UserId = number;

interface Coordinate {
  latitude: Latitude;
  longitude: Longitude;
}

interface SignupForm {
  username: Username;
  password: Password;
  nickname: Nickname;
  birth: Birth;
  gender: Gender;
  latitude: Latitude;
  longitude: Longitude;
  phone: Phone;
  email?: Email;
}

interface LoginForm {
  username: Username;
  password: Password;
}

type ImageId = number;
type ImageUrl = string;
type ImageOrder = number;

interface SimpleImage {
  imageUrl: ImageUrl;
  imageOrder: ImageOrder;
}

type LocationId = number;
type LocationName = string;

interface SimpleLocation {
  locationId: LocationId;
  name: LocationName;
}

type CommunityPostId = number;
type Title = string;
type LikeCount = number;
type CommentCount = number;
type Image = File;
type IsLike = boolean;

interface CommunityPostForm {
  title: Title;
  content: Content;
  imageList: File[];
}

interface CommunityPost {
  communityPostId: CommunityPostId;
  author: SimpleUser;
  location: SimpleLocation;
  title: Title;
  content: Content;
  likeCount: LikeCount;
  isLike: IsLike;
  commentList: PostComment[];
  imageList: SimpleImage[];
  createdAt: CreatedAt;
}

interface SimpleCommunityPost {
  communityPostId: CommunityPostId;
  location: SimpleLocation;
  title: Title;
  content: Content;
  likeCount: LikeCount;
  isLike: IsLike;
  commentCount: CommentCount;
  image: Image;
  createdAt: CreatedAt;
}

type ProfileImage = string;

interface SimpleUser {
  userId: UserId;
  nickname: Nickname;
  profileImage: ProfileImage;
}

type CommentId = number;
type Content = string;
type CreatedAt = string;

interface PostComment {
  commentId: CommentId;
  user: SimpleUser;
  content: Content;
  created_at: CreatedAt;
}

type FollowingCount = number;
type FolloweeCount = number;
type ProfileMessage = string;

interface UserProfile {
  userId: UserId;
  location: SimpleLocation;
  profileImage: ProfileImage;
  nickname: Nickname;
  followingCount: FollowingCount;
  followeeCount: FolloweeCount;
  profileMessage: ProfileMessage;
}

type Name = string;

interface UserLocation {
  locationId: LocationId;
  name: Name;
}

type SimpleCropTradePostId = number;
type Status = 'NEW' | 'IN_PROGRESS' | 'COMPLETED';
type IsShare = boolean;

interface SimpleCropTradePost {
  cropTradePostId: CropTradePostId;
  title: Title;
  status: Status;
  imageURL: ImageUrl;
  location: SimpleLocation;
  likeCount: LikeCount;
  isLike: IsLike;
  isShare: IsShare;
  createdAt: CreatedAt;
}

type SimpleCropTradePostList = SimpleCropTradePost[];

type CropCategoryId = number;

interface CropCategoryDetail {
  cropCategoryId: CropCategoryId;
  name: Name;
  image: Image;
}

type TradePostId = number;
type HasCrop = boolean;
type CropId = number;
type ImageList = string[];

interface CropTradePost {
  tradePostId: TradePostId;
  title: Title;
  content: Content;
  user: SimpleUser;
  hasCrop: HasCrop;
  cropId: CropId;
  imageList: ImageList;
  location: SimpleLocation;
  desiredCategoryList: CropCategoryDetail[];
  createdAt: CreatedAt;
}

type ShareStatus = boolean;

interface CropTradeForm {
  title: Title;
  content: Content;
  shareStatus: ShareStatus;
  locationId: LocationId;
  cropId: CropId;
  cropCategoryId: CropCategoryId;
  wishCropCategoryList: CropCategoryId[];
}

type GrowDate = string;
type performDate = string;
type Description = string;

interface CropProfileForm {
  cropCategoryId: CropCategoryId;
  nickname: Nickname;
  growDate: GrowDate;
  description?: Description;
  image?: Image[];
}

interface CropProfile {
  cropId: CropId;
  farmer: SimpleUser;
  cropCategory: CropCategoryDetail;
  nickname: Nickname;
  image: Image[];
  growDate: GrowDate;
  description?: Description;
}

interface CropDiary {
  crop: {
    userId: UserId;
    cropId: CropId;
    nickname: Nickname;
    image: Image;
  };
  title: Title;
  content: Content;
  image: Image;
  createdAt: CreatedAt;
}

interface CropDiaryForm {
  cropId: CropId;
  title: Title;
  content: Content;
  image: Image;
  performDate?: PerformDate;
}

type CropDiaryId = number;

interface SearchResult {
  userProfileList: SimpleUser[];
  communityPostList: {
    communityPostId: CommunityPostId;
    title: Title;
    content: Content;
    createdAt: CreatedAt;
    likeCount: LikeCount;
    commentCount: CommentCount;
    imageUrl: ImageUrl;
    hasImage: boolean;
    location: SimpleLocation;
    isLike: boolean;
  }[];
  tradePostList: {
    cropTradePostId: CropTradePostId;
    title: Title;
    imageUrl: ImageUrl;
    status: Status;
    location: SimpleLocation;
    likeCount: LikeCount;
    createdAt: CreatedAt;
    isLike: boolean;
    isShare: IsShare;
  }[];
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

// interface keyword {
//   keyword : string
// }
type CommunityPostList = CommunityPost[];

interface AdditionalInfo {
  latitude: Latitude;
  longitude: Longitude;
}

type SignupResponse = BarterResponse<null>;
type LoginResponse = BarterResponse<null>;
type ReIssueResponse = BarterResponse<null>;
type LogoutResponse = BarterResponse<null>;
type GetCurrentLocationResponse = BarterResponse<SimpleLocation>;
type GetUserProfileResponse = BarterResponse<UserProfile>;
type GetUserLocationResponse = BarterResponse<UserLocation>;
type GetCommunityPostListResponse = BarterResponse<CommunityPostList>;
type PostCommunityPostResponse = BarterResponse<CommunityPost>;
type GetCommunityPostResponse = BarterResponse<CommunityPost>;
type DeleteCommunityPostResponse = BarterResponse<null>;
type GetCommunityPostListByUserResponse = BarterResponse<CommunityPostList>;
type PostCommentResponse = BarterResponse<PostComment>;
type DeleteCommentResponse = BarterResponse<null>;
type PostLikeResponse = BarterResponse<null>;
type PostUnLikeResponse = BarterResponse<null>;
type GetTradePostListResponse = BarterResponse<SimpleCropTradePostList>;
type GetTradePostResponse = BarterResponse<CropTradePost>;
type GetCropCategoryListResponse = BarterResponse<CropCategoryDetail[]>;
type PostCropProfileResponse = BarterResponse<CropProfile>;
type GetCropProfileResponse = BarterResponse<CropProfile>;
type GetCropProfileListByUserResponse = BarterResponse<CropProfile[]>;
type GetCropDiaryListByUser = BarterResponse<CropDiary[]>;
type GetCropDiaryListByCrop = BarterResponse<CropDiary[]>;
type GetCropTradedByUser = BarterResponse<CropProfile[]>;
type PostCropDiaryResponse = BarterResponse<CropDiary>;
type GetCropDiaryResponse = BarterResponse<CropDiary>;
type DeleteCropDiaryResponse = BarterResponse<null>;
type GetNeighborCropDiaryListResponse = BarterResponse<CropDiary[]>;
type GetRecentSearchKeywordListResponse = BarterResponse<string[]>;
type DeleteRecentSearchKeywordResponse = BarterResponse<null>;
type GetSearchResultResponse = BarterResponse<SearchResult>;
type PostAdditionalInfoResponse = BarterResponse<null>;