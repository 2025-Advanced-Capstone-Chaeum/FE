"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React from "react";
import BackButton from "@/components/BackButton";
import { useRouter } from "next/navigation";

const RefundCalculatePage = () => {
  const router = useRouter();

  return (
    <>
      <BackButton />
      <div className="flex flex-col px-17 h-[78vh] justify-center gap-15 text-secondary">
        <div className="flex flex-col gap-4">
          <div className="text-2xl">세금 공제 계산기</div>
          <div className="flex flex-col gap-1">
            <div className="text-xs">
              본인의 기부금에 대한 세액공제를 받을 수 있습니다.
            </div>
            <div className="text-xs">예산 환급액을 간단히 계산해보세요!</div>
          </div>
        </div>
        <div className="flex flex-col w-full gap-2">
          <span>올해 총 기부 금액</span>
          <div className="relative flex items-center">
            <Input className="w-full"/>
            <span className="absolute right-2 text-sm text-muted-foreground">
              원
            </span>
          </div>
        </div>
        <div className="flex flex-col w-full gap-2">
          <span>소득 구간</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="soft" size="none" className="flex justify-between px-4 py-2 rounded-lg">
                연간 소득 구간을 선택하세요
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4 opacity-50"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem>1</DropdownMenuItem>
              <DropdownMenuItem>2</DropdownMenuItem>
              <DropdownMenuItem>3</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex flex-col w-full gap-2">
          <span>기부자 유형</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="soft" size="none" className="flex justify-between px-4 py-2 rounded-lg">
                기부자 유형을 선택하세요
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4 opacity-50"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem>1</DropdownMenuItem>
              <DropdownMenuItem>2</DropdownMenuItem>
              <DropdownMenuItem>3</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Button onClick={() => router.push("/refund/result")}>계산하기</Button>
      </div>
    </>
  );
};

export default RefundCalculatePage;
