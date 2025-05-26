import { decorationItems, interiorItems } from "@/lib/inventoryItems";
import { create } from "zustand";

// ItemType 정의 (Cat.tsx와 동일하게 유지)
type ItemType = {
  id: number; // 고유 식별자
  itemId?: number; // 선택적 속성
  src: string; // 이미지 소스 경로
  alt: string; // 이미지 대체 텍스트
  width: number; // 이미지 너비
  height: number; // 이미지 높이
  className: string; // CSS 클래스 이름
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
  combinedInventoryList: ItemType[];
  setToggleInventory: (toggle: number[]) => void;
  clearToggleInventory: () => void;
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
    // catData가 업데이트되면 무조건 메모이제이션된 목록을 무효화합니다.
    // 이것이 가장 안전한 방법입니다.
    get()._updateCombinedInventoryList();
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
    // 상태를 직접 업데이트하여 구독하는 컴포넌트가 리렌더링되도록 합니다.
    set({ combinedInventoryList: newCombinedList });
  },
}));
