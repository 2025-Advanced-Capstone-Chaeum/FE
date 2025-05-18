"use client";

import BackButton from "@/components/BackButton";
import PointContainer from "@/components/payment/PointContainer";
import SelectAmount from "@/components/payment/SelectAmount";
import SelectPayMethod from "@/components/payment/SelectPayMethod";
import { Button } from "@/components/ui/button";
import { useDonation } from "@/hooks/useDonation";
import { usePaymentStore } from "@/store/paymentStore";
import React from "react";
import { usePayment } from "@/hooks/usePayment";
import { useRouter } from "next/navigation";

const PaymentPage = () => {
  const selectedAmount = usePaymentStore((state) => state.selectedAmount);
  const selectedFundingId = usePaymentStore((state) => state.selectedFundingId);
  const selectedPaymentMethod = usePaymentStore(
    (state) => state.selectedPaymentMethod
  );
  const { createDonationMutation } = useDonation();
  const { createPaymentMutation } = usePayment();
  const router = useRouter();

  console.log("선택된 펀딩 ID:", selectedFundingId);
  console.log("선택된 기부 금액:", selectedAmount);
  console.log("선택된 결제 수단:", selectedPaymentMethod);

  const handleDonateClick = async () => {
    if (
      !selectedFundingId ||
      selectedAmount === null ||
      !selectedPaymentMethod
    ) {
      alert("결제 정보를 먼저 선택해주세요.");
      return;
    }

    const donationData = {
      fundingId: selectedFundingId,
      amount: selectedAmount,
      point: 0, // 포인트 사용 로직이 있다면 해당 값으로 변경
    };

    await createDonationMutation.mutateAsync(donationData);

    if (
      createDonationMutation.isSuccess &&
      createDonationMutation.data?.data?.id
    ) {
      const generatedDonationId = createDonationMutation.data.data.id;

      const initialMerchantUid = `donation_${new Date().getTime()}_${selectedFundingId}`;
      const initialImportUid = "TEMP_" + new Date().getTime();

      const paymentCreateData = {
        donationId: generatedDonationId,
        amount: selectedAmount as number,
        transactionId: initialImportUid, // 초기 transactionId를 importUid와 동일하게 설정
        paymentMethod: selectedPaymentMethod,
        status: "PENDING",
        merchantUid: initialMerchantUid,
        gatewayProvider:
          selectedPaymentMethod === "KAKAO_PAY" ? "kakaopay" : "tosspay",
        failReason: "",
        impUid: initialImportUid, // 초기 importUid 설정
      };

      await createPaymentMutation.mutateAsync(paymentCreateData);

      if (createPaymentMutation.isSuccess) {
        alert("기부 내역이 생성되었고 결제 준비 중입니다.");
        // 결제 진행 (아임포트)
        if (window.IMP) {
          const { IMP } = window as any;
          const portoneCode = process.env.NEXT_PUBLIC_PORTONE_CODE;
          if (portoneCode) {
            IMP.init(portoneCode);
            IMP.request_pay(
              {
                pg:
                  selectedPaymentMethod === "KAKAO_PAY"
                    ? "kakaopay"
                    : "tosspay",
                pay_method: "card",
                merchant_uid: initialMerchantUid,
                amount: selectedAmount,
                name: "마음 나누기",
                buyer_name: "후원자",
                m_redirect_url: `${window.location.origin}/payment/result`,
              },
              async (response) => {
                if (response.success) {
                  console.log("결제 성공:", response);
                  const updatedPaymentCreateData = {
                    ...paymentCreateData,
                    transactionId: response.imp_uid,
                    impUid: response.imp_uid,
                    status: "PENDING",
                  };
                  await createPaymentMutation.mutateAsync(
                    updatedPaymentCreateData
                  );
                  if (createPaymentMutation.isSuccess) {
                    alert("마음 나누기가 완료되었습니다. 감사합니다!");
                    router.push("/donation/loading");
                  } else {
                    console.error(
                      "결제 완료 보고 실패:",
                      createPaymentMutation.error
                    );
                    alert("결제 처리 중 오류가 발생했습니다.");
                  }
                } else {
                  console.error("결제 실패:", response);
                  alert(`결제 실패: ${response.error_msg}`);
                }
              }
            );
          } else {
            console.error("아임포트 가맹점 코드를 찾을 수 없습니다.");
            alert("결제 처리 중 오류가 발생했습니다.");
          }
        } else {
          console.error("아임포트 SDK 로드 실패");
          alert("결제 처리 중 오류가 발생했습니다.");
        }
      } else if (createDonationMutation.isError) {
        console.error("기부 내역 생성 실패:", createDonationMutation.error);
        alert("기부 처리 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <>
      <BackButton />
      <div className="flex flex-col">
        <div className="flex flex-col gap-9">
          <span className="flex justify-center items-center text-2xl font-semibold">
            마음 나누기
          </span>
          <SelectAmount />
          <PointContainer />
          <SelectPayMethod />
        </div>
        <div className="flex justify-center items-center py-5">
          <Button
            size="xl"
            className="text-secondary text-lg text-white font-semibold"
            onClick={handleDonateClick}
            disabled={
              createDonationMutation.isPending ||
              createPaymentMutation.isPending
            }
          >
            {createDonationMutation.isPending || createPaymentMutation.isPending
              ? "처리 중..."
              : "마음 나누기"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
