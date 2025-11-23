import React from "react";
import JobCard from "../JobCard/JobCard";
import type { Job } from "../../types/type";

type JobsListProps = {
  jobs: Job[];
};

export const JobsList: React.FC<JobsListProps> = ({ jobs }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {jobs.map((job: Job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
};

export default JobsList;
