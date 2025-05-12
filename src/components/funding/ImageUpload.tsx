import Image from "next/image";
import React, { useState } from "react";
import { Input } from "../ui/input";
import axiosInstance from "@/lib/api/axios";

interface ImageUploadProps {
  setImageUrl: (url: string) => void;
  type?: "primary" | "soft";
  text?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ setImageUrl, type = "primary", text }) => {
  const [localImageUrl, setLocalImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false); // 업로드 상태 관리

  const uploadFile = async (file: File): Promise<string | null> => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('multipartFile', file);

      const response = await axiosInstance.post('/api/v1/file/funding', formData, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsImVtYWlsIjoicXdlcmU0NTg1QG5hdmVyLmNvbSIsInJvbGUiOiJET05PUiIsImlhdCI6MTc0NjI3MDU3NSwiZXhwIjoxNzQ2Mjc0MTc1fQ.-Fp_x3MO3XMavGbSdni8wX5u6Foj23JgT6WrNXRRRq6RVnSvCpBRuDQaPZgpO5XrRlXBK2PDYPVf0fns0oHxNg`,
        },
      });

      if (response.status === 200) {
        console.log(response.data);
        return response.data.data[0].fileUrl;
      } else {
        console.error('파일 업로드 실패:', response.statusText);
        return null;
      }
    } catch (error: any) {
      console.error('파일 업로드 중 오류:', error.message);
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 압축 제거
      // try {
      //   const compressedFile = await imageCompression(file, {
      //     maxSizeMB: 1, // 최대 파일 크기 (MB)
      //     maxWidthOrHeight: 1920, // 최대 너비 또는 높이
      //   });
      //   console.log('압축된 이미지 파일:', compressedFile);

      //   // 압축된 파일을 서버에 업로드하고 URL을 받아서 전달
      //   const imageUrlFromServer = await uploadFile(compressedFile);
      //   if (imageUrlFromServer) {
      //     setImageUrl(imageUrlFromServer);
      //     setLocalImageUrl(imageUrlFromServer); // 로컬 미리보기 URL 설정
      //   } else {
      //     // 업로드 실패 시 미리보기 초기화 또는 오류 처리
      //     setLocalImageUrl("");
      //     setImageUrl("");
      //   }

      // } catch (error) {
      //   console.error('이미지 압축 실패:', error);
      //   // 압축 실패 처리
      //   setLocalImageUrl("");
      //   setImageUrl("");
      // }

      // 압축 제거 후 바로 업로드
      const imageUrlFromServer = await uploadFile(file);
      if (imageUrlFromServer) {
        setImageUrl(imageUrlFromServer);
        setLocalImageUrl(imageUrlFromServer);
      } else {
        setLocalImageUrl("");
        setImageUrl("");
      }
    }
  };

  return (
    <div className="flex items-center gap-8">
      {text && (
        <span className="text-sm text-secondary opacity-80">{text}</span>
      )}
      {localImageUrl ? (
        <div className="w-45 h-30 overflow-hidden relative">
          <Image
            src={localImageUrl}
            alt="Uploaded Image"
            width={180}
            height={120}
            objectFit="contain"
          />
          {isUploading && (
            <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center">
              <span className="text-white animate-spin">⏳</span> {/* 로딩 애니메이션 */}
            </div>
          )}
        </div>
      ) : (
        <label
          htmlFor="picture"
          className="flex inline-flex items-center cursor-pointer"
        >
          { type === "primary" &&
          <div className="flex w-45 h-30 bg-background rounded-2xl justify-center items-center">
            <div className="flex w-13 h-13 bg-primary rounded-4xl justify-center items-center opacity-90">
              <Image
                src="/assets/icons/union.svg"
                alt="Union"
                width={25}
                height={25}
              />
            </div>
          </div>
           }
           { type === "soft" &&
          <div className="flex w-45 h-30 bg-white border-2 border-primary/70 rounded-2xl justify-center items-center">
            <div className="flex w-13 h-13 bg-primary rounded-4xl justify-center items-center opacity-70">
              <Image
                src="/assets/icons/union.svg"
                alt="Union"
                width={25}
                height={25}
              />
            </div>
          </div>
           }
          <Input
            id="picture"
            type="file"
            variant="picture"
            size="xs"
            style={{ display: "none" }}
            onChange={handleImageChange}
            accept="image/*"
          />
        </label>
      )}
    </div>
  );
};

export default ImageUpload;