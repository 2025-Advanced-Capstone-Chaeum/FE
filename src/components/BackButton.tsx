"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";

interface BackButtonProps {
  children?: ReactNode;
}

const BackButton: React.FC<BackButtonProps> = ({ children }) => {
  const router = useRouter();
  return (
    <div className="pl-6 pt-8 flex items-center space-x-2">
      <button onClick={() => router.back()} className="cursor-pointer">
        <Image
          src={"/assets/icons/back.svg"}
          alt="Back"
          width={30}
          height={30}
        />
      </button>
<<<<<<< HEAD
        <span className="text-secondary font-semibold text-lg opacity-80">{children}</span>
=======
      <span>{children}</span>
>>>>>>> 3ff5ee2 (feat: 뒤로가기 버튼에 children 추가)
    </div>
  );
};

export default BackButton;
