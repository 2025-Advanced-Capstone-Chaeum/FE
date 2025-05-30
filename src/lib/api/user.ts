import axiosInstance from "./axios";

export const fetchMemberInfo = async () => {
  const response = await axiosInstance.get("/api/v1/member");
  console.log("내놔", response.data.data);
  return response.data.data;
};
