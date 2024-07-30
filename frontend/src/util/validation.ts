export const USERID_PATTERN = /^[a-zA-Z0-9]{4,}$/;
export const PASSWORD_PATTERN =
  /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
export const BIRTH_PATTERN = /^\d{4}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])$/;
export const NUMBER_PATTERN = /[0-9]{10,11}/;
export const EMAIL_PATTERN =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;