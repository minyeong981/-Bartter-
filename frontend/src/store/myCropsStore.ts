// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';

// interface Crop {
//   id: number;
//   nickname: string;
//   image: string; // 이미지 URL을 저장
//   date: string;
//   description?: string;
// }

// interface MyCropsStore {
//   crops: Crop[];
//   addCrop: (crop: Crop) => void;
// }

// const useMyCropsStore = create<MyCropsStore>()(
//   persist(
//     (set) => ({
//       crops: [],
//       addCrop: (crop) => set((state) => ({ crops: [...state.crops, crop] })),
//     }),
//     {
//       name: 'my-crops',
//       partialize: (state) => ({
//         crops: state.crops.map(({ id, nickname, image, date, description }) => ({
//           id,
//           nickname,
//           image,
//           date,
//           description,
//         })),
//       }),
//     }
//   )
// );

// export default useMyCropsStore;
import localforage from 'localforage';
import { create } from 'zustand';

interface Crop {
  id: number;
  nickname: string;
  image: string; // 이미지 URL을 저장
  date: string;
  description?: string;
}

interface MyCropsStore {
  crops: Crop[];
  addCrop: (crop: Crop) => void;
  loadCrops: () => void;
}

const useMyCropsStore = create<MyCropsStore>((set) => ({
  crops: [],
  addCrop: async (crop) => {
    const updatedCrops = await localforage.getItem<Crop[]>('my-crops') || [];
    updatedCrops.push(crop);
    await localforage.setItem('my-crops', updatedCrops);
    set({ crops: updatedCrops });
  },
  loadCrops: async () => {
    const storedCrops = await localforage.getItem<Crop[]>('my-crops');
    if (storedCrops) {
      set({ crops: storedCrops });
    }
  }
}));

export default useMyCropsStore;
