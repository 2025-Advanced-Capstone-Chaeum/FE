"use client";

import { usePaymentStore } from "@/store/paymentStore";
import Image from "next/image";

const SelectPayMethod = () => {
  const setSelectedPaymentMethod = usePaymentStore(
    (state) => state.setSelectedPaymentMethod
  );

  const handlePayMethodClick = (id: number, method: string) => {
    setSelectedPaymentMethod(method);
  };

  return (
    <div className="flex flex-col px-10 gap-5">
      <span className="flex text-sm">충전 수단 선택</span>
      <div className="flex flex-col w-full justify-between px-3 sm:px-13 md:px-30">
        <div className="flex px-3 gap-3">
          <div
            className={`flex justify-center items-center w-33 h-11 px-3 gap-0.5 bg-[#FEE500] rounded-3xl cursor-pointer`}
            onClick={() => handlePayMethodClick(1, "KAKAO_PAY")}
          >
            <Image
              src={"/assets/images/kakao-logo.png"}
              alt="KakaoPay"
              className="h-6"
              width={24}
              height={24}
            />
            <Image
              src={"/assets/images/kakao-pay-logo.png"}
              alt="KakaoPay"
              className="h-5.5"
              width={105}
              height={20}
            />
          </div>
          <div
            className={`flex justify-center items-center w-33 h-11 bg-white rounded-3xl cursor-pointer`}
            onClick={() => handlePayMethodClick(2, "TOSS_PAY")}
          >
            <Image
              src={"/assets/images/toss-pay.png"}
              alt="TossPay"
              width={115}
              height={40}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectPayMethod;
