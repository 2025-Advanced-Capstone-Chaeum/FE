'use client'

import Image from "next/image";
import React, { useState } from "react";

const SelectPayMethod = () => {
  const [activePayMethod, setActivePayMethod] = useState<number>(0);

  const handlePayMethodClick = (id: number) => {
    setActivePayMethod(id);
  };

  return (
    <div className="flex flex-col px-10 gap-5">
      <span className="flex text-sm">충전 수단 선택</span>
      <div className="flex w-full justify-between px-5 sm:px-15 md:px-35">
        <Image
          src={"/assets/images/kakao-pay.png"}
          alt="KakaoPay"
          className={`cursor-pointer ${activePayMethod === 1 ? 'opacity-50' : 'opacity-100'}`}
          width={120}
          height={40}
          onClick={() => handlePayMethodClick(1)}
        />
        <div className="flex justify-center items-center w-33 h-13 bg-white rounded-3xl">
          <Image
            src={"/assets/images/toss-pay.png"}
            alt="TossPay"
            className={`cursor-pointer ${activePayMethod === 2 ? 'opacity-50' : 'opacity-100'}`}
            width={115}
            height={40}
            onClick={() => handlePayMethodClick(2)}
          />
        </div>
      </div>
    </div>
  );
};

export default SelectPayMethod;
