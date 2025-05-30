import { DonatorProps, RecipientProps } from "@/types/userTypes";
import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

type UserStore = {
  userData: DonatorProps | null;
  setUserData: (data: DonatorProps) => void;
  clearUserData: () => void;
  recipientData: RecipientProps | null;
  setRecipientData: (data: RecipientProps) => void;
  waiting: boolean | null;
  setWaiting: (condition: boolean) => void;
};

type UserStorePersist = PersistOptions<UserStore>;

export const userStore = create<UserStore>()(
  persist<UserStore, [], [], UserStorePersist>(
    (set) => ({
      userData: null,
      setUserData: (data) => set({ userData: data }),
      clearUserData: () => set({ userData: null }),
      recipientData: null,
      setRecipientData: (data) => set({ recipientData: data }),
      waiting: null,
      setWaiting: (condition) => set({ waiting: condition }),
    }),
    {
      name: "chaeum-user-storage",
    }
  )
);
