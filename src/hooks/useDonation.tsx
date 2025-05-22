import { DonationRewardData, fetchDonationReward } from "@/lib/api/donation"
import { useQuery, UseQueryResult } from "@tanstack/react-query"

interface UseDonationResult {
    donationRewardQuery: UseQueryResult<DonationRewardData | null, Error>;
}

export const useDonation = (
): UseDonationResult => {
    const donationRewardQuery: UseQueryResult<DonationRewardData | null, Error> = useQuery({
        queryKey: ["doantionReward"],
        queryFn: async () => {
            return await fetchDonationReward();
        }
    });

    return {
        donationRewardQuery,
    }
}