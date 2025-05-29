import { useQuery } from "@tanstack/react-query";
import { fetchMemberInfo } from "./api/user";

export const userData = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: fetchMemberInfo,
  });
};
