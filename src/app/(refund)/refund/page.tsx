"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import BackButton from "@/components/BackButton";
import { useRouter } from "next/navigation";
import Dropdown from "@/components/ui/Dropdown";

const RefundCalculatePage = () => {
  const annualIncomeOptions = ["1", "2", "3"];
  const donorTypeOptions = ["개인", "사업자"];
  const router = useRouter();

  const [donationAmount, setDonationAmount] = useState("");
  const [incomeBracket, setIncomeBracket] = useState<string | null>(null);
  const [donorType, setDonorType] = useState<string | null>(null);
  const isCalculateButtonDisabled = !donationAmount || !incomeBracket || !donorType;

  const handleCalculate = () => {
    if (!isCalculateButtonDisabled) {
      router.push("/refund/result");
    } else {
      alert("모든 항목을 선택해주세요.");
    }
  };

  return (
    <>
      <BackButton />
      <div className="flex flex-col px-17 h-[78vh] justify-center gap-15 text-secondary">
        <div className="flex flex-col gap-4">
          <div className="text-2xl font-semibold">세금 공제 계산기</div>
          <div className="flex flex-col gap-1">
            <div className="text-xs">
              본인의 기부금에 대한 세액공제를 받을 수 있습니다.
            </div>
            <div className="text-xs">예산 환급액을 간단히 계산해보세요!</div>
          </div>
        </div>
        <div className="flex flex-col w-full gap-2">
          <span>올해 총 소득금액</span>
          <div className="relative flex items-center">
            <Input className="w-full" 
            value={donationAmount}
            onChange={(e) => setDonationAmount(e.target.value)}/>
            <span className="absolute right-2 text-sm text-muted-foreground">
              원
            </span>
          </div>
        </div>
        <div className="flex flex-col w-full relative gap-2">
          <span>소득 구간</span>
          <Dropdown options={annualIncomeOptions}  onSelect={(value) => setIncomeBracket(value)}>
            연간 소득 구간을 선택하세요
          </Dropdown>
        </div>
        <div className="flex flex-col w-full relative gap-2">
          <span>기부자 유형</span>
          <Dropdown options={donorTypeOptions} onSelect={(value) => setDonorType(value)}>
            기부자 유형을 선택하세요
          </Dropdown>
        </div>
        <Button onClick={handleCalculate} disabled={isCalculateButtonDisabled}>계산하기</Button>
      </div>
    </>
  );
};

export default RefundCalculatePage;
