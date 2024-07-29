import {create} from 'zustand';
import {persist} from 'zustand/middleware';

interface SignupStore {
  username: Username;
  password: Password;
  nickname: Nickname;
  birth: Birth;
  latitude: Latitude | null;
  longitude: Longitude | null;
  gender: Gender | null;
  email: Email | null;
  phoneNumber: PhoneNumber;
  setNickname: (neewName: string) => void;
  setBirth: (newBirth: string) => void;
  setUsername: (newUserId: string) => void;
  setPassword: (newPassword: string) => void;
  setGender: (newGender: Gender) => void;
  setEmail: (newEmail: string | null) => void;
  setPhoneNumber: (nwPhoneNumber: string) => void;
  setCoordinate: (newCoordinate: GeolocationCoordinates) => void;
}

const useSignupStore = create<SignupStore>()(
  persist(
    set => ({
      username: '',
      password: '',
      nickname: '',
      birth: '',
      latitude: null,
      longitude: null,
      gender: null,
      email: null,
      phoneNumber: '',
      setNickname: newNickname => set({nickname: newNickname}),
      setBirth: newBirth => set({birth: newBirth}),
      setUsername: newUsername => set({username: newUsername}),
      setPassword: newPassword => set({password: newPassword}),
      setGender: (newGender: Gender) => set({gender: newGender}),
      setEmail: newEmail => set({email: newEmail}),
      setPhoneNumber: newPhoneNumber => set({phoneNumber: newPhoneNumber}),
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