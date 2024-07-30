import { format } from 'date-fns';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface RegisterCropStore {
  nickname: string;
  description?: string;
  date: string;
  image?: string;
  initialImage: string;
  setNickname: (newNickname: string) => void;
  setDescription: (newDescription?: string) => void;
  setDate: (newDate: string) => void;
  setImage: (newImage?: string) => void;
  setInitialImage: (newImage: string) => void;
  resetCropForm: () => void;
}

const INITIAL_FORM_STATE = {
  nickname: '',
  description: '',
  date: format(new Date(), 'yyyy-MM-dd'),
  image: '',
  initialImage: '',
};

const useRegisterCropStore = create<RegisterCropStore>()(
  persist(
    (set) => ({
      ...INITIAL_FORM_STATE,
      setNickname: (newNickname) => set({ nickname: newNickname }),
      setDescription: (newDescription) => set({ description: newDescription }),
      setDate: (newDate) => set({ date: newDate }),
      setImage: (newImage) => set({ image: newImage }),
      setInitialImage: (newImage) => {
        console.log('Setting initial image:', newImage); // 로그 추가
        set({ initialImage: newImage });
      },
      resetCropForm: () => set({ ...INITIAL_FORM_STATE }),
    }),
    {
      name: 'register-crop-form',
      partialize: (state) => ({
        nickname: state.nickname,
        description: state.description,
        date: state.date,
        initialImage: state.initialImage,
      }),
    }
  )
);

export default useRegisterCropStore;
