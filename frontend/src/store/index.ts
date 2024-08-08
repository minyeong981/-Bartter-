import {create} from 'zustand';
import {devtools, persist} from 'zustand/middleware';

import type {AuthSlice} from '@/store/authSlice.ts';
import {createAuthSlice} from '@/store/authSlice.ts';
import type {DiarySlice} from '@/store/diarySlice.ts';
import {createDiarySlice} from '@/store/diarySlice.ts';

const useRootStore = create<AuthSlice & DiarySlice>()(
  devtools(
    persist(
      (...a) => ({
        ...createDiarySlice(...a),
        ...createAuthSlice(...a),
      }),
      {name: 'zstore'},
    ),
  ),
);

export default useRootStore;