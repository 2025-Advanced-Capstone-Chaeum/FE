import { DonationRewardData, fetchDonationReward } from "@/lib/api/donation"
import { useQuery, UseQueryResult } from "@tanstack/react-query"

interface UseDonationResult {
    donationQuery: UseQueryResult<DonationRewardData | null, Error>;
}

export const useDonation = (
): UseDonationResult => {
    const donationQuery: UseQueryResult<DonationRewardData | null, Error> = useQuery({
        queryKey: ["doantionReward"],
        queryFn: async () => {
            return await fetchDonationReward();
        }
    });

    return {
        donationQuery,
    }
}