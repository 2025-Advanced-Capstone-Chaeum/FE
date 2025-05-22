import axiosInstance from "./axios";

export interface DonationRewardData {
  success: boolean;
  data: {
    interactionRewards: {
      interactionType: string;
      quantity: number;
    }[];
    pointReward: number;
    nonInteractionRewardItemId: number;
  } | null;
}

export const fetchDonationReward = async (): Promise<DonationRewardData> => {
  const response = await axiosInstance.get("/api/v1/donation/reward");
  return response.data;
};
