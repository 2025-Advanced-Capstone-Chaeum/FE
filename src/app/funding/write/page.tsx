"use client";

import RegisterConfirmModal from "@/components/funding/RegisterConfirmModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useFundingStore from "@/store/fundingStore";
import Image from "next/image";
import React, { useState } from "react";

const FundingPage = () => {
  const {
    title,
    imageUrl,
    purchaseLink,
    address,
    content,
    setTitle,
    setImageUrl,
    setPurchaseLink,
    setAddress,
    setContent,
    reset,
  } = useFundingStore();
  const [isRegister, setIsRegister] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setImageUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!title || !imageUrl || !purchaseLink || !address || !content) {
      alert("모든 입력칸을 채워주세요!");
      return;
    }

    setIsRegister(true);
    console.log({ title, imageUrl, purchaseLink, address, content });
    reset();
  };

  return (
    <>
      <div className="pl-6 pt-8 pb-3">
        <Image
          src={"/assets/icons/back.svg"}
          alt="Back"
          width={30}
          height={30}
          className="cursor-pointer"
        />
      </div>
      <div className="flex flex-col p-2 justify-center items-center gap-5">
        <Input
          type="text"
          size="lg"
          placeholder="제목을 입력해주세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="flex items-center gap-8">
          <span className="text-sm text-secondary opacity-80">사진 첨부</span>
          {imageUrl ? (
            <div className="w-45 h-30 overflow-hidden">
              <Image
                src={imageUrl}
                alt="Uploaded Image"
                width={180}
                height={120}
                objectFit="contain"
              />
            </div>
          ) : (
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
                onChange={handleImageChange}
              />
            </label>
          )}
        </div>
        <Input
          type="text"
          size="sm"
          placeholder="물품 구매 링크"
          value={purchaseLink}
          onChange={(e) => setPurchaseLink(e.target.value)}
        />
        <Input
          type="text"
          size="sm"
          placeholder="주소지 입력"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <Textarea
          placeholder="내용"
          className="bg-white rounded-xl text-sm w-[85%] h-50"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button variant="soft" size="xl" onClick={handleSubmit}>
          <span className="text-secondary font-semibold text-[17px]">
            마음 나눠받기
          </span>
        </Button>
        {isRegister && <RegisterConfirmModal />}
      </div>
    </>
  );
};

export default FundingPage;
