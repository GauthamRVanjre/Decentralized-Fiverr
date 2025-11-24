import { useQuery } from "@tanstack/react-query";
import { getJobs } from "../requests/Jobs.requests";

export function useGetJobs() {
  return useQuery({
    queryKey: ["jobs"],
    queryFn: getJobs,
    refetchInterval: 150000, // auto refresh every 15 seconds
  });
}
