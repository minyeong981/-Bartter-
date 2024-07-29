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

interface CommunityPost {
  communityPostId: CommunityPostId;
  user: SimpleUser;
  location: SimpleLocation;
  title: Title;
  content: Content;
  likeCount: LikeCount;
  commentList: Comment[];
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

type UserId = number;
type ProfileImage = string;

interface SimpleUser {
  userId: UserId;
  nickname: Nickname;
  profileImage: ProfileImage;
}

type CommentId = number;
type Content = string;
type CreatedAt = string;

interface Comment {
  commentId: CommentId;
  user: SimpleUser;
  content: Content;
  created_at: CreatedAt;
}

interface BarterResponse<T> {
  isSuccess: boolean;
  code: number;
  message: string;
  data: T;
  errors: string[];
}

type SignupResponse = BarterResponse<null>;
type LoginResponse = BarterResponse<null>;
type ReIssueResponse = BarterResponse<null>;
type LogoutResponse = BarterResponse<null>;