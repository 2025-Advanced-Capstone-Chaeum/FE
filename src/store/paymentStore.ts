import { create } from 'zustand';

interface PaymentState {
  selectedAmount: number | null;
  selectedFundingId: number | null;
  selectedPaymentMethod: string | null;
  selectedFundingIdForPayment: number | null; // 새로운 상태 추가
  setSelectedAmount: (amount: number | null) => void;
  setSelectedFundingId: (fundingId: number | null) => void;
  setSelectedPaymentMethod: (method: string | null) => void;
  setSelectedFundingIdForPayment: (fundingId: number | null) => void; // 새로운 액션 추가
}

export const usePaymentStore = create<PaymentState>((set) => ({
  selectedAmount: null,
  selectedFundingId: null,
  selectedPaymentMethod: null,
  selectedFundingIdForPayment: null, // 초기값 설정

  setSelectedAmount: (amount) => set({ selectedAmount: amount }),
  setSelectedFundingId: (fundingId) => set({ selectedFundingId: fundingId }),
  setSelectedPaymentMethod: (method) => set({ selectedPaymentMethod: method }),
  setSelectedFundingIdForPayment: (fundingId) => set({ selectedFundingIdForPayment: fundingId }), // 액션 함수 구현
}));