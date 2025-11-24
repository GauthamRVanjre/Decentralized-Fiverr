import { readContract } from "@wagmi/core";
import {
  SMART_CONTRACT_ABI,
  SMART_CONTRACT_ADDRESS,
} from "../constants/constants";
import { config } from "../config/Wagmi";
import { formatEther } from "viem";

// Reads the latest price from the smart contract and returns it in wei (18 decimals)
export async function getEthForUsd(usd: number) {
  // scale USD → 1e18
  const usdScaled = BigInt(usd) * 10n ** 18n;

  const rawEth = (await readContract(config, {
    abi: SMART_CONTRACT_ABI,
    address: SMART_CONTRACT_ADDRESS,
    functionName: "convertUsdToEth",
    args: [usdScaled],
  })) as bigint;

  return formatEther(rawEth);
}

export async function getUsdForEth() {
  const rawUsd = (await readContract(config, {
    abi: SMART_CONTRACT_ABI,
    address: SMART_CONTRACT_ADDRESS,
    functionName: "getLatestPrice",
  })) as bigint;

  return formatEther(rawUsd);
}
