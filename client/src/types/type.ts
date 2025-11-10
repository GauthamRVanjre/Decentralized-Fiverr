export const JobStatus = {
  SUBMITTED: "Submitted",
  FUNDED: "Funded",
  COMPLETED: "Completed",
} as const;

export type JobStatus = (typeof JobStatus)[keyof typeof JobStatus];

export const sampleJobs = [
  {
    id: 1,
    poster: "0x1234abcd5678ef...",
    amountEth: "0.005",
    metadataCID: "QmPinataCID1",
    status: JobStatus.FUNDED,
  },
  {
    id: 2,
    poster: "0x9876fedc4321...",
    amountEth: "0.01",
    metadataCID: "QmPinataCID2",
    status: JobStatus.COMPLETED,
    worker: "0x3333abcd4444...",
  },
];
