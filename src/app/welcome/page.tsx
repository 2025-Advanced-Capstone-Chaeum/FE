// WelcomePage.tsx (수정)

"use client";

import ClientWelcome from "@/components/welcome/ClientWelcome";
import { useCat } from "@/hooks/useCat";
import { useWearingInventory } from "@/hooks/useInventory";
import axiosInstance from "@/lib/api/axios";
// decorationItems, interiorItems는 이제 이 파일에서 직접 변환에 사용되지 않으므로 제거해도 됩니다.
// import { decorationItems, interiorItems } from "@/lib/inventoryItems"; // 이 라인 제거 가능
import { catStore } from "@/store/catStore";
import { userStore } from "@/store/userStore";
import { useEffect } from "react";

export default function WelcomePage() {
  const setUserData = userStore((state) => state.setUserData);
  const setCatData = catStore((state) => state.setCatData);
  const setInventory = catStore((state) => state.setInventory);
  // const allInventoryItems = [...decorationItems, ...interiorItems]; // 이 라인 제거 가능

  const {
    data: catInfo,
    isPending: isCatPending,
    isError: catError,
  } = useCat();

  const {
    data: InventoryData, // 이 InventoryData는 이제 직접 itemId 배열입니다. (예: [9])
    isPending: isInventoryPending,
    isError: inventoryError,
  } = useWearingInventory();

  const fetchMemberInfo = async () => {
    const response = await axiosInstance.get("/api/v1/member");
    return response.data;
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: userData } = await fetchMemberInfo();
        setUserData(userData);

        // catInfo와 InventoryData가 모두 로드되었고 에러가 없을 때만 스토어 업데이트
        if (
          !isCatPending && catInfo && !catError &&
          !isInventoryPending && InventoryData && !inventoryError
        ) {
          setCatData({
            ...catInfo,
          });

          // ******************************************************************
          // InventoryData가 이미 itemId 배열이므로, 그대로 setInventory에 전달합니다.
          setInventory(InventoryData);
          console.log("WelcomePage - Initial Inventory (already itemId):", InventoryData);
          console.log("WelcomePage - Cat data updated with catInfo:", catInfo);
          // ******************************************************************
        } else {
            console.log("WelcomePage - Conditions not met for data initialization. Skipping update.");
        }
      } catch (err) {
        console.error("회원 정보 요청 실패:", err);
      }
    };

    getUser();
  }, [
    setUserData,
    setCatData,
    setInventory,
    catInfo,
    InventoryData, // InventoryData 변경 시 useEffect 재실행
    isCatPending,
    isInventoryPending,
    catError,
    inventoryError,
  ]);

  return <ClientWelcome />;
}