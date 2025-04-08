import { ChevronDown, ChevronLeft, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import BackButton from "@/components/BackButton";
import { myDonationList } from "@/lib/myDonationList";
import MyDonationList from "@/components/profile/MyDonationList";

export default function DonationHistorypage() {
  return (
    <>
      <BackButton />
      {/* Header */}
      <div className="px-10">
        {" "}
        <div className="py-3 flex justify-center items-center">
          <div className="w-full max-w-xl flex relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-500" />
            </div>
            <Input
              type="text"
              placeholder="필터 제목, 금액으로 검색"
              className="w-full pl-11 h-10 bg-white rounded-full text-sm !placeholder-gray-400 "
            />
          </div>
        </div>
        {/* Filter */}
        <div className=" py-2">
          <button className={StButton}>
            기간 검색 <ChevronDown className="h-4 w-4" />
          </button>
        </div>
        {/* Donation List */}
        <div className="flex-1 max-h-[79vh] overflow-y-scroll scrollbar-none py-4">
          <div className="space-y-7">
            {myDonationList.map((myDonation) => (
              <MyDonationList donation={myDonation} key={myDonation.id} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

const StButton =
  "flex items-center gap-1 bg-white text-sm text-gray rounded-lg px-2 py-1.5 shadow-sm";
