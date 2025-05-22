"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { rewardList } from "@/lib/donationReward";
import ConfirmButton from "@/components/ConfirmButton";
import useToast from "@/hooks/useToast";
import { useDonation } from "@/hooks/useDonation";
import { InteractionRewardItem } from "@/lib/api/donation";

export default function NotifyPage() {
  const [showBomb, setShowBomb] = useState(true); // 1초 후 숨길 상태
  const router = useRouter();
  const { showToast } = useToast();
  const { donationRewardQuery } = useDonation();

  const { data: apiResponseData, isLoading, isError, error } = donationRewardQuery;

  const handleNotifyClick = () => {
    router.push("/");

    setTimeout(() => {
      showToast(
        "success",
        "기부 혜택이 주어졌습니다. 마음을 나눠주셔서 감사합니다!",
        {
          position: "top-center",
          closeButton: false,
          autoClose: 3000, // 3초 후 자동 닫힘
          hideProgressBar: true,
          icon: (
            <Image
              height={30}
              width={30}
              alt="알람종"
              src="/assets/icons/alarm.svg"
            />
          ),
        }
      );
    }, 500); // 0.5초 후 실행
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBomb(false);
    }, 900); // 0.9초 후 사라짐

    return () => clearTimeout(timer); // 컴포넌트가 언마운트되면 타이머 제거
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>기부 보상 정보를 불러오는 중...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>기부 보상 정보를 불러오지 못했습니다: {error?.message}</p>
      </div>
    );
  }

  // 실제 보상 데이터 (DonationRewardData 인터페이스의 'data' 필드에 해당)
  // apiResponseData가 존재하고, success가 true이며, data 필드도 null이 아닐 때만 실제 보상 데이터를 사용
  const actualDonationRewardData = apiResponseData?.success && apiResponseData.data
    ? apiResponseData.data // <-- 이 부분이 { interactionRewards: ..., ... } 객체입니다.
    : null;

  if (!actualDonationRewardData) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="relative top-30 text-xl text-primary">기부 혜택</div>
        <p className="mt-4 text-secondary">
          받으실 기부 혜택이 없습니다.
        </p>
        <div className="relative top-75">
          <ConfirmButton />
        </div>
      </div>
    );
  }

  const { interactionRewards, pointReward, nonInteractionRewardItemId } =
    actualDonationRewardData;

  const nonInteractionRewardInfo = rewardList.find(
    (item) => item.id === nonInteractionRewardItemId
  );

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-start"
      onClick={handleNotifyClick}>
      <div className="relative top-30 text-xl text-primary">기부 혜택</div>
      {interactionRewards && interactionRewards.length > 0 && (
        <div className="relative top-50">
          {interactionRewards.map((reward: InteractionRewardItem, index: number) => (
            <div key={index} className="grid grid-cols-3 gap-10 py-5">
              {/* 상호작용 아이콘 또는 이미지 (필요시 추가) */}
              <div className="flex items-center justify-center">
                <Image
                  height={50}
                  width={50}
                  src="/assets/icons/heart.svg"
                  alt={reward.interactionType}
                />
              </div>
              <h1 className="flex items-center text-secondary">
                {reward.interactionType}
              </h1>
              <h1 className="flex items-center text-secondary">
                {reward.quantity}회
              </h1>
            </div>
          ))}
        </div>
      )}

      {/* 포인트 보상 표시 */}
      {pointReward > 0 && (
        <div className="relative top-50">
          <div className="grid grid-cols-3 gap-10 py-5">
            <div className="flex items-center justify-center">
              <Image
                height={50}
                width={50}
                src="/assets/icons/point.svg"
                alt="포인트"
              />
            </div>
            <h1 className="flex items-center text-secondary">포인트</h1>
            <h1 className="flex items-center text-secondary">
              {pointReward}점
            </h1>
          </div>
        </div>
      )}

      {/* 비상호작용 보상 아이템 표시 */}
      {nonInteractionRewardInfo && (
        <div className="relative top-50">
          <div className="grid grid-cols-3 gap-10 py-5">
            <Image
              height={nonInteractionRewardInfo.height || 100}
              width={nonInteractionRewardInfo.width || 100}
              src={nonInteractionRewardInfo.src}
              alt={nonInteractionRewardInfo.alt}
            />
            <h1 className="flex items-center text-secondary">
              {nonInteractionRewardInfo.label}
            </h1>
            <h1 className="flex items-center text-secondary">
              {/* 비상호작용 보상은 times가 없다고 가정, 필요시 추가 */}
            </h1>
          </div>
        </div>
      )}

      {/* 보상이 하나도 없는 경우 */}
      {interactionRewards.length === 0 && pointReward === 0 && !nonInteractionRewardInfo && (
          <p className="mt-4 text-secondary">받으실 기부 혜택이 없습니다.</p>
      )}

      <div className="relative top-75">
        <ConfirmButton />
      </div>
      <div className="fixed ">
        {/* 0.9초 동안만 폭죽 GIF 표시 */}
        {showBomb && (
          <Image
            height={700}
            width={500}
            src="/assets/images/bomb.gif"
            alt="폭죽"
          />
        )}
      </div>
    </div>
  );
}
