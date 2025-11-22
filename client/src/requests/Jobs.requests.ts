import { writeContract, waitForTransactionReceipt } from "@wagmi/core";
import {
  SMART_CONTRACT_ABI,
  SMART_CONTRACT_ADDRESS,
} from "../constants/constants";
import { config } from "../config/Wagmi";
import { parseEther } from "viem";

export type createJobParams = {
  fileCid: string;
  ethAmount: string;
};

export const createJob = async ({ fileCid, ethAmount }: createJobParams) => {
  const txHash = await writeContract(config, {
    abi: SMART_CONTRACT_ABI,
    address: SMART_CONTRACT_ADDRESS,
    functionName: "createJob",
    args: [fileCid],
    value: parseEther(ethAmount),
  });

  // wait for transaction to be mined
  const receipt = await waitForTransactionReceipt(config, {
    hash: txHash,
  });

  return { txHash, receipt };
};
