import BackButton from "@/components/BackButton";
import ItemContainer from "@/components/inventory/ItemContainer";
import Image from "next/image";
import React from "react";

const InventoryPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <BackButton>인벤토리</BackButton>
      <div className="flex h-[calc(100vh-550px)] justify-center items-center ">
        <div className="relative w-[180px] h-[180px]">
          {/* 고양이 */}
          <Image
            src="/assets/images/cat.svg"
            alt="Cat"
            width={180}
            height={180}
            className="relative z-10"
          />

          {/* 나무 (고양이 기준 상대 위치) */}
          <Image
            src="/assets/inventory/tree.svg"
            alt="Tree"
            width={200}
            height={50}
            className="absolute z-0 left-0 top-0 -translate-x-1/4 -translate-y-1/10"
          />
        </div>
      </div>
      <ItemContainer />
    </div>
  );
};

export default InventoryPage;
