import { useState } from "react";
import { JobStatus } from "../../types/type";

interface JobFiltersProps {
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  status: Set<string>;
  minAmount: number | null;
  maxAmount: number | null;
}

export default function JobFilters({ onFilterChange }: JobFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    status: new Set(),
    minAmount: null,
    maxAmount: null,
  });
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");

  const handleStatusChange = (status: string) => {
    const newStatuses = new Set(filters.status);
    if (newStatuses.has(status)) {
      newStatuses.delete(status);
    } else {
      newStatuses.add(status);
    }
    const updatedFilters = { ...filters, status: newStatuses };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleMinAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinAmount(value);
    const numValue = value ? parseFloat(value) : null;
    const updatedFilters = { ...filters, minAmount: numValue };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleMaxAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaxAmount(value);
    const numValue = value ? parseFloat(value) : null;
    const updatedFilters = { ...filters, maxAmount: numValue };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const resetFilters = () => {
    const resetState: FilterState = {
      status: new Set(),
      minAmount: null,
      maxAmount: null,
    };
    setFilters(resetState);
    setMinAmount("");
    setMaxAmount("");
    onFilterChange(resetState);
  };

  return (
    <aside className="w-full md:w-64 p-6 rounded-xl mb-6 md:mb-0 md:mr-6 border border-gray-700 bg-gray-800/50 sticky top-6 h-fit">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Filters</h3>
        <button
          onClick={resetFilters}
          className="text-sm px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-gray-300 transition-colors"
        >
          Reset
        </button>
      </div>

      <div className="flex flex-col space-y-8">
        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Status
          </label>
          <div className="space-y-2">
            {[JobStatus.FUNDED, JobStatus.COMPLETED, JobStatus.SUBMITTED].map(
              (status) => (
                <label
                  key={status}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={filters.status.has(status)}
                    onChange={() => handleStatusChange(status)}
                    className="w-4 h-4 rounded border-gray-600 bg-gray-700 cursor-pointer"
                  />
                  <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                    {status}
                  </span>
                </label>
              )
            )}
          </div>
        </div>

        {/* Min Amount Filter */}
        <div>
          <label
            htmlFor="min-amount"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Min Amount (ETH)
          </label>
          <input
            id="min-amount"
            type="number"
            step="0.001"
            min="0"
            value={minAmount}
            onChange={handleMinAmountChange}
            placeholder="0.000"
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        {/* Max Amount Filter */}
        <div>
          <label
            htmlFor="max-amount"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Max Amount (ETH)
          </label>
          <input
            id="max-amount"
            type="number"
            step="0.001"
            min="0"
            value={maxAmount}
            onChange={handleMaxAmountChange}
            placeholder="0.000"
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>
      </div>
    </aside>
  );
}
