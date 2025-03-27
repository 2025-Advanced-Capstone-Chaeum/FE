"use client";

import ImageUpload from "@/components/funding/ImageUpload";
import RegisterConfirmModal from "@/components/funding/RegisterConfirmModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import React, { useState } from "react";

const FundingWritePage = () => {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [purchaseLink, setPurchaseLink] = useState("");
  const [address, setAddress] = useState("");
  const [content, setContent] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = () => {
    if (!title || !imageUrl || !purchaseLink || !address || !content) {
      alert("모든 입력칸을 채워주세요!");
      return;
    }

    setIsRegister(true);
  };

  const handleCloseModal = () => {
    setIsRegister(false);
    resetForm();
  };

  const resetForm = () => {
    setTitle("");
    setImageUrl("");
    setPurchaseLink("");
    setAddress("");
    setContent("");
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
        <ImageUpload setImageUrl={setImageUrl} />
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
        {isRegister && <RegisterConfirmModal onClose={handleCloseModal} />}
      </div>
    </>
  );
};

export default FundingWritePage;