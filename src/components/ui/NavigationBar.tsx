import React from "react";
import Image from "next/image";

const NavigationBar = () => {
  return (
    <div className="w-full h-[5rem] fixed bottom-0 bg-white">
      <div className="absolute top-1 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80px] h-[80px] rounded-full bg-primary opacity-80 flex items-center justify-center">
        <Image src="/assets/icons/home.svg" alt="Home" width={28} height={28} />
      </div>
      <div className="flex w-full">
        <div className="flex w-[45%] pl-12 pt-4 justify-between">
          <div className="flex flex-col gap-[4px] items-center justify-center">
              <Image
                src="/assets/icons/funding.svg"
                alt="Funding"
                width={26}
                height={27}
              />
            <span className="font-semibold text-xs text-primary">펀딩</span>
          </div>
          <div className="flex flex-col gap-0.5 items-center justify-center">
            <Image
              src="/assets/icons/review.svg"
              alt="Review"
              width={28}
              height={28}
            />
            <span className="font-semibold text-xs text-primary">후기</span>
          </div>
        </div>
        <div className="flex w-full justify-end">
          <div className="flex w-1/2 pr-12 pt-4 justify-between">
            <div className="flex flex-col gap-0.5 items-center justify-center">
              <Image
                src="/assets/icons/friend.svg"
                alt="Friend"
                width={25}
                height={25}
              />
              <span className="font-semibold text-xs text-primary">친구</span>
            </div>
            <div className="flex flex-col gap-[4px] items-center justify-center">
              <Image
                src="/assets/icons/profile.svg"
                alt="Friend"
                width={29}
                height={29}
              />
              <span className="font-semibold text-xs text-primary">
                내 계정
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
