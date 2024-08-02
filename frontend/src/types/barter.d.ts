type Male = 'M';
type Female = 'F';
type Username = string;
type Password = string;
type Nickname = string;
type Birth = string;
type Gender = Male | Female;
type Latitude = number;
type Longitude = number;
type PhoneNumber = string;
type Email = string;

type UserId = string;

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
  phone: PhoneNumber;
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
  imageId: ImageId;
  imageUrl: ImageUrl;
  imageOrder: ImageOrder;
}

type LocationId = number;
type LocationName = string;

interface SimpleLocation {
  locationId: LocationId;
  locationName: LocationName;
}

type CommunityPostId = number;
type Title = string;
type LikeCount = number;
type CommentCount = number;
type Image = string | null;
type isLike = boolean;

interface CommunityPost {
  communityPostId: CommunityPostId;
  user: SimpleUser;
  location: SimpleLocation;
  title: Title;
  content: Content;
  likeCount: LikeCount;
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
type IsLike = boolean;
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

interface Auth {
  isLogin: boolean;
  token: string;
}

interface BarterResponse<T> {
  isSuccess: boolean;
  code: number;
  message: string;
  data: T;
  errors: string[];
}

type CommunityPostList = CommunityPost[];

type SignupResponse = BarterResponse<null>;
type LoginResponse = BarterResponse<null>;
type ReIssueResponse = BarterResponse<null>;
type LogoutResponse = BarterResponse<null>;
type GetCurrentLocationResponse = BarterResponse<SimpleLocation>;
type GetUserProfileResponse = BarterResponse<UserProfile>;
type GetUserLocationResponse = BarterResponse<UserLocation>;
type GetCommunityPostListResponse = BarterResponse<CommunityPostList>;
type PostCommunityPostResponse = BarterResponse<null>;
type GetCommunityPostResponse = BarterResponse<CommunityPost>;
type DeleteCommunityPostResponse = BarterResponse<null>;
type PostCommentResponse = BarterResponse<null>;
type DeleteCommentResponse = BarterResponse<null>;
type PostLikeResponse = BarterResponse<null>;
type GetTradePostListResponse = BarterResponse<SimpleCropTradePostList>;
type GetTradePostResponse = BarterResponse<CropTradePost>;
// TODO: 농작물 프로필 등록