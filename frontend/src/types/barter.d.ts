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

interface BarterResponse<T> {
  isSuccess: boolean;
  code: number;
  message: string;
  data: T;
  errors: string[];
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

type SignupResponse = BarterResponse<null>;
type LoginResponse = BarterResponse<null>;
type ReIssueResponse = BarterResponse<null>;
type LogoutResponse = BarterResponse<null>