import {jwtDecode} from 'jwt-decode';
import type {StateCreator} from 'zustand';

interface JWT_PAYLOAD {
  category: string;
  exp: number;
  iat: number;
  role: string;
  sub: string;
  userId: number;
}

export interface AuthSlice extends Auth {
  login: (token: string) => void;
  logout: () => void;
}

const INITIAL_AUTH_STATE: Auth = {
  token: '',
  isLogin: false,
  userId: 0,
  username: '',
};

export const createAuthSlice: StateCreator<
  AuthSlice,
  [],
  [],
  AuthSlice
> = set => ({
  ...INITIAL_AUTH_STATE,
  login: token => {
    const payload = jwtDecode<JWT_PAYLOAD>(token);
    const userId = payload.userId;
    const {sub: username} = payload;
    set({token, isLogin: true, userId, username});
  },
  logout: () => set({...INITIAL_AUTH_STATE}),
});