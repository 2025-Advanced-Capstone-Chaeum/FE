"use client";

import BottomMenu from "@/components/main/BottomMenu";
import ProgressBar from "@/components/main/ProgressBar";
import TopMenu from "@/components/main/TopMenu";
import NavigationBar from "@/components/ui/NavigationBar";
import axiosInstance from "@/lib/api/axios";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [isLevelUp, setIsLevelUp] = useState(false);

  const fetchCatInfo = async () => {
    const { data } = await axiosInstance.get("/api/v1/cat");
    return data.data;
  };

  const { data: catInfo } = useQuery({
    queryKey: ["cat"],
    queryFn: fetchCatInfo,
  });

  // 페이지 진입 시 애니메이션 실행
  useEffect(() => {
    if (catInfo) {
      setIsLevelUp(true);
      const timeout = setTimeout(() => setIsLevelUp(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [catInfo]);

  return (
    <div className="flex flex-col h-screen">
      <TopMenu />
      <div className="flex flex-col justify-between flex-grow pb-[8rem]">
        <div className="flex flex-col py-5">
          {catInfo && <ProgressBar catData={catInfo} />}
        </div>

        <div className="relative flex justify-center items-center">
          <div className="relative flex justify-center items-center w-[220px] h-[220px]">
            {isLevelUp && (
              <div className="absolute w-full h-full rounded-full bg-white-50 opacity-50 animate-levelUpGlow z-0" />
            )}
            <Image
              src="/assets/images/cat.svg"
              alt="Cat"
              width={180}
              height={180}
              className="relative z-10"
            />

            {isLevelUp && (
              <div className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2 text-yellow-400 font-bold text-xl animate-levelText animate-bounce">
                LEVEL UP!
              </div>
            )}
          </div>
        </div>

        <BottomMenu />
      </div>
      <NavigationBar />
    </div>
  );
}
