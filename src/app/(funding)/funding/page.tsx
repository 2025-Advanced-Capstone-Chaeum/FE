"use client";

import FilterButtons from "@/components/funding/FilterButton";
import CampaignCard from "@/components/funding/CampaignCard";
import NavigateToWriteButton from "@/components/funding/NavigateToWriteButton";
import { useState, useCallback } from "react";
import { useFunding } from "@/hooks/useFunding";
import { FundingData } from "@/lib/api/funding";

export default function FundingListPage() {
  const [statusFilter, setStatusFilter] = useState<
    "ONGOING" | "COMPLETED" | "FAILED" | undefined
  >(undefined);
  const [sortCondition, setSortCondition] = useState<"최신순" | "진행중">(
    "최신순"
  );

  const handleSortConditionChange = useCallback(
    (newCondition: "최신순" | "진행중") => {
      setSortCondition(newCondition);
      if (newCondition === "진행중") {
        setStatusFilter("ONGOING");
      } else {
        setStatusFilter(undefined);
      }
    },
    [setStatusFilter, setSortCondition]
  );

  const { fundingListQuery } = useFunding(undefined, {
    status: statusFilter,
    limit: 8,
    cursor: undefined,
    title: undefined,
  });
  const { data: FundingByConditionData, isLoading, isError } = fundingListQuery;

  const campaigns: FundingData[] | undefined =
    FundingByConditionData?.data?.values;

  if (isLoading) return <div>Loading campaigns...</div>;
  if (isError) return <div>Error loading campaigns</div>;

  return (
    <div className="flex min-h-screen flex-col px-8 py-8 relative">
      <div className="flex w-full justify-between">
        <div>
          <FilterButtons
            onSortConditionChange={handleSortConditionChange}
            currentSortCondition={sortCondition}
          />
        </div>
        <div className="absolute top-[2.8vh] right-8">
          <NavigateToWriteButton />
        </div>
      </div>

      {/* Projects grid */}
      <div className="relative top-[6vh] mt-[10px] grid grid-cols-2 gap-5 max-h-[78vh] overflow-y-scroll scrollbar-none">
        {campaigns?.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>
    </div>
  );
}
