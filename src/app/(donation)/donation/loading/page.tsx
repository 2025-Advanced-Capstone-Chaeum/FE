"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import BackButton from "@/components/BackButton";
import { useRouter } from "next/navigation";
import { useDonation } from "@/hooks/useDonation";
import { usePayment } from "@/hooks/usePayment";
import { usePaymentStore } from "@/store/paymentStore";

const DonationLoadingPage = () => {
  const router = useRouter();
  const impUid = usePaymentStore((state) => state.impUid);
  const merchantUid = usePaymentStore((state) => state.merchantUid);
  const { createDonationMutation } = useDonation();
  const { createPaymentMutation } = usePayment();
  const selectedAmount = usePaymentStore((state) => state.selectedAmount);
  const selectedFundingId = usePaymentStore((state) => state.selectedFundingId);
  const selectedPaymentMethod = usePaymentStore(
    (state) => state.selectedPaymentMethod
  );
  const resetPaymentStore = usePaymentStore((state) => state.resetPaymentState);
  const [donationId, setDonationId] = useState<number | null>(null);

  const [hasProcessed, setHasProcessed] = useState(false);

  useEffect(() => {
    if (!impUid || !merchantUid) {
      router.replace("/funding");
      return;
    }

    if (hasProcessed || donationId) return;

    if (!selectedFundingId || selectedAmount === null || !selectedPaymentMethod) {
      console.error("결제 정보가 누락되었습니다.");
      router.push("/funding");
      return;
    }

    const createDonation = async () => {
      try {
          const donationResponse = await createDonationMutation.mutateAsync({
          fundingId: selectedFundingId,
          amount: selectedAmount,
          point: 0,
        });

        if (donationResponse?.data?.id) {
          setDonationId(donationResponse.data.id);
        } else {
          console.error("기부 생성 실패");
          router.push("/funding");
        }
      } catch (error) {
        console.error("기부 생성 중 오류", error);
        router.push("/funding");
        setHasProcessed(false);
      }
    };

    createDonation();
  }, [impUid, donationId, hasProcessed]);

  useEffect(() => {
    if (!donationId || hasProcessed) return;

    const createPayment = async () => {
      try {
        await new Promise((r) => setTimeout(r, 500));

        const paymentCreateData = {
          donationId,
          amount: selectedAmount!,
          points: 0,
          transactionId: impUid ?? "",
          paymentMethod: selectedPaymentMethod!,
          status: "COMPLETED",
          merchantUid: merchantUid ?? "",
          gatewayProvider:
            selectedPaymentMethod === "KAKAO_PAY" ? "kakaopay" : "tosspay",
          impUid: impUid ?? "",
        };

        const paymentResponse = await createPaymentMutation.mutateAsync(
          paymentCreateData
        );

        if (paymentResponse) {
          setHasProcessed(true);
          resetPaymentStore();
          setTimeout(() => router.push(`/donation/complete?fundingId=${selectedFundingId}`));

        } else {
          console.error("결제 생성 실패");
          router.push("/funding");
        }
      } catch (error) {
        console.error("결제 저장 중 에러 발생:", error);
        router.push("/funding");
      }
    };

    createPayment();
  }, [donationId, hasProcessed]);

  return (
    <>
      <BackButton />
      <div className="flex flex-col h-[40vh] justify-center items-center gap-8">
        <Image
          src="/assets/images/load.gif"
          alt="Loading"
          width="100"
          height="100"
        />
        <div className="flex flex-col justify-center items-center gap-1 text-secondary font-semibold ">
          <span className="text-lg">당신의 마음이 전달되고 있습니다.</span>
          <span className="text-md">잠시만 기다려주세요.</span>
        </div>
      </div>
    </>
  );
};

export default DonationLoadingPage;
