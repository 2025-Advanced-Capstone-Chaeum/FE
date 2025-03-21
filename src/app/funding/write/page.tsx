import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import React from "react";

const FundingPage = () => {
  return (
    <>
    <div className="pl-6 pt-8 pb-3">
    <Image src={"/assets/icons/back.svg"} alt="Back" width={30} height={30} className="cursor-pointer"/>
    </div>
    <div className="flex flex-col p-2 justify-center items-center gap-5">
      <Input type="text" size="lg" placeholder="제목을 입력해주세요" />
      <div className="flex items-center gap-8">
        <span className="text-sm text-secondary opacity-80">사진 첨부</span>
      <label
        htmlFor="picture"
        className="flex inline-flex items-center cursor-pointer"
      >
        <div className="flex w-45 h-30 bg-background rounded-2xl justify-center items-center">
          <div className="flex w-13 h-13 bg-primary rounded-4xl justify-center items-center">
            <Image
              src="/assets/icons/union.svg"
              alt="Union"
              width={25}
              height={25}
            />
          </div>
        </div>
        <Input
          id="picture"
          type="file"
          variant="picture"
          size="xs"
          style={{ display: "none" }}
        />
      </label>
      </div>
      
      <Input type="text" size="sm" placeholder="물품 구매 링크" />
      <Input type="text" size="sm" placeholder="주소지 입력" />
      <Textarea
        placeholder="내용"
        className="bg-white rounded-xl text-sm w-[85%] h-50"
      />
      <Button variant="soft" size="xl">
        <span className="text-secondary font-semibold text-[17px]">마음 나눠받기</span>
      </Button>
    </div>
    </>
  );
};

export default FundingPage;
