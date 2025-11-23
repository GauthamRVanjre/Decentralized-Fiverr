import { useState } from "react";
import { statusColors, type Job } from "../../types/type";
import SubmitWorkModal from "../SubmitWorkModal/SubmitWorkModal";
import ReleaseFundsModal from "../ReleaseFundsModal/ReleaseFundsModal";
import useCurrentUser from "../../hooks/useCurrentUser";
import { useTransactionToast } from "../../context/TransactionToastContext";

export type JobCardProps = {
  job: Job;
};

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const { address, isAdmin } = useCurrentUser();
  const [modalOpen, setModalOpen] = useState(false);
  const { showToast } = useTransactionToast();

  const handleClick = () => {
    // open the appropriate modal depending on whether the logged-in address is admin
    if (!address) {
      showToast({ status: "error", message: "Please connect wallet" });
      return;
    }
    setModalOpen(true);
  };

  return (
    <>
      <div
        key={job.id}
        className="bg-gray-900 border border-gray-800 rounded-xl p-4 max-h-50 flex flex-col justify-between shadow-md hover:shadow-lg transition-shadow"
      >
        {/* Header */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-slate-200 font-semibold">Job #{job.id}</span>
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
          <div className="font-mono text-slate-100">{job.amount} ETH</div>
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
            onClick={handleClick}
            className="text-xs bg-slate-800 hover:bg-slate-700 border border-slate-700 px-3 py-1 rounded-md text-slate-200 transition"
          >
            {isAdmin ? "Release Funds" : "Submit Work"}
          </button>
        </div>
      </div>
      {isAdmin ? (
        <ReleaseFundsModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          jobId={job.id.toString()}
          jobTitle={`Job #${job.id}`}
          amount={`${job.amount} ETH`}
          workerAddress={job.worker || "-"}
        />
      ) : (
        <SubmitWorkModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          jobId={job.id.toString()}
        />
      )}
    </>
  );
};

export default JobCard;
