export const JobStatus = {
  SUBMITTED: "Submitted",
  FUNDED: "Funded",
  COMPLETED: "Completed",
} as const;

export type JobStatus = (typeof JobStatus)[keyof typeof JobStatus];

export type Job = {
  id: number;
  poster: string;
  worker?: string;
  amount: string;
  metadataCID: string;
  submissionCID?: string;
  isFunded: boolean;
  isCompleted: boolean;
  status: JobStatus;
};

export const statusColors: Record<JobStatus, string> = {
  Funded: "bg-emerald-600/20 text-emerald-400 border-emerald-600/50",
  Submitted: "bg-yellow-600/20 text-yellow-400 border-yellow-600/50",
  Completed: "bg-blue-600/20 text-blue-400 border-blue-600/50",
};

export type pinataUploadFileAPIrepsonseType = {
  data: {
    id: string;
    name: string;
    cid: string;
    size: number;
    number_of_files: number;
    mime_type: string;
    group_id: null;
  };
};
