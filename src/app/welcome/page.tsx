"use client";

import ClientWelcome from "@/components/welcome/ClientWelcome";
import { useCat } from "@/hooks/useCat";
import { useWearingInventory } from "@/hooks/useInventory";
import { userData } from "@/lib/userData";
import { catStore } from "@/store/catStore";
import { userStore } from "@/store/userStore";
import { useEffect } from "react";

export default function WelcomePage() {
  const setUserData = userStore((state) => state.setUserData);
  const setCatData = catStore((state) => state.setCatData);
  const setInventory = catStore((state) => state.setInventory);

  const {
    data: catInfo,
    isPending: isCatPending,
    isError: isCatError,
  } = useCat();

  const {
    data: InventoryData, // itemId 배열 (예: [9])
    isPending: isInventoryPending,
    isError: inventoryError,
  } = useWearingInventory();

  const {
    data: userInfo,
    isPending: isUserDataPending,
    isError: isUserDataError,
  } = userData();
  useEffect(() => {
    if (!isUserDataPending && userInfo && !isUserDataError) {
      setUserData(userInfo);
    } else if (isUserDataError) {
      console.error("WelcomePage: Failed to load userInfo", isUserDataError);
    }

    if (
      !isUserDataPending &&
      !isCatPending &&
      catInfo &&
      !isCatError &&
      !isInventoryPending &&
      InventoryData &&
      !isUserDataError &&
      !inventoryError
    ) {
      setCatData({
        ...catInfo,
      });
      if (Array.isArray(InventoryData)) {
        setInventory(InventoryData);
      } else {
        console.warn(
          "WelcomePage: InventoryData is not an array or is null/undefined.",
          InventoryData
        );
        setInventory([]); // 기본값 또는 빈 배열로 설정
      }
      console.log("WelcomePage: All data initialized in store.");
    } else {
      if (isUserDataPending || isCatPending || isInventoryPending) {
        console.log("WelcomePage: Data is still loading...");
      } else {
        console.log(
          "WelcomePage - Conditions not met for full data initialization. Skipping or partial update."
        );
      }
    }
  }, [
    setUserData,
    setCatData,
    setInventory,
    userInfo,
    catInfo,
    InventoryData, // InventoryData 변경 시 useEffect 재실행
    isUserDataPending,
    isCatPending,
    isInventoryPending,
    isUserDataError,
    isCatError,
    inventoryError,
  ]);

  return <ClientWelcome />;
}
