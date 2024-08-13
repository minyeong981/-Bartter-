export const NICKNAME_PATTERN = /^[a-zA-Z0-9가-힣]{1,}$/;
export const USERNAME_PATTERN =
  /^[a-zA-Z0-9!@#$%^&*()_+~`|}{[\]:;?><,./-=]{8,}$/;
export const PASSWORD_PATTERN =
  /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
export const BIRTH_PATTERN =
  /^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
export const NUMBER_PATTERN = /^\d{11}$/;
export const EMAIL_PATTERN =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;