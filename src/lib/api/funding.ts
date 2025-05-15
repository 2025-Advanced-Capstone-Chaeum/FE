import axiosInstance from "./axios";

export interface FundingImage {
  fileUrl: string;
  fileSize: number;
  contentType: string;
}

export interface FundingData {
  id: number;
  title: string;
  content: string;
  fundingImages?: FundingImage[];
  itemLink?: string;
  address?: string;
  goalAmount: number;
  currentAmount: number;
  status: "ONGOING" | "COMPLETED" | "FAILED";
  endDate: string;
  isReviewed: boolean;
  createdAt: string;
}

export interface FundingByConditionData {
  success: boolean;
  data: {
    values: FundingData[];
    hasPrevious: boolean;
    hasNext: boolean;
  } | null;
}

export interface CreateFundingData {
  title: string;
  content: string;
  goalAmount: number;
  endDate: string;
  itemLink?: string;
  address?: string;
  fundingImages?: File[];
}

export const createFunding = async (
  fundingData: CreateFundingData
): Promise<FundingData> => {
  const response = await axiosInstance.post("/api/v1/funding", fundingData, {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsImVtYWlsIjoicXdlcmU0NTg1QG5hdmVyLmNvbSIsInJvbGUiOiJET05PUiIsImlhdCI6MTc0NzMwNzc5NiwiZXhwIjoxNzQ3MzExMzk2fQ.PDngbu49Vt8lLampjwVmRgp-PvLs7DQsZghVKGqOX2mwz1kwPJyWVc99fHypQDjnUHwSmp87HFI3G4QIu4-4EQ`,
    },
  });
  return response.data;
};

export const fetchFundingByCondition = async (
  status?: string,
  title?: string,
  cursor?: number,
  limit: number = 3
): Promise<FundingByConditionData> => {
  const params = new URLSearchParams();
  if (status) params.append("status", status);
  if (title) params.append("title", title);
  if (cursor) params.append("cursor", String(cursor));
  params.append("limit", String(limit));

  const response = await axiosInstance.get(
    `/api/v1/funding/condition?${params.toString()}`,
    {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsImVtYWlsIjoicXdlcmU0NTg1QG5hdmVyLmNvbSIsInJvbGUiOiJET05PUiIsImlhdCI6MTc0NzMwNzc5NiwiZXhwIjoxNzQ3MzExMzk2fQ.PDngbu49Vt8lLampjwVmRgp-PvLs7DQsZghVKGqOX2mwz1kwPJyWVc99fHypQDjnUHwSmp87HFI3G4QIu4-4EQ`,
      },
    }
  );
  return response.data;
};

export const fetchFunding = async (fundingId: number): Promise<FundingData | null> => {
  try {
    const response = await axiosInstance.get<{ success: boolean; data: FundingData }>(
      `/api/v1/funding?fundingId=${fundingId}`,
      {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsImVtYWlsIjoicXdlcmU0NTg1QG5hdmVyLmNvbSIsInJvbGUiOiJET05PUiIsImlhdCI6MTc0NzMwNzc5NiwiZXhwIjoxNzQ3MzExMzk2fQ.PDngbu49Vt8lLampjwVmRgp-PvLs7DQsZghVKGqOX2mwz1kwPJyWVc99fHypQDjnUHwSmp87HFI3G4QIu4-4EQ`,
      },
    }
    );
    if (response.data.success && response.data.data) {
      return response.data.data;
    } else {
      console.error("펀딩 데이터 로딩 실패:", response.data);
      return null;
    }
  } catch (error) {
    console.error("펀딩 데이터 요청 에러:", error);
    return null;
  }
};