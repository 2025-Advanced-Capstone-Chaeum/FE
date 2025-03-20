"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { SiNaver } from "react-icons/si";
import kakaoLogo from "../../public/assets/image/kakaoLogo.png";
import { useEffect, useState } from "react";

export default function LoginButtons() {
  const [showButtons, setShowButtons] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // 4초 후 로그인인 버튼 표시
    const buttonTimer = setTimeout(() => {
      setShowButtons(true);
    }, 4000);

    // JWT 체크 (기존 로그인 여부)
    const token = localStorage.getItem("jwt");
    if (token) {
      setIsAuthenticated(true);
      return;
    }

    return () => clearTimeout(buttonTimer);
  }, []);

  if (!showButtons) {
    return null;
  }
  if (!showButtons && isAuthenticated) {
    return (
      <div>
        <div>웰컴페이지</div>
        <div>메인페이지</div>
      </div>
    );
  }

  return (
    <div className="absolute bottom-24 flex flex-col space-y-4 transition-opacity duration-1000 opacity-100">
      <Button className="w-80 h-16 bg-yellow-300 hover:bg-yellow-600 text-black relative rounded-lg shadow-md">
        <Image
          src={kakaoLogo}
          width={35}
          height={30}
          alt="카카오"
          className="absolute left-4"
        />
        <span className="text-lg font-medium">카카오 로그인</span>
      </Button>

      <Button className="w-80 h-16 bg-green-500 hover:bg-green-600 text-white relative rounded-lg shadow-md">
        <SiNaver size={30} className="absolute left-4" />
        <span className="text-lg font-medium">네이버 로그인</span>
      </Button>
    </div>
  );
}
