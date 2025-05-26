// components/Cat.tsx
"use client";

import { catStore } from "@/store/catStore";
import Image from "next/image";
import React, { useEffect } from "react";
type ItemType = {
  id: number;
  itemId?: number;
  src: string;
  alt: string;
  width: number;
  height: number;
  className: string;
};

const Cat = () => {
  // getCombinedInventoryList 함수를 호출하여 결과를 가져옵니다.
  // 스토어 내부의 메모이제이션 로직에 의존합니다.
  const inventoryList = catStore((state) => state.combinedInventoryList);

  useEffect(() => {
    // 이 로그는 이제 리렌더링될 때마다 올바른 inventoryList를 보여줄 것입니다.
    console.log("Combined Inventory List (from direct state):", inventoryList);
  }, [inventoryList]);
  return (
    <div className="relative w-[180px] h-[180px]">
      <Image
        src="/assets/images/cat.svg"
        alt="고양이"
        width={180}
        height={180}
        className="relative z-10"
      />

      {/* inventoryList는 이제 ItemType 배열이므로 map을 사용할 수 있습니다. */}
      {inventoryList.map((item: ItemType) => (
        <Image
          key={item.id}
          src={item.src}
          alt={item.alt}
          width={item.width}
          height={item.height}
          className={item.className}
        />
      ))}
    </div>
  );
};

export default Cat;
