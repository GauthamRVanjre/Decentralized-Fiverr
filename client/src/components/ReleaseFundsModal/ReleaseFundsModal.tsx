import React, { useState } from "react";
import { useTransactionToast } from "../../context/TransactionToastContext";

interface ReleaseFundsModalProps {
  open: boolean;
  onClose: () => void;
  jobId: string;
  jobTitle?: string;
  amount?: string;
  workerAddress?: string;
}

const ReleaseFundsModal: React.FC<ReleaseFundsModalProps> = ({
  open,
  onClose,
  jobId,
  jobTitle = "Job",
  amount = "0 ETH",
  workerAddress = "0x...",
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { showToast } = useTransactionToast();

  // Release funds to worker (simulated). Replace with real contract call using wagmi/ethers.
  const releaseFunds = async (): Promise<string> => {
    // simulate tx
    return new Promise((res) => setTimeout(() => res(generateFakeTx()), 1200));
  };

  const handleConfirm = async () => {
    setError("");
    setLoading(true);
    try {
      showToast({ status: "pending", message: "Releasing funds..." });
      const tx = await releaseFunds();
      showToast({ status: "success", txHash: tx, message: "Funds released" });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1500);
    } catch (err) {
      showToast({ status: "error", message: "Failed to release funds" });
      setError("Failed to release funds. Please try again.");
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
      <div className="bg-zinc-900 rounded-xl shadow-lg p-0 max-w-md w-full relative border border-zinc-800">
        <button
          className="absolute top-2 right-2 text-zinc-400 hover:text-white text-2xl font-bold"
          onClick={onClose}
          aria-label="Close"
          disabled={loading || success}
        >
          ×
        </button>

        <div className="p-6 flex flex-col gap-4">
          <h2 className="text-xl font-bold text-white mb-2">Release Funds</h2>

          {success ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-center">
                <div className="text-emerald-500 text-4xl mb-2">✓</div>
                <p className="text-emerald-400 font-semibold">
                  Funds Released Successfully!
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Job Summary */}
              <div className="bg-zinc-800 rounded-lg p-4 space-y-3">
                <div>
                  <p className="text-zinc-400 text-xs mb-1">Job Title</p>
                  <p className="text-white font-semibold">{jobTitle}</p>
                </div>

                <div>
                  <p className="text-zinc-400 text-xs mb-1">Job ID</p>
                  <p className="text-emerald-400 font-mono text-sm">{jobId}</p>
                </div>

                <div>
                  <p className="text-zinc-400 text-xs mb-1">
                    Amount to Release
                  </p>
                  <p className="text-white font-semibold text-lg">{amount}</p>
                </div>

                <div>
                  <p className="text-zinc-400 text-xs mb-1">Worker Address</p>
                  <p className="text-emerald-400 font-mono text-xs break-all">
                    {workerAddress}
                  </p>
                </div>
              </div>

              {/* Warning */}
              <div className="bg-yellow-900 bg-opacity-30 border border-yellow-700 rounded px-3 py-2 text-yellow-200 text-sm">
                ⚠️ This action cannot be undone. Confirm you want to release
                funds to the worker.
              </div>

              {/* Error */}
              {error && <div className="text-red-400 text-sm">{error}</div>}

              {/* Buttons */}
              <div className="flex gap-2 mt-2">
                <button
                  className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 rounded-lg transition disabled:opacity-50"
                  onClick={onClose}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 rounded-lg transition disabled:opacity-50"
                  onClick={handleConfirm}
                  disabled={loading}
                >
                  {loading ? "Releasing..." : "Confirm Release"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReleaseFundsModal;
