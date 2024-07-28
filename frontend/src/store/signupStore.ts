import {create} from 'zustand';
import {persist} from 'zustand/middleware';

type Male = 'male';
type Female = 'female';

export type Gender = Male | Female;

interface SignupStore {
  name: string;
  birth: string;
  userId: string;
  password: string;
  gender: Gender | null;
  email: string | null;
  phoneNumber: string;
  coordinate?: GeolocationCoordinates;
  setName: (newName: string) => void;
  setBirth: (newBirth: string) => void;
  setUserId: (newUserId: string) => void;
  setPassword: (newPassword: string) => void;
  setGender: (newGender: Gender) => void;
  setEmail: (newEmail: string | null) => void;
  setPhoneNumber: (newPhoneNumber: string) => void;
  setCoordinate: (newCoordinate: GeolocationCoordinates) => void;
}

const useSignupStore = create<SignupStore>()(
  persist(
    set => ({
      name: '',
      birth: '',
      userId: '',
      password: '',
      gender: null,
      email: null,
      phoneNumber: '',
      coordinate: undefined,
      setName: newName => set({name: newName}),
      setBirth: newBirth => set({birth: newBirth}),
      setUserId: newUserId => set({userId: newUserId}),
      setPassword: newPassword => set({password: newPassword}),
      setGender: (newGender: Gender) => set({gender: newGender}),
      setEmail: newEmail => set({email: newEmail}),
      setPhoneNumber: newPhoneNumber => set({phoneNumber: newPhoneNumber}),
      setCoordinate: newCoordinate => set({coordinate: newCoordinate}),
    }),
    {name: 'signup-form'},
  ),
);

export default useSignupStore;