import {
  writeContract,
  waitForTransactionReceipt,
  readContract,
} from "@wagmi/core";
import {
  SMART_CONTRACT_ABI,
  SMART_CONTRACT_ADDRESS,
} from "../constants/constants";
import { config } from "../config/Wagmi";
import { formatEther, parseEther } from "viem";
import { getFile } from "./pinata.requests";
import type { Job } from "../types/type";

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

export const getJobs = async () => {
  // 1. Read total number of jobs
  const jobCount = await readContract(config, {
    abi: SMART_CONTRACT_ABI,
    address: SMART_CONTRACT_ADDRESS,
    functionName: "jobCount",
  });

  const total = Number(jobCount);

  if (total === 0) return [];

  // 2. Fetch each job by index
  const jobs = await Promise.all(
    Array.from({ length: total }).map(async (_, i) => {
      const j = (await readContract(config, {
        abi: SMART_CONTRACT_ABI,
        address: SMART_CONTRACT_ADDRESS,
        functionName: "jobs",
        args: [i + 1], // jobs start from ID=1
      })) as [string, string, bigint, string, string, boolean, boolean];
      // 🔥 Convert tuple → object
      const job: Job = {
        id: i + 1,
        poster: j[0],
        worker: j[1],
        amount: formatEther(j[2]),
        metadataCID: j[3],
        submissionCID: j[4],
        isFunded: j[5],
        isCompleted: j[6],
        status:
          j[3] && j[4] && j[6]
            ? "Completed"
            : j[3] && j[4]
            ? "Submitted"
            : "Funded",
      };

      return job;
    })
  );

  return jobs;
};

export const submitWorkForAJob = async (
  jobId: number,
  submissionCID: string
) => {
  const txHash = await writeContract(config, {
    abi: SMART_CONTRACT_ABI,
    address: SMART_CONTRACT_ADDRESS,
    functionName: "submitWork",
    args: [jobId, submissionCID],
  });

  const receipt = await waitForTransactionReceipt(config, {
    hash: txHash,
  });

  return { txHash, receipt };
};

export const releaseFundsForAJob = async (jobId: number) => {
  const txHash = await writeContract(config, {
    abi: SMART_CONTRACT_ABI,
    address: SMART_CONTRACT_ADDRESS,
    functionName: "releaseFunds",
    args: [jobId],
  });

  const receipt = await waitForTransactionReceipt(config, {
    hash: txHash,
  });

  return { txHash, receipt };
};
