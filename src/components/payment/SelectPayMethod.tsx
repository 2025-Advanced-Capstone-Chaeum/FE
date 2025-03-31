import Image from "next/image";
import React from "react";

const SelectPayMethod = () => {
  return (
    <div className="flex flex-col px-10 gap-5">
      <span className="flex text-sm">충전 수단 선택</span>
      <div className="flex w-full justify-between px-5 sm:px-15 md:px-35">
        <Image
          src={"/assets/images/kakao-pay.png"}
          alt="KakaoPay"
          className="cursor-pointer"
          width={120}
          height={40}
        />
        <div className="flex justify-center items-center w-33 h-13 bg-white rounded-3xl">
          <Image
            src={"/assets/images/toss-pay.png"}
            alt="TossPay"
            className="cursor-pointer"
            width={115}
            height={40}
          />
        </div>
      </div>
    </div>
  );
};

export default SelectPayMethod;
