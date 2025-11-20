import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import JobFilters, { type FilterState } from "./JobFilters";
import { JobStatus } from "../../types/type";

describe("JobFilters", () => {
  const mockOnFilterChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders filter component with all sections", () => {
    render(<JobFilters onFilterChange={mockOnFilterChange} />);
    expect(screen.getByText("Filters")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Min Amount (ETH)")).toBeInTheDocument();
    expect(screen.getByText("Max Amount (ETH)")).toBeInTheDocument();
  });

  it("renders status checkboxes for Funded and Completed", () => {
    render(<JobFilters onFilterChange={mockOnFilterChange} />);
    expect(screen.getByDisplayValue(JobStatus.FUNDED)).toBeInTheDocument();
    expect(screen.getByDisplayValue(JobStatus.COMPLETED)).toBeInTheDocument();
  });

  it("calls onFilterChange when status checkbox is toggled", () => {
    render(<JobFilters onFilterChange={mockOnFilterChange} />);
    const fundedCheckbox = screen.getByDisplayValue(
      JobStatus.FUNDED
    ) as HTMLInputElement;

    fireEvent.click(fundedCheckbox);

    expect(mockOnFilterChange).toHaveBeenCalled();
    const filterState: FilterState = mockOnFilterChange.mock.calls[0][0];
    expect(filterState.status.has(JobStatus.FUNDED)).toBe(true);
  });

  it("allows multiple status selections", () => {
    render(<JobFilters onFilterChange={mockOnFilterChange} />);
    const fundedCheckbox = screen.getByDisplayValue(JobStatus.FUNDED);
    const completedCheckbox = screen.getByDisplayValue(JobStatus.COMPLETED);

    fireEvent.click(fundedCheckbox);
    fireEvent.click(completedCheckbox);

    expect(mockOnFilterChange).toHaveBeenCalledTimes(2);
    const lastCall: FilterState = mockOnFilterChange.mock.calls[1][0];
    expect(lastCall.status.has(JobStatus.FUNDED)).toBe(true);
    expect(lastCall.status.has(JobStatus.COMPLETED)).toBe(true);
  });

  it("updates minAmount filter", () => {
    render(<JobFilters onFilterChange={mockOnFilterChange} />);
    const inputs = screen.getAllByPlaceholderText("0.000");
    fireEvent.change(inputs[0], { target: { value: "0.5" } });

    expect(mockOnFilterChange).toHaveBeenCalled();
    const filterState: FilterState = mockOnFilterChange.mock.calls[0][0];
    expect(filterState.minAmount).toBe(0.5);
  });

  it("updates maxAmount filter", () => {
    render(<JobFilters onFilterChange={mockOnFilterChange} />);
    const inputs = screen.getAllByPlaceholderText("0.000");
    fireEvent.change(inputs[1], { target: { value: "2.0" } });

    expect(mockOnFilterChange).toHaveBeenCalled();
    const filterState: FilterState = mockOnFilterChange.mock.calls[0][0];
    expect(filterState.maxAmount).toBe(2.0);
  });

  it("resets all filters when Reset button is clicked", () => {
    render(<JobFilters onFilterChange={mockOnFilterChange} />);
    const fundedCheckbox = screen.getByDisplayValue(JobStatus.FUNDED);
    const minInput = screen.getAllByPlaceholderText("0.000")[0];
    const maxInput = screen.getAllByPlaceholderText("0.000")[1];

    // Set filters
    fireEvent.click(fundedCheckbox);
    fireEvent.change(minInput, { target: { value: "0.5" } });
    fireEvent.change(maxInput, { target: { value: "2.0" } });

    // Reset
    const resetButton = screen.getByRole("button", { name: /reset/i });
    fireEvent.click(resetButton);

    expect(mockOnFilterChange).toHaveBeenCalled();
    const lastCall: FilterState =
      mockOnFilterChange.mock.calls[
        mockOnFilterChange.mock.calls.length - 1
      ][0];
    expect(lastCall.status.size).toBe(0);
    expect(lastCall.minAmount).toBeNull();
    expect(lastCall.maxAmount).toBeNull();
  });

  it("deselects status when clicking same checkbox again", () => {
    render(<JobFilters onFilterChange={mockOnFilterChange} />);
    const fundedCheckbox = screen.getByDisplayValue(JobStatus.FUNDED);

    fireEvent.click(fundedCheckbox);
    fireEvent.click(fundedCheckbox);

    expect(mockOnFilterChange).toHaveBeenCalledTimes(2);
    const lastCall: FilterState = mockOnFilterChange.mock.calls[1][0];
    expect(lastCall.status.has(JobStatus.FUNDED)).toBe(false);
  });

  it("accepts decimal values for amount filters", () => {
    render(<JobFilters onFilterChange={mockOnFilterChange} />);
    const minInput = screen.getAllByPlaceholderText("0.000")[0];

    fireEvent.change(minInput, { target: { value: "0.123" } });

    expect(mockOnFilterChange).toHaveBeenCalled();
    const filterState: FilterState = mockOnFilterChange.mock.calls[0][0];
    expect(filterState.minAmount).toBe(0.123);
  });

  it("clears amount filters when input is emptied", () => {
    render(<JobFilters onFilterChange={mockOnFilterChange} />);
    const minInput = screen.getAllByPlaceholderText("0.000")[0];

    fireEvent.change(minInput, { target: { value: "0.5" } });
    fireEvent.change(minInput, { target: { value: "" } });

    expect(mockOnFilterChange).toHaveBeenCalledTimes(2);
    const lastCall: FilterState = mockOnFilterChange.mock.calls[1][0];
    expect(lastCall.minAmount).toBeNull();
  });
});
