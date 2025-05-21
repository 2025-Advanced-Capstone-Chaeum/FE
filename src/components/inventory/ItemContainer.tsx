"use client";

import React, { useEffect, useState } from "react";
import { decorationItems, interiorItems } from "@/lib/inventoryItems";
import ItemBoxButton from "./ItemBoxButton";
import Image from "next/image";
import { fetchInventoryByCategory } from "@/lib/api/inventory";
import { useQuery } from "@tanstack/react-query";

const ItemContainer = () => {
  const { data: decorationId, isPending: isDecorationPending } = useQuery({
    queryKey: ["decoration"],
    queryFn: () => fetchInventoryByCategory("DECORATION"),
  });

  const { data: interiorId, isPending: isInteriorPending } = useQuery({
    queryKey: ["interior"],
    queryFn: () => fetchInventoryByCategory("INTERIOR"),
  });

  if (isDecorationPending || isInteriorPending) {
    return (
      <div className="flex flex-col fixed bottom-[3rem] w-full h-110 p-8 bg-white rounded-2xl gap-4">
        <div className="flex flex-col">
          <span className="text-secondary font-semibold text-lg">장식</span>
          <div className="flex py-3 gap-4 overflow-hidden overflow-x-auto touch-manipulation">
            {[1, 2, 3].map((item) => {
              return (
                <div key={item}>
                  <ItemBoxButton></ItemBoxButton>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-secondary font-semibold text-lg">인테리어</span>
          <div className="flex py-3 gap-4 overflow-hidden overflow-x-auto touch-manipulation">
            {[1, 2, 3].map((item) => {
              return (
                <div key={item}>
                  <ItemBoxButton></ItemBoxButton>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col fixed bottom-[3rem] w-full h-110 p-8 bg-white rounded-2xl gap-4">
      <div className="flex flex-col">
        <span className="text-secondary font-semibold text-lg">장식</span>
        <div className="flex py-3 gap-4 overflow-hidden overflow-x-auto touch-manipulation">
          {decorationItems.map((item) => {
            if (!decorationId || decorationId.length === 0) {
              return (
                <div key={item.id}>
                  <div className="bg-gray-200 shadow-xs flex justify-center w-25 h-25 rounded-2xl "></div>
                </div>
              );
            } else {
              for (const i of decorationId) {
                if (i.itemId === item.id) {
                  return (
                    <div key={item.id}>
                      <ItemBoxButton>
                        <Image
                          src={item.src}
                          alt={item.alt}
                          width={item.width}
                          height={item.height}
                        />
                      </ItemBoxButton>
                    </div>
                  );
                }
              }
            }
          })}
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-secondary font-semibold text-lg">인테리어</span>
        <div className="flex py-3 gap-4 overflow-hidden overflow-x-auto touch-manipulation">
          {interiorItems.map((item) => {
            if (!interiorId || interiorId.length === 0) {
              return (
                <div key={item.id}>
                  <div className="bg-gray-200 shadow-xs flex justify-center w-25 h-25 rounded-2xl "></div>
                </div>
              );
            } else {
              for (const i of interiorId) {
                if (i.itemId === item.id) {
                  return (
                    <div key={item.id}>
                      <ItemBoxButton>
                        <Image
                          src={item.src}
                          alt={item.alt}
                          width={item.width}
                          height={item.height}
                        />
                      </ItemBoxButton>
                    </div>
                  );
                }
              }
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default ItemContainer;
