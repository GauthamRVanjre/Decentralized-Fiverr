import React, { useState } from "react";
import PinataUploadButton from "../PinataUploadButton/PinataUploadButton";
import { useTransactionToast } from "../../context/TransactionToastContext";

interface SubmitWorkModalProps {
  open: boolean;
  onClose: () => void;
  jobId: string;
}

const SubmitWorkModal: React.FC<SubmitWorkModalProps> = ({
  open,
  onClose,
  jobId,
}) => {
  const [fileCid, setFileCid] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { showToast } = useTransactionToast();

  // Submit work to contract (simulated). Replace with real contract call using wagmi/ethers.
  const submitWork = async (jobId: string, cid: string): Promise<string> => {
    console.log("submitWork", jobId, cid);
    // simulate tx hash
    return new Promise((res) => setTimeout(() => res(generateFakeTx()), 1200));
  };

  const onUploadComplete = (cid: string) => {
    setFileCid(cid);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!fileCid) {
      setError("Please upload a file first.");
      return;
    }
    setLoading(true);
    try {
      showToast({ status: "pending", message: "Submitting work..." });
      const tx = await submitWork(jobId, fileCid);
      showToast({ status: "success", txHash: tx, message: "Work submitted" });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setFileCid("");
        onClose();
      }, 1500);
    } catch (err) {
      showToast({ status: "error", message: "Failed to submit work" });
      setError("Failed to submit work.");
    }
    setLoading(false);
  };

  const generateFakeTx = () => {
    const hex = Array.from({ length: 64 })
      .map(() => Math.floor(Math.random() * 16).toString(16))
      .join("");
    return `0x${hex}`;
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-zinc-900 rounded-xl shadow-lg p-0 max-w-lg w-full relative">
        <button
          className="absolute top-2 right-2 text-zinc-400 hover:text-white text-2xl font-bold"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <form
          onSubmit={handleSubmit}
          className="p-6 flex flex-col gap-4 border border-zinc-800 rounded-xl"
        >
          <h2 className="text-xl font-bold text-white mb-2">Submit Work</h2>

          {success ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-center">
                <div className="text-emerald-500 text-4xl mb-2">✓</div>
                <p className="text-emerald-400 font-semibold">
                  Work Submitted Successfully!
                </p>
              </div>
            </div>
          ) : (
            <>
              <div>
                <PinataUploadButton
                  onUploadComplete={onUploadComplete}
                  buttonText={fileCid ? "Uploaded" : "Upload File"}
                  disabled={loading}
                />
              </div>

              {fileCid && (
                <div className="bg-zinc-800 rounded px-3 py-2 text-sm text-zinc-300">
                  <span className="text-zinc-400">CID: </span>
                  <span className="text-emerald-400 font-mono break-all">
                    {fileCid}
                  </span>
                </div>
              )}

              {error && <div className="text-red-400 text-sm">{error}</div>}

              <button
                type="submit"
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 rounded-full mt-2 disabled:opacity-50"
                disabled={loading || !fileCid}
              >
                {loading ? "Submitting..." : "Submit Work"}
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default SubmitWorkModal;
