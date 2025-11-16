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
  {
    id: 3,
    poster: "0xabcdef123456...",
    amountEth: "0.015",
    metadataCID: "QmPinataCID3",
    status: JobStatus.FUNDED,
  },
  {
    id: 4,
    poster: "0x5555cccc6666...",
    amountEth: "0.02",
    metadataCID: "QmPinataCID4",
    status: JobStatus.COMPLETED,
    worker: "0x7777dddd8888...",
  },
  {
    id: 5,
    poster: "0xaaaa1111bbbb...",
    amountEth: "0.008",
    metadataCID: "QmPinataCID5",
    status: JobStatus.FUNDED,
  },
  {
    id: 6,
    poster: "0xeeee2222ffff...",
    amountEth: "0.025",
    metadataCID: "QmPinataCID6",
    status: JobStatus.COMPLETED,
    worker: "0x9999eeee0000...",
  },
  // Additional jobs for demo
  {
    id: 7,
    poster: "0x1111aaaa2222...",
    amountEth: "0.012",
    metadataCID: "QmPinataCID7",
    status: JobStatus.SUBMITTED,
  },
  {
    id: 8,
    poster: "0x2222bbbb3333...",
    amountEth: "0.018",
    metadataCID: "QmPinataCID8",
    status: JobStatus.FUNDED,
  },
  {
    id: 9,
    poster: "0x3333cccc4444...",
    amountEth: "0.03",
    metadataCID: "QmPinataCID9",
    status: JobStatus.COMPLETED,
    worker: "0x4444dddd5555...",
  },
  {
    id: 10,
    poster: "0x4444dddd5555...",
    amountEth: "0.007",
    metadataCID: "QmPinataCID10",
    status: JobStatus.SUBMITTED,
  },
  {
    id: 11,
    poster: "0x5555eeee6666...",
    amountEth: "0.022",
    metadataCID: "QmPinataCID11",
    status: JobStatus.FUNDED,
  },
  {
    id: 12,
    poster: "0x6666ffff7777...",
    amountEth: "0.017",
    metadataCID: "QmPinataCID12",
    status: JobStatus.COMPLETED,
    worker: "0x7777aaaa8888...",
  },
];

export type Job = {
  id: number;
  poster: string;
  amountEth: string;
  metadataCID: string;
  worker?: string;
  status: JobStatus;
};

export const statusColors: Record<JobStatus, string> = {
  Funded: "bg-emerald-600/20 text-emerald-400 border-emerald-600/50",
  Submitted: "bg-yellow-600/20 text-yellow-400 border-yellow-600/50",
  Completed: "bg-blue-600/20 text-blue-400 border-blue-600/50",
};
