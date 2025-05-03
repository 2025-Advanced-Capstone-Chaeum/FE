import Image from "next/image";
import React, { useState } from "react";
import { Input } from "../ui/input";
import imageCompression from 'browser-image-compression';

interface ImageUploadProps {
  setImageUrl: (url: string) => void;
  type?: "primary" | "soft";
  text?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ setImageUrl, type = "primary", text }) => {
  const [localImageUrl, setLocalImageUrl] = useState("");

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 1, // 최대 파일 크기 (MB)
          maxWidthOrHeight: 1920, // 최대 너비 또는 높이
        });
        console.log('압축된 이미지 파일:', compressedFile);

        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === "string") {
            setLocalImageUrl(reader.result);
            setImageUrl(reader.result);
          }
        };
        reader.readAsDataURL(compressedFile);

        // 또는 압축된 파일을 서버에 업로드하고 URL을 받아서 전달하는 방식
        // const imageUrlFromServer = await uploadImageToServer(compressedFile);
        // if (imageUrlFromServer) {
        //   setImageUrl(imageUrlFromServer);
        // }

      } catch (error) {
        console.error('이미지 압축 실패:', error);
      }
    }
  };

  return (
    <div className="flex items-center gap-8">
      {text && (
        <span className="text-sm text-secondary opacity-80">{text}</span>
      )}
      {localImageUrl ? (
        <div className="w-45 h-30 overflow-hidden">
          <Image
            src={localImageUrl}
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