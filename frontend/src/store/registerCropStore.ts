import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface RegisterCropStore {
  nickname: string;
  description?: string;
  image?: string;
  date: string;
  setNickname: (newNickname: string) => void;
  setDescription: (newDescription?: string) => void;
  setImage: (newImage?: string) => void;
  setDate: (newDate: string) => void;
  resetCropForm: () => void;
}

const INITIAL_FORM_STATE = {
  nickname: '',
  description: undefined,
  image: undefined,
  date: '',
};

const useRegisterCropStore = create<RegisterCropStore>()(
  persist(
    set => ({
      ...INITIAL_FORM_STATE,
      setNickname: newNickname => set({ nickname: newNickname }),
      setDescription: newDescription => set({ description: newDescription }),
      setImage: newImage => set({ image: newImage }),
      setDate: newDate => set({ date: newDate }),
      resetCropForm: () => set({ ...INITIAL_FORM_STATE }),
    }),
    { name: 'register-crop-form' },
  ),
);

export default useRegisterCropStore;
