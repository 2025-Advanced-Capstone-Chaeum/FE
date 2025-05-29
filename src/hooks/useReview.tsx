import axiosInstance from "@/lib/api/axios";

export interface ReviewListData {
  success: boolean;
  data: {
    values: ReviewItem[];
    hasPrevious: boolean;
    hasNext: boolean;
  };
}

export interface ReviewItem {
  id: number;
  title: string;
  reviewImage?: ReviewImage;
  createdAt: string;
}

export interface ReviewImage {
  fileUrl: string;
  fileSize: number;
  contentType: string;
}

export interface CreateReviewData {
  title: string;
  content: string;
  imageUrls: string[];
}

export const createReview = async (
  reviewData: CreateReviewData,
  fundingId?: number
) => {
  const url = fundingId
    ? `/api/v1/review?fundingId=${fundingId}`
    : "/api/v1/review";
  const response = await axiosInstance.post(url, reviewData);
  return response.data;
};

export const fetchReviewList = async (
  cursor?: string,
  limit: number = 8
): Promise<ReviewListData> => {
  const params = new URLSearchParams();
  if (cursor) {
    params.append("cursor", cursor); 
  }
  params.append("limit", String(limit));

  const response = await axiosInstance.get(`/api/v1/review/list`, { params });
  return response.data;
};