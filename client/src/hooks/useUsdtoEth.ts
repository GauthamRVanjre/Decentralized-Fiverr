import { useQuery } from "@tanstack/react-query";
import { getEthForUsd, getUsdForEth } from "../requests/price.requests";

export function useUsdtoEth() {
  return useQuery({
    queryKey: ["ethUsdPrice"],
    queryFn: getUsdForEth,
    refetchInterval: 150000, // auto refresh every 15 seconds
  });
}

export function useEthtoUsd(usd: number) {
  return useQuery({
    // include `usd` in the query key so react-query refetches when the input changes
    queryKey: ["usdEthPrice", usd],
    queryFn: () => getEthForUsd(usd),
    // enable whenever usd is a valid number (including 0)
    enabled: typeof usd === "number" && !isNaN(usd),
    refetchInterval: 150000, // auto refresh every 15 seconds
  });
}
