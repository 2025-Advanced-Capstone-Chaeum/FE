"use client";

import BottomMenu from "@/components/main/BottomMenu";
import ProgressBar from "@/components/main/ProgressBar";
import TopMenu from "@/components/main/TopMenu";
import NavigationBar from "@/components/ui/NavigationBar";
import axiosInstance from "@/lib/api/axios";
import Image from "next/image";

export default function Home() {
  const fetchCatInfo = async () => {
    const res = await axiosInstance.get("/api/v1/cat", {
      withCredentials: true, // HttpOnly 쿠키를 전송하려면 필수
    });
  };

  return (
    <div className="flex flex-col h-screen">
      <TopMenu />
      <div className="flex flex-col justify-between flex-grow pb-[8rem]">
        <div className="flex flex-col py-5">
          <ProgressBar now={35} />
        </div>
        <div className="flex justify-center">
          <Image
            src={"/assets/images/cat.svg"}
            alt="Cat"
            width={180}
            height={180}
          />
        </div>
        <BottomMenu />
      </div>
      <NavigationBar />
    </div>
  );
}
