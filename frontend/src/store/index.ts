import {create} from 'zustand';
import {devtools, persist} from 'zustand/middleware';

import type {CommunitySlice} from '@/store/communitySlice.ts';
import {createCommunitySlice} from '@/store/communitySlice.ts';
import type {SignupSlice} from '@/store/signupSlice.ts';
import {createSignupFormSlice} from '@/store/signupSlice.ts';

const useStore = create<CommunitySlice & SignupSlice>()(
  devtools(
    persist(
      (...a) => ({
        ...createSignupFormSlice(...a),
        ...createCommunitySlice(...a),
      }),
      {name: 'zstore'},
    ),
  ),
);

export default useStore;