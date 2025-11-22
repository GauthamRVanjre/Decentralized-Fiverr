import { useQuery } from "@tanstack/react-query";
import { getEthForUsd, getUsdForEth } from "../requests/api.requests";

export function useUsdtoEth() {
  return useQuery({
    queryKey: ["ethUsdPrice"],
    queryFn: getUsdForEth,
    refetchInterval: 150000, // auto refresh every 15 seconds
  });
}

export function useEthtoUsd(usd: number) {
  return useQuery({
    queryKey: ["usdEthPrice"],
    queryFn: () => getEthForUsd(usd),
    refetchInterval: 150000, // auto refresh every 15 seconds
  });
}
