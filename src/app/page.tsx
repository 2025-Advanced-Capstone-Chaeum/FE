import Image from "next/image";
import logo from "../../public/assets/image/Chaeum.png"; // 로고 이미지 추가
import Paw from "../components/ui/paw/paw";
import LoginButtons from "@/app/LoginButton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "main - Chaeum",
  description: "채움 앱의 메인페이지입니다. ",
};

export default function Home() {
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-center relative">
      {/* 발자국 이미지 */}
      <div className="absolute top-0 left-[-150] transform -rotate-30">
        <Paw />
      </div>

      {/* Chaeum Logo */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <Image src={logo} alt="Chaeum logo" width={250} height={300} />
      </div>

      {/* Copyright */}
      <div
        style={{ fontWeight: 600 }}
        className="absolute bottom-8 inset-x-0 text-center text-gray-500 text-base">
        © Copyright Chaeum Team
      </div>

      {/* 카카오&네이버 로그인버튼튼 */}
      <LoginButtons />
    </main>
  );
}
