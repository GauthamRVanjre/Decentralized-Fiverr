import { useState } from "react";
import { useGetJobs } from "../../hooks/useGetJobs";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";
import type { FilterState } from "../JobFilters/JobFilters";
import JobFilters from "../JobFilters/JobFilters";
import JobsList from "./JobsList";

const JobsPage = () => {
  const { data: jobs, isLoading, isError } = useGetJobs();
  // keep hooks stable across renders: declare local state hooks before any early returns
  const [filters, setFilters] = useState<FilterState>({
    status: new Set(),
    minAmount: null,
    maxAmount: null,
  });

  console.log("jobs", jobs);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Error message="Error fetching Jobs" />;
  }

  if (!jobs || !jobs.length) {
    return (
      <div className="text-center text-slate-400 py-20">
        No jobs found for this filter
      </div>
    );
  }

  const filteredJobs = jobs.filter((job) => {
    // Filter by status
    if (filters.status.size > 0 && !filters.status.has(job.status)) {
      return false;
    }

    // Filter by amount
    const amount = parseFloat(job.amount);
    if (filters.minAmount !== null && amount < filters.minAmount) {
      return false;
    }
    if (filters.maxAmount !== null && amount > filters.maxAmount) {
      return false;
    }

    return true;
  });
  return (
    <div className="min-h-screen bg-gray-950 text-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-start gap-0 md:gap-8">
          <JobFilters onFilterChange={setFilters} />
          <main className="flex-1">
            <JobsList jobs={filteredJobs} />
          </main>
        </div>
      </div>
    </div>
  );
};

export default JobsPage;
