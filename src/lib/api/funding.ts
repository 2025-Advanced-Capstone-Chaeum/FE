import axiosInstance from "./axios";

export interface FundingData {
  title: string;
  content: string;
  fundingImage: string;
  itemLink: string;
  address: string;
  goalAmount: number;
  endDate: string;
}

export const createFunding = async (
  fundingData: FundingData
): Promise<FundingData> => {
  const response = await axiosInstance.post("/api/v1/funding", fundingData, {
    headers: {
      Authorization: `Bearer &{eyJhbGciOiJIUzUxMiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsImVtYWlsIjoicXdlcmU0NTg1QG5hdmVyLmNvbSIsInJvbGUiOiJET05PUiIsImlhdCI6MTc0NjI2MTg4MSwiZXhwIjoxNzQ2MjY1NDgxfQ.wqaVTeT9jomptUjKf-mQXL2wvt9sMk7k60D6mChg3w_-SAmH8mtCma1TkGzhqp0YNrkeh22_fD_VCmmpnwL0SA}`,
    },
  });
  return response.data;
};
