import { fetchInventoryByCategory } from "@/lib/api/inventory";
import { useQuery } from "@tanstack/react-query";

export const useInventorySearch = () => {
  return useQuery({
    queryKey: ["decoration"],
    queryFn: () => fetchInventoryByCategory("DECORATION"),
  });
};
