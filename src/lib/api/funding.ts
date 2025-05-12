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
      Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsImVtYWlsIjoicXdlcmU0NTg1QG5hdmVyLmNvbSIsInJvbGUiOiJET05PUiIsImlhdCI6MTc0NjI3MDU3NSwiZXhwIjoxNzQ2Mjc0MTc1fQ.-Fp_x3MO3XMavGbSdni8wX5u6Foj23JgT6WrNXRRRq6RVnSvCpBRuDQaPZgpO5XrRlXBK2PDYPVf0fns0oHxNg`,
    },
  });
  return response.data;
};
