import { create } from 'zustand';

interface DiaryStore {
  activeComponent: string;
  setActiveComponent: (component: string) => void;
}

const useDiaryStore = create<DiaryStore>((set) => ({
  activeComponent: '달력',
  setActiveComponent: (component) => set({ activeComponent: component }),
}));

export default useDiaryStore;
