import type {StateCreator} from 'zustand';

export interface SignupSlice {
  username: Username;
  password: Password;
  nickname: Nickname;
  birth: Birth;
  latitude?: Latitude;
  longitude?: Longitude;
  gender?: Gender;
  email?: Email;
  phone: PhoneNumber;
  setNickname: (neewName: string) => void;
  setBirth: (newBirth: string) => void;
  setUsername: (newUserId: string) => void;
  setPassword: (newPassword: string) => void;
  setGender: (newGender: Gender) => void;
  setEmail: (newEmail: string | undefined) => void;
  setPhone: (nwPhoneNumber: string) => void;
  setCoordinate: (newCoordinate: GeolocationCoordinates) => void;
  resetSignupForm: () => void;
}

const INITIAL_FORM_STATE = {
  username: '',
  password: '',
  nickname: '',
  birth: '',
  latitude: undefined,
  longitude: undefined,
  gender: undefined,
  email: undefined,
  phone: '',
};

export const createSignupFormSlice: StateCreator<
  SignupSlice,
  [],
  [],
  SignupSlice
> = set => ({
  ...INITIAL_FORM_STATE,
  setNickname: newNickname => set({nickname: newNickname}),
  setBirth: newBirth => set({birth: newBirth}),
  setUsername: newUsername => set({username: newUsername}),
  setPassword: newPassword => set({password: newPassword}),
  setGender: (newGender: Gender) => set({gender: newGender}),
  setEmail: newEmail => set({email: newEmail}),
  setPhone: newPhone => set({phone: newPhone}),
  setCoordinate: ({latitude, longitude}) =>
    set({
      latitude,
      longitude,
    }),
  resetSignupForm: () => set({...INITIAL_FORM_STATE}),
});