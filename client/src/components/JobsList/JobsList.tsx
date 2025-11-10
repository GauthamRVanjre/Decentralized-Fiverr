import React from "react";

type JobStatus = "Funded" | "Submitted" | "Completed";

export type Job = {
  id: number;
  poster: string;
  amountEth: string;
  metadataCID: string;
  worker?: string;
  status: JobStatus;
};

export type JobsListProps = {
  jobs: Job[];
  onViewDetails?: (job: Job) => void;
};

const statusColors: Record<JobStatus, string> = {
  Funded: "bg-emerald-600/20 text-emerald-400 border-emerald-600/50",
  Submitted: "bg-yellow-600/20 text-yellow-400 border-yellow-600/50",
  Completed: "bg-blue-600/20 text-blue-400 border-blue-600/50",
};

export const JobsList: React.FC<JobsListProps> = ({ jobs, onViewDetails }) => {
  if (!jobs.length) {
    return (
      <div className="text-center text-slate-400 py-20">
        No jobs found. Create one to get started 💼
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 bg-gray-950 min-h-screen">
      {jobs.map((job) => (
        <div
          key={job.id}
          className="bg-gray-900 border border-gray-800 rounded-xl p-4 max-h-50 flex flex-col justify-between shadow-md hover:shadow-lg transition-shadow"
        >
          {/* Header */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-slate-200 font-semibold">
                Job #{job.id}
              </span>
              <span
                className={`text-xs border px-2 py-0.5 rounded-full ${
                  statusColors[job.status]
                }`}
              >
                {job.status}
              </span>
            </div>

            <div className="text-xs text-slate-500">
              Poster: {job.poster.slice(0, 6)}...{job.poster.slice(-4)}
            </div>
            {job.worker && (
              <div className="text-xs text-slate-500">
                Worker: {job.worker.slice(0, 6)}...{job.worker.slice(-4)}
              </div>
            )}
          </div>

          {/* Amount */}
          <div className="my-4">
            <div className="text-slate-400 text-xs mb-1">Amount</div>
            <div className="font-mono text-slate-100">{job.amountEth} ETH</div>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center mt-auto">
            <a
              href={`https://gateway.pinata.cloud/ipfs/${job.metadataCID}`}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-emerald-400 hover:underline"
            >
              View Metadata
            </a>
            <button
              onClick={() => onViewDetails?.(job)}
              className="text-xs bg-slate-800 hover:bg-slate-700 border border-slate-700 px-3 py-1 rounded-md text-slate-200 transition"
            >
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobsList;
