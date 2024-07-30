import { create } from 'zustand';

interface Crop {
  id: number;
  name: string;
  image?: string;
}

interface DiaryStore {
  activeComponent: string;
  crops: Crop[];
  setActiveComponent: (component: string) => void;
  addCrop: (crop: Crop) => void;
}

const useDiaryStore = create<DiaryStore>((set) => ({
  activeComponent: '달력',
  crops: [],
  setActiveComponent: (component) => set({ activeComponent: component }),
  addCrop: (crop) => set((state) => ({ crops: [...state.crops, crop] })),
}));

export default useDiaryStore;
