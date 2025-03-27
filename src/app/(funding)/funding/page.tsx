import React from "react";
import FilterButtons from "@/components/funding/filterButtons";
import CampaignCard from "@/components/funding/campaignCard";
import { transformedCampaigns } from "@/utils/fundingPage";

const FundingListPage = () => {
  return (
    <div className="flex min-h-screen flex-col px-8 py-2">
      {/* Filter dropdown */}
      <FilterButtons />

      {/* Projects grid */}
      <div className="relative top-[12vh] mt-[10px] grid grid-cols-2 gap-3 max-h-[80vh] overflow-y-auto scrollbar-none">
        {" "}
        {transformedCampaigns.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>
    </div>
  );
};

export default FundingListPage;
