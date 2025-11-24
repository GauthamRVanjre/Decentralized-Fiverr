import { useMutation } from "@tanstack/react-query";
import { createJob, type createJobParams } from "../requests/Jobs.requests";

export function useCreateJob() {
  return useMutation({
    mutationKey: ["jobs"],
    mutationFn: async ({ fileCid, ethAmount }: createJobParams) => {
      return createJob({ fileCid, ethAmount });
    },
  });
}
