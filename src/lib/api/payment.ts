import axiosInstance from "./axios";

export interface PaymentCreateData {
  donationId?: number;
  amount: number;
  transactionId: string;
  paymentMethod: string;
  status: string;
  paymentGatewayInfoRequest?: PaymentGatewayInfoRequest;
}

interface PaymentGatewayInfoRequest {
  importUid?: string;
  merchantUid: string;
  gatewayProvider?: string;
  failReason?: string;
}

export const createPayment = async (
    paymentData: PaymentCreateData
) : Promise<PaymentCreateData> => {
  const response = await axiosInstance.post("/api/v1/payment", paymentData);
  return response.data;
};