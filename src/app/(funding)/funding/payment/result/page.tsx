// 예시: /app/payment/result/page.tsx

"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDonation } from "@/hooks/useDonation";
import { usePayment } from "@/hooks/usePayment";

const PaymentResultPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const impUid = searchParams.get("imp_uid");
  const merchantUid = searchParams.get("merchant_uid");

  const { createDonationMutation } = useDonation();
  const { createPaymentMutation } = usePayment();

  useEffect(() => {
    const handleAfterRedirect = async () => {
      if (!impUid || !merchantUid) {
        router.push("/funding");
        return;
      }

      try {
        // 1. 아임포트에서 결제 결과 조회 (여기선 백엔드에서 imp_uid로 조회하는 게 좋음)
        const res = await fetch(`/api/portone/verify?imp_uid=${impUid}`);
        const paymentResult = await res.json();

        if (!paymentResult || !paymentResult.paid_amount) {
          throw new Error("결제 결과 조회 실패");
        }

        const donationData = {
          fundingId: paymentResult.custom_data.fundingId,
          amount: paymentResult.paid_amount,
          point: 0,
        };

        const donationRes = await createDonationMutation.mutateAsync(donationData);
        const donationId = donationRes?.data?.id;

        if (!donationId) {
          throw new Error("기부 내역 생성 실패");
        }

        const paymentData = {
          donationId,
          amount: paymentResult.paid_amount,
          points: 0,
          transactionId: impUid,
          paymentMethod: paymentResult.pay_method, // "card" 등
          status: "COMPLETED",
          merchantUid,
          gatewayProvider: paymentResult.pg_provider,
          impUid,
        };

        await createPaymentMutation.mutateAsync(paymentData);

        router.push("/donation/loading");
      } catch (error) {
        console.error(error);
        router.push("/funding");
      }
    };

    handleAfterRedirect();
  }, [impUid, merchantUid]);

  return <div>결제 처리 중입니다...</div>;
};

export default PaymentResultPage;
