import { decorationItems, interiorItems } from "@/lib/inventoryItems";
import { create } from "zustand";

type ItemType = {
  id: number;
  itemId?: number;
  src: string;
  alt: string;
  width: number;
  height: number;
  className: string;
};

type CatDataProps = {
  id: number;
  level: number;
  experiencePoint: number;
  levelUpPercentage: number;
};

type CatStore = {
  catData: CatDataProps;
  setCatData: (catData: CatDataProps) => void;

  inventory: number[]; // 아이템 ID 배열
  setInventory: (inventory: number[]) => void;

  toggleInventory: number[];
  setToggleInventory: (toggle: number[]) => void;
  clearToggleInventory: () => void;

  combinedInventoryList: ItemType[];
  _updateCombinedInventoryList: () => void;
};

export const catStore = create<CatStore>()((set, get) => ({
  catData: {
    id: 0,
    level: 0,
    experiencePoint: 0,
    levelUpPercentage: 0,
  },
  inventory: [],
  toggleInventory: [],
  combinedInventoryList: [],

  setCatData: (newCatData) => {
    set({ catData: newCatData });
  },

  setInventory: (newInventory: number[]) => {
    set({ inventory: newInventory });
    get()._updateCombinedInventoryList(); // toggleInventory도 변경되었으니 무효화
  },

  setToggleInventory: (newToggleInventory) => {
    set({ toggleInventory: newToggleInventory });
    get()._updateCombinedInventoryList(); // toggleInventory도 변경되었으니 무효화
  },
  clearToggleInventory: () => {
    set({ toggleInventory: [] });
    get()._updateCombinedInventoryList();
  },

  _updateCombinedInventoryList: () => {
    const { inventory } = get(); // itemId 배열
    const { toggleInventory } = get(); // itemId 배열

    const newCombinedList = [...decorationItems, ...interiorItems].filter(
      (item) =>
        inventory.includes(item.itemId!) ||
        toggleInventory.includes(item.itemId!)
    );
    // 상태를 직접 업데이트하여 구독하는 컴포넌트를를 리렌더링
    set({ combinedInventoryList: newCombinedList });
    get().toggleInventory;
  },
}));
