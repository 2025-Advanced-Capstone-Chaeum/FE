"use client";

import BackButton from "@/components/BackButton";
import PointContainer from "@/components/payment/PointContainer";
import SelectAmount from "@/components/payment/SelectAmount";
import SelectPayMethod from "@/components/payment/SelectPayMethod";
import { Button } from "@/components/ui/button";
import { usePaymentStore } from "@/store/paymentStore";
import React from "react";

const PaymentPage = () => {
  const selectedAmount = usePaymentStore((state) => state.selectedAmount);
  const selectedFundingId = usePaymentStore((state) => state.selectedFundingId);
  const selectedPaymentMethod = usePaymentStore(
    (state) => state.selectedPaymentMethod
  );

  console.log("선택된 펀딩 ID:", selectedFundingId);
  console.log("선택된 기부 금액:", selectedAmount);
  console.log("선택된 결제 수단:", selectedPaymentMethod);

  const handlePaymentSubmit = () => {
    if (selectedFundingId && selectedAmount && selectedPaymentMethod) {
      const paymentData = {
        donationId: selectedFundingId,
        amount: selectedAmount,
        transactionId: "",
        paymentMethod: selectedPaymentMethod,
        status: "PENDING",
      };
      console.log("결제 요청 데이터:", paymentData);
    } else {
      console.warn("필수 결제 정보가 부족합니다.");
    }
  };

  return (
    <>
      <BackButton />
      <div className="flex flex-col gap-11">
        <span className="flex justify-center items-center text-2xl font-semibold">
          마음 나누기
        </span>
        <SelectAmount />
        <PointContainer />
        <SelectPayMethod />
        <div className="flex justify-center items-center">
          <Button
            size="xl"
            className="text-secondary text-lg text-white font-semibold"
            onClick={handlePaymentSubmit}
          >
            마음 나누기
          </Button>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
