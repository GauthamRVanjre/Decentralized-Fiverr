import { useState } from "react";
import "./App.css";
import JobsList from "./components/JobsList/JobsList";
import Navbar from "./components/Navbar/Navbar";
import JobFilters, {
  type FilterState,
} from "./components/JobFilters/JobFilters";
import Loader from "./components/Loader/Loader";
import { useGetJobs } from "./hooks/useGetJobs";
import Error from "./components/Error/Error";

function App() {
  const { data: jobs, isLoading, isError } = useGetJobs();

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
  const [filters, setFilters] = useState<FilterState>({
    status: new Set(),
    minAmount: null,
    maxAmount: null,
  });

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
    <>
      <Navbar />
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
    </>
  );
}

export default App;
