import {create} from 'zustand';
import {devtools, persist} from 'zustand/middleware';

import type {AuthSlice} from '@/store/authSlice.ts';
import {createAuthSlice} from '@/store/authSlice.ts';
import type {CommunitySlice} from '@/store/communitySlice.ts';
import {createCommunitySlice} from '@/store/communitySlice.ts';
import type {DiarySlice} from '@/store/diarySlice.ts';
import {createDiarySlice} from '@/store/diarySlice.ts';
import type {SignupSlice} from '@/store/signupSlice.ts';
import {createSignupFormSlice} from '@/store/signupSlice.ts';

const useRootStore = create<CommunitySlice & SignupSlice & AuthSlice & DiarySlice>()(
  devtools(
    persist(
      (...a) => ({
        ...createSignupFormSlice(...a),
        ...createCommunitySlice(...a),
        ...createDiarySlice(...a),
        ...createAuthSlice(...a),
      }),
      {name: 'zstore'},
    ),
  ),
);

export default useRootStore;