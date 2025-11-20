import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import JobsList, { type Job } from "./JobsList";

const mockJobs: Job[] = [
  {
    id: 1,
    poster: "0xAbC1234567890defABC1234567890defABC12345",
    amountEth: "0.01",
    metadataCID: "QmFakeCID1",
    status: "Funded",
  },
  {
    id: 2,
    poster: "0x9876543210abcdef9876543210abcdef98765432",
    amountEth: "0.02",
    metadataCID: "QmFakeCID2",
    worker: "0x456def789012abc345def789012abc345def7890",
    status: "Completed",
  },
];

describe("JobsList", () => {
  it("renders list of jobs", () => {
    render(<JobsList jobs={mockJobs} />);
    expect(screen.getByText(/Job #1/)).toBeInTheDocument();
    expect(screen.getByText(/Job #2/)).toBeInTheDocument();
  });

  it("shows empty message when no jobs", () => {
    render(<JobsList jobs={[]} />);
    expect(screen.getByText(/No jobs found/)).toBeInTheDocument();
  });

  it("calls onViewDetails when button clicked", () => {
    const onViewDetails = vi.fn();
    render(<JobsList jobs={mockJobs} onViewDetails={onViewDetails} />);
    fireEvent.click(screen.getAllByText("View Details")[0]);
    expect(onViewDetails).toHaveBeenCalledWith(mockJobs[0]);
  });
});
