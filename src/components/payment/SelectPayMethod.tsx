"use client";

import { usePaymentStore } from "@/store/paymentStore";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { usePayment } from "@/hooks/usePayment";

const SelectPayMethod = () => {
  const [activePayMethod, setActivePayMethod] = useState<number>(0);
  const selectedAmount = usePaymentStore((state) => state.selectedAmount);
  const selectedFundingId = usePaymentStore((state) => state.selectedFundingId);
  const selectedPaymentMethod = usePaymentStore(
    (state) => state.selectedPaymentMethod
  );

  const setSelectedPaymentMethod = usePaymentStore(
    (state) => state.setSelectedPaymentMethod
  );

  const { createPaymentMutation } = usePayment();

  const handlePayMethodClick = (id: number, method: string) => {
    setActivePayMethod(id);
    setSelectedPaymentMethod(method);
  };

  const handlePaymentButtonClick = async () => {
    if (
      !selectedFundingId ||
      selectedAmount === null ||
      !selectedPaymentMethod
    ) {
      alert("결제 정보를 먼저 선택해주세요.");
      return;
    }

    if (!window.IMP) {
      console.error("아임포트 SDK 로드 실패");
      return;
    }

    const { IMP } = window as any;
    const portoneCode = process.env.NEXT_PUBLIC_PORTONE_CODE;
    if (!portoneCode) {
      console.error("아임포트 가맹점 코드를 찾을 수 없습니다.");
      return;
    }
    IMP.init(portoneCode);

    IMP.request_pay(
      {
        pg: selectedPaymentMethod === "KAKAO_PAY" ? "kakaopay" : "tosspay", // PG사 코드
        pay_method: "card", // 일단 카드 결제만 예시로 둡니다. 필요에 따라 변경하세요.
        merchant_uid: `donation_${new Date().getTime()}_${selectedFundingId}`, // 주문 번호
        amount: selectedAmount,
        name: "마음 나누기", // 상품명
        buyer_name: "후원자", // 구매자 이름 (선택 사항)
        // buyer_tel: "", // 구매자 전화번호 (선택 사항)
        // buyer_email: "", // 구매자 이메일 (선택 사항)
        m_redirect_url: `${window.location.origin}/payment/result`, // 결제 후 리디렉션 URL
      },
      async (response) => {
        if (response.success) {
          console.log("결제 성공:", response);
          // 결제 성공 후 필요한 로직 (예: 상태 업데이트)
        } else {
          console.error("결제 실패:", response);
          alert(`결제 실패: ${response.error_msg}`);
        }
      }
    );
  };

  return (
    <div className="flex flex-col px-10 gap-5">
      <span className="flex text-sm">충전 수단 선택</span>
      <div className="flex flex-col w-full justify-between px-3 sm:px-13 md:px-30">
        <div className="flex px-3 gap-3">
          <div
            className={`flex justify-center items-center w-33 h-11 px-3 gap-0.5 bg-[#FEE500] rounded-3xl cursor-pointer ${
              activePayMethod === 1 ? "opacity-50" : "opacity-100"
            }`}
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
            className={`flex justify-center items-center w-33 h-11 bg-white rounded-3xl cursor-pointer ${
              activePayMethod === 2 ? "opacity-50" : "opacity-100"
            }`}
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
        <div className="flex w-full justify-center align-center py-3">
          <Button
            variant={"soft"}
            onClick={handlePaymentButtonClick}
            disabled={createPaymentMutation.isPending}
          >
            {createPaymentMutation.isPending ? "처리 중..." : "결제하기"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SelectPayMethod;
