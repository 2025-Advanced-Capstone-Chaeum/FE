import { create } from "zustand";

type CatDataProps = {
  id: number;
  level: number;
  experiencePoint: number;
  levelUpPercentage: number;
};

type CatStore = {
  catData: CatDataProps | null;
  setCatData: (catData: CatDataProps) => void;
};

export const userStore = create<CatStore>()((set) => ({
  catData: {
    id: 0,
    level: 0,
    experiencePoint: 0,
    levelUpPercentage: 0,
  },
  setCatData: (catData) => set({ catData }),
}));
