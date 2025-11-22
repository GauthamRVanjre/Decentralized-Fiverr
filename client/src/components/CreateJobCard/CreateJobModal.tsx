import React, { useEffect, useState } from "react";
import PinataUploadButton from "../PinataUploadButton/PinataUploadButton";
import { useTransactionToast } from "../../context/TransactionToastContext";
import { useEthtoUsd } from "../../hooks/useUsdtoEth";
import useDebounce from "../../hooks/useDebounce";

interface CreateJobModalProps {
  open: boolean;
  onClose: () => void;
}

const CreateJobModal: React.FC<CreateJobModalProps> = ({ open, onClose }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [fileCid, setFileCid] = useState("");
  const [usdAmount, setUsdAmount] = useState<number>(0);
  const [ethAmount, setEthAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { showToast } = useTransactionToast();
  // debounce USD amount to avoid firing API calls on every keystroke
  const debouncedUsd = useDebounce<number>(usdAmount, 2000);

  const {
    data: ETHprice,
    isLoading: ETHloading,
    isError: ETHerror,
  } = useEthtoUsd(debouncedUsd);

  useEffect(() => {
    if (
      ETHprice !== undefined &&
      ETHprice !== null &&
      !ETHloading &&
      !ETHerror
    ) {
      setEthAmount(Number(ETHprice).toFixed(6));
    } else {
      setEthAmount("");
    }
  }, [ETHprice]);

  const onUploadComplete = (cid: string) => {
    setFileCid(cid);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name || !description || !usdAmount || !fileCid || !ethAmount) {
      setError("All fields are required and file must be uploaded.");
      return;
    }
    setLoading(true);

    try {
      // show pending toast
      showToast({ status: "pending", message: "Creating job on-chain..." });

      // simulate createJob tx — replace with real contract call
      const fakeTx = await new Promise<string>((res) =>
        setTimeout(() => res(generateFakeTx()), 1400)
      );

      // success
      showToast({ status: "success", txHash: fakeTx, message: "Job created" });
      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
        setName("");
        setDescription("");
        setFileCid("");
        setUsdAmount(0);
        setEthAmount("");
        onClose();
      }, 1500);
    } catch (err) {
      showToast({ status: "error", message: "Failed to create job" });
      setError("Failed to create job.");
    }
    setLoading(false);
  };

  // helper: generate fake tx hash
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
          <h2 className="text-xl font-bold text-white mb-2">Create New Job</h2>
          {success ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-center">
                <div className="text-emerald-500 text-4xl mb-2">✓</div>
                <p className="text-emerald-400 font-semibold">
                  Job created successfully
                </p>
              </div>
            </div>
          ) : (
            <>
              <input
                className="bg-zinc-800 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Job Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <textarea
                className="bg-zinc-800 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
              <div>
                <PinataUploadButton
                  onUploadComplete={onUploadComplete}
                  buttonText={fileCid ? "Uploaded" : "Upload File"}
                  disabled={loading}
                />
              </div>
              <input
                className="bg-zinc-800 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="USD Amount"
                type="number"
                min={0}
                value={usdAmount}
                onChange={(e) => setUsdAmount(Number(e.target.value))}
                required
              />
              <div className="flex items-center gap-2">
                <span className="text-zinc-300 text-sm">Equivalent ETH:</span>
                <span className="text-emerald-400 font-mono">{ethAmount}</span>
              </div>

              {error && <div className="text-red-400 text-sm">{error}</div>}
              <button
                type="submit"
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 rounded-full mt-2 disabled:opacity-50"
                disabled={loading || !fileCid}
              >
                {loading ? "Creating..." : "Create & Fund Job"}
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateJobModal;
