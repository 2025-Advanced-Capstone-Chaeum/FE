"use client";

import BackButton from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import { friendDonations, friendsList } from "@/lib/friendsSampleData";
import { UsersRound, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function FriendsPage() {
  const [isFriendsListOpen, setIsFriendsListOpen] = useState<boolean>(true);
  const [isCommonDonationListOpen, setIsCommonDonationListOpen] =
    useState<boolean>(false);

  return (
    <>
      <BackButton />
      <div className="flex flex-col px-8 py-4 md:p-15">
        {/* 헤더 */}
        <div className="px-4 md:px-10 flex justify-between items-center">
          <h1 className="text-2xl text-secondary font-semibold opacity-80">
            친구
          </h1>
          <Image
            height={25}
            width={40}
            alt="돋보기"
            src="/assets/icons/search.svg"
            className="pl-3"
          />
        </div>

        {/* 버튼 필터 영역 */}
        <div className="px-4 py-6 md:px-12 mb-6">
          <div className="h-[6vh] bg-white rounded-full flex overflow-hidden w-full max-w-md mx-auto">
            <Button
              className={`h-[5vh] flex-1 rounded-full text-md border-none m-1 py-2 px-4 ${
                isFriendsListOpen
                  ? "bg-primary opacity-80 text-white shadow-xs hover:bg-primary/80 text-white"
                  : "bg-white-gradient hover:bg-gray-200 text-secondary"
              }`}
              onClick={() => {
                setIsFriendsListOpen(true);
                setIsCommonDonationListOpen(false);
              }}>
              <UsersRound className="mr-2 h-5 w-5" />
              전체 친구
            </Button>
            <Button
              className={`h-[5vh] flex-1 rounded-full text-md border-none m-1 py-2 px-4 ${
                isCommonDonationListOpen
                  ? "bg-primary opacity-80 text-white shadow-xs hover:bg-primary/80 text-white"
                  : "bg-white-gradient hover:bg-gray-200 text-secondary"
              }`}
              onClick={() => {
                setIsFriendsListOpen(false);
                setIsCommonDonationListOpen(true);
              }}>
              <Heart className="mr-2 h-5 w-5" />
              함께한 기부
            </Button>
          </div>
        </div>
        <div className="h-[60vh] bg-background border-3 border-white rounded-2xl p-2 overflow-y-scroll scrollbar-none mx-4 md:mx-10">
          {isFriendsListOpen &&
            friendsList.map((friend) => (
              <div
                key={friend.id}
                className="flex items-center justify-between p-3 border-b-3 border-white last:border-b-0">
                <div className="flex items-center">
                  <Image
                    src={friend.profile_img || "/placeholder.svg"}
                    alt={friend.name}
                    width={40}
                    height={40}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-medium text-secondary">
                        {friend.name}
                      </h3>
                      <span className=" bg-white ml-2 pt-0.5 px-2 rounded-xl text-xs text-secondary">
                        {friend.badge}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      함께한 기부: {friend.commondonation}회
                    </p>
                  </div>
                </div>
                <Link key={friend.id} href={`/friends/${friend.id}`}>
                  <Button
                    variant="soft"
                    className="rounded-full px-4 py-1 h-8 text-sm border-gray-200">
                    보기
                  </Button>
                </Link>
              </div>
            ))}
          {isCommonDonationListOpen &&
            friendDonations.map((donation) => {
              return (
                <div
                  key={donation.id}
                  className="flex items-center gap-5 p-3 border-b-3 border-white last:border-b-0">
                  <div className="flex items-center">
                    <Image
                      src="/assets/images/study.png"
                      alt={donation.friendName}
                      width={50}
                      height={50}
                      className="rounded-xl mr-4"
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <h1 className="text-sm truncate w-[40vw] overflow-hidden whitespace-nowrap text-ellipsis">
                      기부 : {donation.fundingTitle}
                    </h1>

                    <h1 className="text-sm">
                      함께한 친구 : {donation.friendName}
                    </h1>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
