import {format} from 'date-fns';
import localforage from 'localforage';
import type {StateCreator} from 'zustand';

export interface Crop {
  id: number;
  name?: string;
  nickname?: string;
  image?: string;
  date?: string;
  description?: string;
}

export interface DiarySlice {
  activeComponent: string;
  crops: Crop[];
  nickname: string;
  description: string;
  date: string;
  image?: string;
  initialImage: string;
  setActiveComponent: (component: string) => void;
  addCrop: (crop: Crop) => void;
  loadCrops: () => void;
  setNickname: (newNickname: string) => void;
  setDescription: (newDescription: string) => void;
  setDate: (newDate: string) => void;
  setImage: (newImage: string) => void;
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

export const createDiarySlice: StateCreator<DiarySlice> = set => ({
  activeComponent: '달력',
  crops: [],
  ...INITIAL_FORM_STATE,
  setActiveComponent: (component: string) => set({activeComponent: component}),
  addCrop: async (crop: Crop) => {
    const updatedCrops = (await localforage.getItem<Crop[]>('my-crops')) || [];
    updatedCrops.push(crop);
    await localforage.setItem('my-crops', updatedCrops);
    set({crops: updatedCrops});
  },
  loadCrops: async () => {
    const storedCrops = await localforage.getItem<Crop[]>('my-crops');
    if (storedCrops) {
      set({crops: storedCrops});
    }
  },
  setNickname: (newNickname: string) => set({nickname: newNickname}),
  setDescription: (newDescription: string) =>
    set({description: newDescription}),
  setDate: (newDate: string) => set({date: newDate}),
  setImage: (newImage: string) => set({image: newImage}),
  setInitialImage: (newImage: string) => {
    console.log('Setting initial image:', newImage); // 로그 추가
    set({initialImage: newImage});
  },
  resetCropForm: () => set({...INITIAL_FORM_STATE}),
});

export default createDiarySlice;