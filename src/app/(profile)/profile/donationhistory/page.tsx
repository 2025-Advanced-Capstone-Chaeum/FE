"use client";

import { ChevronDown, ChevronLeft, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import BackButton from "@/components/BackButton";
import { myDonationList } from "@/lib/myDonationList";
import MyDonationList from "@/components/profile/MyDonationList";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/SearchBar";
import DateSearchModal from "@/components/donationhistory/DateSearchModal";


export default function DonationHistorypage() {
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  return (
    <>
      <BackButton />
      {/* Header */}
      <div className="px-10">
        {" "}
        <div className="py-3 flex justify-center items-center">
          <SearchBar placeholdertext="필터 제목, 금액으로 검색" />
        </div>
        {/* Filter */}
        <div className=" py-2">
          <DateSearchModal />
        </div>
        {/* Donation List */}
        <div className="flex-1 max-h-[79vh] overflow-y-scroll scrollbar-none py-4">
          <div className="space-y-7">
            {myDonationList.map((myDonation) => (
              <MyDonationList donation={myDonation} key={myDonation.id} />
            ))}
          </div>
        </div>
        {/* {isDateModalOpen && (
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-end justify-center">
            <div className="relative w-full max-w-md">
              <div className="bg-white rounded-xl mt-[40%] overflow-hidden">
                <div className="p-6">
                  <h3 className="text-lg font-medium mb-6">기간 선택</h3>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">시작일</span>
                      <div className="flex items-center">
                        <span className="text-sm">{startDate}</span>
                        <ChevronDown className="h-4 w-4 ml-1 text-gray-400" />
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm">종료일</span>
                      <div className="flex items-center">
                        <span className="text-sm">{endDate}</span>
                        <ChevronDown className="h-4 w-4 ml-1 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-8">
                    <Button
                      variant="gray"
                      className="rounded-md py-3"
                      onClick={() => setIsDateModalOpen(false)}>
                      닫기
                    </Button>
                    <Button
                      className="rounded-md py-3 bg-[#8667ff] hover:bg-[#7559f5]"
                      onClick={() => setIsDateModalOpen(false)}>
                      선택완료
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )} */}
      </div>
    </>
  );
}

const StButton =
  "flex items-center gap-1 bg-white text-sm text-gray rounded-lg px-2 py-1.5 shadow-sm";
