import {create} from 'zustand';
import {persist} from 'zustand/middleware';

interface SignupStore {
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
}

const useSignupStore = create<SignupStore>()(
  persist(
    set => ({
      username: '',
      password: '',
      nickname: '',
      birth: '',
      latitude: undefined,
      longitude: undefined,
      gender: undefined,
      email: undefined,
      phone: '',
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
    }),
    {name: 'signup-form'},
  ),
);

export default useSignupStore;