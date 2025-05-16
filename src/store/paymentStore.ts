// store/fundingStore.ts
import { create } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';

interface PaymentState {
  selectedFundingId: number | null;
  setSelectedFundingId: (id: number | null) => void;
  selectedAmount: number | null;
  setSelectedAmount: (amount: number | null) => void;
  selectedPaymentMethod: string | null;
  setSelectedPaymentMethod: (method: string | null) => void;
}

type PaymentStorePersist = PersistOptions<PaymentState>;

export const usePaymentStore = create<PaymentState>()(
  persist<PaymentState, [], [], PaymentStorePersist>(
    (set) => ({
      selectedFundingId: null,
      setSelectedFundingId: (id) => set({ selectedFundingId: id }),
      selectedAmount: null,
      setSelectedAmount: (amount) => set({ selectedAmount: amount }),
      selectedPaymentMethod: null,
      setSelectedPaymentMethod: (method) => set({ selectedPaymentMethod: method }),
    }),
    {
      name: "chaeum-payment-storage",
    }
  )
);