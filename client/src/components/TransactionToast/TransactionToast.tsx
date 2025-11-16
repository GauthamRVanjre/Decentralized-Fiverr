import React, { useEffect } from "react";

type TxStatus = "pending" | "success" | "error" | null;

interface TransactionToastProps {
  status: TxStatus;
  txHash?: string;
  message?: string;
  onClose?: () => void;
  autoHideDuration?: number; // ms, default 5000
  chain?: "sepolia" | "mainnet" | string;
}

const explorerBase = (chain: string | undefined) => {
  switch ((chain || "sepolia").toLowerCase()) {
    case "mainnet":
      return "https://etherscan.io/tx/";
    case "sepolia":
    default:
      return "https://sepolia.etherscan.io/tx/";
  }
};

const TransactionToast: React.FC<TransactionToastProps> = ({
  status,
  txHash,
  message,
  onClose,
  autoHideDuration = 5000,
  chain = "sepolia",
}) => {
  useEffect(() => {
    if (!status) return;

    // Auto-hide when status is success or error
    if (status === "success" || status === "error") {
      const t = setTimeout(() => {
        onClose && onClose();
      }, autoHideDuration);
      return () => clearTimeout(t);
    }

    // don't auto-close when pending
    return;
  }, [status, autoHideDuration, onClose]);

  if (!status) return null;

  const base = explorerBase(chain as string);

  const icon =
    status === "pending" ? (
      <svg
        className="animate-spin h-6 w-6 text-emerald-300"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
    ) : status === "success" ? (
      <svg
        className="h-6 w-6 text-emerald-300"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <path
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 13l4 4L19 7"
        />
      </svg>
    ) : (
      <svg
        className="h-6 w-6 text-red-400"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <path
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    );

  const title =
    status === "pending"
      ? "Transaction pending"
      : status === "success"
      ? "Transaction successful"
      : "Transaction failed";

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="max-w-sm w-full bg-zinc-900 border border-zinc-800 rounded-lg shadow-lg overflow-hidden transform transition-all duration-200 ease-out">
        <div className="p-3 flex items-start gap-3">
          <div className="flex-shrink-0">{icon}</div>
          <div className="flex-1">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-sm font-semibold text-white">{title}</div>
                {message && (
                  <div className="text-xs text-zinc-400">{message}</div>
                )}
              </div>
              <div className="flex items-center gap-2">
                {txHash && (
                  <a
                    href={`${base}${txHash}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-300 text-xs hover:underline"
                  >
                    View
                  </a>
                )}
                <button
                  onClick={() => onClose && onClose()}
                  aria-label="Close"
                  className="text-zinc-400 hover:text-white"
                >
                  ×
                </button>
              </div>
            </div>
            {status === "pending" && (
              <div className="mt-3 h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 animate-[progress_5s_linear_infinite]"
                  style={{ width: "30%" }}
                />
              </div>
            )}
          </div>
        </div>

        <style>{`
          @keyframes progress {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          .animate-\[progress_5s_linear_infinite\] { animation: progress 5s linear infinite; }
        `}</style>
      </div>
    </div>
  );
};

export default TransactionToast;
