import { PINATA_FILE_UPLOAD_URL } from "../constants/constants";
import type { pinataUploadFileAPIrepsonseType } from "../types/type";

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("network", "public");

  const res = await fetch(PINATA_FILE_UPLOAD_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_JWT_SECRET_KEY}`,
    },
    body: formData,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Upload failed with status ${res.status}`);
  }

  // Expect response JSON like: { cid: 'Qm...' }
  const data: pinataUploadFileAPIrepsonseType = await res.json();
  const cid = data && data.data.cid;
  if (!cid) throw new Error("No CID returned from upload endpoint");
  return cid;
};

export const getFile = async (cid: string) => {
  const res = await fetch(
    `https://api.pinata.cloud/v3/files/public?cid=${cid}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_JWT_SECRET_KEY}`,
      },
    }
  );
  return res.json();
};
