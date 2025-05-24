import { createReview, CreateReviewData } from "@/lib/api/review";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

interface CreateReviewPayload {
  id: number;
  reviewData: CreateReviewData;
}

interface UseReviewResult {
  createReviewMutation: UseMutationResult<
    CreateReviewData,
    Error,
    CreateReviewPayload,
    unknown
  >;
}

export const useReview = () => { 
  const createReviewMutation: UseReviewResult['createReviewMutation'] =
    useMutation({
      mutationFn: ({ id, reviewData }: CreateReviewPayload) =>
        createReview(id, reviewData),
      onSuccess: (data: CreateReviewData) => {
        console.log("리뷰 생성 성공:", data);
      },
      onError: (error: Error) => {
        console.error("리뷰 생성 실패:", error);
      },
    });
  return {
    createReviewMutation,
  };
};
