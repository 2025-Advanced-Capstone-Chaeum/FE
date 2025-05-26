"use client";

import { decorationItems, interiorItems } from "@/lib/inventoryItems";
import ItemBoxButton from "./ItemBoxButton";
import Image from "next/image";
import {
  useDecorationSearch,
  useInteriorSearch,
  useToggleInventory,
} from "@/hooks/useInventory";
import { catStore } from "@/store/catStore";

const SkeletonBox = () => (
  <div className="bg-gray-200 shadow-xs flex justify-center w-25 h-25 rounded-2xl" />
);

const ItemContainer = () => {
  const setToggleInventory = catStore((state) => state.setToggleInventory); // 인벤토리 토글 상태 설정
  const tempInventory = catStore((state) => state.toggleInventory); // 인벤토리 토글 상태
  const allInventoryItems = [...decorationItems, ...interiorItems];

  const {
    data: decorationId,
    isPending: isDecorationPending,
    isError: isDecorationError,
  } = useDecorationSearch(); // 장식 아이템 조회

  const {
    data: interiorId,
    isPending: isInteriorPending,
    isError: isInteriorError,
  } = useInteriorSearch(); // 인테리어 아이템 조회

  const { mutate: toggleInventoryMutate } = useToggleInventory(); // 인벤토리 아이템 토글

  const handleToggleInventory = (uiId: number) => {
    // 매개변수 이름을 uiId로 변경
    // 백엔드 요청은 UI ID (id)로 보냅니다.
    toggleInventoryMutate(uiId);

    // 스토어 업데이트를 위한 itemId 찾기
    const itemToToggle = allInventoryItems.find((item) => item.id === uiId);

    if (!itemToToggle || itemToToggle.itemId === undefined) {
      console.warn("Could not find item or itemId for UI ID:", uiId);
      return; // itemId가 없으면 처리하지 않음
    }

    const actualItemId = itemToToggle.itemId; // 찾은 itemId

    let newTempInventory;
    // 스토어의 toggleInventory는 itemId로 관리합니다.
    if (tempInventory.includes(actualItemId)) {
      // 아이템이 이미 인벤토리에 있다면 제거 (itemId 기준)
      // filter를 사용하여 새 배열을 생성합니다. (불변성 유지)
      newTempInventory = tempInventory.filter((id) => id !== actualItemId);
    } else {
      // 아이템이 인벤토리에 없다면 추가 (itemId 기준)
      // 스프레드 연산자를 사용하여 새 배열을 생성합니다. (불변성 유지)
      newTempInventory = [...tempInventory, actualItemId];
    }

    // 항상 setToggleInventory를 호출하여 상태를 업데이트합니다.
    setToggleInventory(newTempInventory);
    console.log("Updated toggleInventory in store:", newTempInventory); // 디버깅 로그
  };

  if (isDecorationPending || isInteriorPending) {
    // 로딩 처리
    return (
      <div className="flex flex-col fixed bottom-[3rem] w-full h-110 p-8 bg-white rounded-2xl gap-4">
        {["장식", "인테리어"].map((label) => (
          <div key={label} className="flex flex-col">
            <span className="text-secondary font-semibold text-lg">
              {label}
            </span>
            <div className="flex py-3 gap-4">
              <SkeletonBox />
              <SkeletonBox />
              <SkeletonBox />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (isDecorationError || isInteriorError) {
    // 에러 처리
    return (
      <div className="p-8 text-center text-red-500">
        아이템을 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
      </div>
    );
  }

  const isItemInList = (uiId: number, list: { id: number }[] = []) =>
    list.some((i) => i.id === uiId); // 이 부분은 UI ID로 리스트에 있는지 확인하므로 그대로 유지

  return (
    <div className="flex flex-col fixed bottom-[3rem] w-full h-110 p-8 bg-white rounded-2xl gap-4">
      <div className="flex flex-col">
        <span className="text-secondary font-semibold text-lg">장식</span>
        <div className="flex py-3 gap-4 overflow-x-auto touch-manipulation">
          {decorationItems.map((item) =>
            // decorationId는 백엔드에서 받은 UI ID 리스트이므로 item.id와 비교
            isItemInList(item.id, decorationId) ? (
              <div
                key={item.id}
                onClick={() => handleToggleInventory(item.id)} // UI ID (item.id) 전달
                className="cursor-pointer">
                <ItemBoxButton>
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={55}
                    height={55}
                    // item.className 추가
                  />
                </ItemBoxButton>
              </div>
            ) : (
              <SkeletonBox key={item.id} />
            )
          )}
        </div>
      </div>

      <div className="flex flex-col">
        <span className="text-secondary font-semibold text-lg">인테리어</span>
        <div className="flex py-3 gap-4 overflow-x-auto touch-manipulation">
          {interiorItems.map((item) =>
            // interiorId도 백엔드에서 받은 UI ID 리스트이므로 item.id와 비교
            isItemInList(item.id, interiorId) ? (
              <div
                key={item.id}
                onClick={() => handleToggleInventory(item.id)} // UI ID (item.id) 전달
                className="cursor-pointer">
                <ItemBoxButton>
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={55}
                    height={55}
                    // item.className 추가
                  />
                </ItemBoxButton>
              </div>
            ) : (
              <SkeletonBox key={item.id} />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemContainer;
