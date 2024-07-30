import type {StateCreator} from 'zustand';

export interface AuthSlice extends Auth {
  login: (token: string) => void;
  logout: () => void;
}

const INITIAL_AUTH_STATE: Auth = {
  token: '',
  isLogin: false,
};

export const createAuthSlice: StateCreator<
  AuthSlice,
  [],
  [],
  AuthSlice
> = set => ({
  ...INITIAL_AUTH_STATE,
  login: token => set({token, isLogin: true}),
  logout: () => set({...INITIAL_AUTH_STATE}),
});