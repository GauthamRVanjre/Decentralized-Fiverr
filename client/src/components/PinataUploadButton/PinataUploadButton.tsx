import React, { useRef, useState } from "react";

interface PinataUploadButtonProps {
  onUploadComplete: (cid: string) => void;
  uploadUrl?: string; // endpoint to POST the file to (server-side proxy recommended)
  buttonText?: string;
  accept?: string;
  disabled?: boolean;
  extraHeaders?: Record<string, string>;
}

const PinataUploadButton: React.FC<PinataUploadButtonProps> = ({
  onUploadComplete,
  uploadUrl = "/api/pinata/upload",
  buttonText = "Upload",
  accept = "*",
  disabled = false,
  extraHeaders,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [successCid, setSuccessCid] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filename, setFilename] = useState<string | null>(null);

  const openFilePicker = () => {
    if (disabled || uploading) return;
    inputRef.current?.click();
  };

  const handleFile = async (file: File | null) => {
    setError(null);
    setSuccessCid(null);
    setFilename(file ? file.name : null);
    if (!file) return;

    setUploading(true);
    try {
      const form = new FormData();
      form.append("file", file);

      //   const res = await fetch(uploadUrl, {
      //     method: "POST",
      //     body: form,
      //     headers: extraHeaders ?? undefined,
      //   });

      //   if (!res.ok) {
      //     const text = await res.text();
      //     throw new Error(text || `Upload failed with status ${res.status}`);
      //   }

      //   // Expect response JSON like: { cid: 'Qm...' }
      //   const data = await res.json();
      //   const cid = (data && (data.cid || data.IpfsHash || data.hash)) as
      //     | string
      //     | undefined;
      //   if (!cid) throw new Error("No CID returned from upload endpoint");

      setSuccessCid("Qm...");
      onUploadComplete("Qm...");
    } catch (err: any) {
      setError(err?.message ?? "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0] ? e.target.files[0] : null;
    await handleFile(file);
    // reset input so same file can be picked again if needed
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="flex flex-col items-start gap-2">
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={onChange}
        aria-hidden
      />

      <button
        type="button"
        onClick={openFilePicker}
        disabled={disabled || uploading}
        className={`inline-flex items-center gap-2 px-3 py-1 rounded-md font-semibold transition 
          ${
            disabled || uploading
              ? "bg-emerald-400/30 text-white cursor-not-allowed"
              : "bg-emerald-600 hover:bg-emerald-700 text-white"
          }`}
      >
        {uploading ? (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
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
        ) : successCid ? (
          <svg
            className="h-4 w-4 text-emerald-200"
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
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 5v14M5 12h14"
            />
          </svg>
        )}

        <span>{uploading ? "Uploading..." : buttonText}</span>
      </button>

      {filename && (
        <div className="text-xs text-zinc-300">
          {filename}{" "}
          {successCid && <span className="text-emerald-300">— Uploaded</span>}
        </div>
      )}

      {successCid && (
        <div className="bg-zinc-800 px-3 py-1 rounded text-sm text-emerald-300 font-mono break-all">
          {successCid}
        </div>
      )}

      {error && <div className="text-red-400 text-sm">{error}</div>}
    </div>
  );
};

export default PinataUploadButton;
