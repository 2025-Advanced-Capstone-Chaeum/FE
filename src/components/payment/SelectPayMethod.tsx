"use client";

import { usePaymentStore } from "@/store/paymentStore";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { usePayment } from "@/hooks/usePayment";
import { useDonation } from "@/hooks/useDonation";

const SelectPayMethod = () => {
  const [activePayMethod, setActivePayMethod] = useState<number>(0);
  const selectedAmount = usePaymentStore((state) => state.selectedAmount);
  const selectedFundingId = usePaymentStore((state) => state.selectedFundingId);
  const selectedPaymentMethod = usePaymentStore(
    (state) => state.selectedPaymentMethod
  );
  const { createPaymentMutation } = usePayment();
  const { createDonationMutation } = useDonation();

  const setSelectedPaymentMethod = usePaymentStore(
    (state) => state.setSelectedPaymentMethod
  );

  const handlePayMethodClick = (id: number, method: string) => {
    setActivePayMethod(id);
    setSelectedPaymentMethod(method);
  };

  const handlePaymentButtonClick = async () => {
    if (!selectedFundingId || selectedAmount === null) {
      alert("기부 금액을 먼저 선택해주세요.");
      return;
    }

    if (!window.IMP) {
      console.error("아임포트 SDK 로드 실패");
      return;
    }

    if (!selectedPaymentMethod) {
      alert("결제 수단을 먼저 선택해주세요.");
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

          const donationData = {
            fundingId: selectedFundingId,
            amount: selectedAmount,
            point: 0, // 포인트 사용 로직이 있다면 해당 값으로 변경
          };

          await createDonationMutation.mutateAsync(donationData); // 결제 성공 후 기부 내역 생성

          if (createDonationMutation.isSuccess && createDonationMutation.data?.data?.id) {
            const generatedDonationId = createDonationMutation.data.data.id;

            const paymentCreateData = {
              donationId: generatedDonationId,
              amount: selectedAmount as number,
              transactionId: response.imp_uid, // 아임포트 결제 고유 ID
              paymentMethod: selectedPaymentMethod,
              status: "PAID", // 결제 완료 상태로 변경
              paymentGatewayInfoRequest: {
                importUid: response.imp_uid,
                merchantUid: response.merchant_uid,
                gatewayProvider: response.pg_provider, // PG사 정보
                // failReason: "잔액 부족",
              },
            };

            console.log("서버에 보낼 결제 데이터:", paymentCreateData);

            createPaymentMutation.mutate(paymentCreateData); // 결제 완료 정보 서버에 저장

            if (createPaymentMutation.isSuccess) {
              alert("마음 나누기가 완료되었습니다. 감사합니다!");
              // 성공 후 페이지 이동 등 추가적인 액션
            } else if (createPaymentMutation.isError) {
              console.error(
                "결제 완료 데이터 전송 실패:",
                createPaymentMutation.error
              );
              alert("결제 처리 중 오류가 발생했습니다.");
            }
          } else if (createDonationMutation.isError) {
            console.error("기부 내역 생성 실패:", createDonationMutation.error);
            alert("기부 처리 중 오류가 발생했습니다.");
          }
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
      <div className="flex w-full justify-between px-3 sm:px-13 md:px-30">
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
        <Button onClick={handlePaymentButtonClick} disabled={createDonationMutation.isPending || createPaymentMutation.isPending}>
          {createDonationMutation.isPending || createPaymentMutation.isPending ? "처리 중..." : "결제하기"}
        </Button>
      </div>
    </div>
  );
};

export default SelectPayMethod;