"use client";

import { decorationItems, interiorItems } from "@/lib/inventoryItems";
import { catStore } from "@/store/catStore";
import Image from "next/image";
import React from "react";

const Cat = () => {
  const inventory = catStore((state) => state.catData.inventory);
  const inventoryList = [...decorationItems, ...interiorItems].filter((item) =>
    inventory.includes(item.id)
  );
  return (
    <div className="relative w-[180px] h-[180px]">
      <Image
        src="/assets/images/cat.svg"
        alt="Cat"
        width={180}
        height={180}
        className="relative z-10"
      />

      {inventoryList.map((item) => (
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
