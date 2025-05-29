"use client";

import BackButton from "@/components/BackButton";
import ImageUpload from "@/components/funding/ImageUpload";
import RecipientConfirmModal from "@/components/profile/recipient/RecipientConfirmModal";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { OcrRequestData, recipientRegister } from "@/lib/api/ocr";
import { Label } from "@radix-ui/react-label";
import Image from "next/image";
import React, { useState } from "react";

const RecipientRegisterPage = () => {
  const [selectedDocument, setSelectedDocument] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [activeModal, setActiveModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    if (selectedDocument && imageFile) {
      console.log(
        `선택된 서류: ${selectedDocument}, 첨부 이미지 URL: ${imageFile}`
      );
      setActiveModal(true);
    } else if (!selectedDocument) {
      alert("서류를 선택해주세요.");
    } else if (!imageFile) {
      alert("서류 이미지를 첨부해주세요.");
    }
    const docType = selectedDocument === "차상위계층 확인서" ? "1" : "2"; // 예시

    const ocrData: OcrRequestData = {
      multipartFile: imageFile!,
      name: "박애리", // 실제 사용자 이름으로 변경 필요
      doc_type: docType,
    };

    setIsUploading(true);

    try {
      const responseData = await recipientRegister(ocrData); // 분리된 API 함수 호출
      console.log("OCR 응답:", responseData);
      // 필요한 정보 추출해서 상태에 저장하거나 다른 로직 수행
      // 예: setExtractedData(responseData.extractedText);
    } catch (error) {
      // callOcrApi 내부에서 이미 콘솔 로깅을 하므로, 여기서는 사용자 알림만 처리
      alert(
        "OCR 서버 요청 중 오류가 발생했습니다. 개발자 콘솔을 확인해주세요."
      );
    } finally {
      setIsUploading(false);
    }
  };

  const handleCloseModal = () => {
    setActiveModal(false);
  };

  return (
    <>
      <BackButton />
      <div className="flex flex-col h-screen items-center gap-11 py-10 text-secondary">
        <span className="text-[26px]">수혜자 등록</span>
        <div className="flex flex-col w-[80%] h-[50vh] rounded-2xl bg-white gap-8 p-12 text-sm">
          <div>
            <span className="flex">수혜자 등록을 위해 둘 중</span>
            <span>한 가지 서류를 선택해 등록해주세요.</span>
          </div>
          <RadioGroup
            value={selectedDocument}
            onValueChange={(value) => setSelectedDocument(value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="차상위계층 확인서" id="certificate1" />
              <div className="flex flex-col">
                <Label htmlFor="차상위계층 확인서">차상위계층 확인서</Label>
                <span>(주민센터 발급)</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="기초생활수급자 증명서" id="certificate2" />
              <div className="flex flex-col">
                <Label htmlFor="기초생활수급자 증명서">
                  기초생활수급자 증명서
                </Label>
                <span>(주민센터 또는 정부24 발급)</span>
              </div>
            </div>
          </RadioGroup>
          <div className="flex justify-center items-center py-1">
            <label
              htmlFor="file"
              className="w-45 h-30 cursor-pointer bg-white border-2 border-primary/70 rounded-2xl flex items-center justify-center">
              <span className="text-primary">서류 이미지 선택</span>
            </label>
            <input
              id="file"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            {isUploading && (
              <span className="text-sm text-muted">서버로 전송 중...</span>
            )}
            {imagePreview && (
              <div className="mt-2 w-[180px] h-[120px] relative">
                <Image
                  src={imagePreview}
                  alt="preview"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
            )}
          </div>
        </div>
        <Button
          onClick={handleSubmit}
          disabled={!selectedDocument || !imageFile || isUploading} // 업로드 중 비활성화
          size="none"
          className="w-[80%] text-md py-3 rounded-2xl">
          {isUploading ? "처리 중..." : "등록하기"}
        </Button>
      </div>
      {activeModal && (
        <RecipientConfirmModal onClose={() => setActiveModal(false)} />
      )}
    </>
  );
};

export default RecipientRegisterPage;
