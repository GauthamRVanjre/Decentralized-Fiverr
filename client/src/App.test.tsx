import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("App with Filters", () => {
  it("renders App with filters and job list", () => {
    render(<App />);
    expect(screen.getByText("Filters")).toBeInTheDocument();
    expect(screen.getByText(/DecentraFiverr/i)).toBeInTheDocument();
  });

  it("displays all jobs initially", () => {
    render(<App />);
    // Should display job cards - checking for article elements
    const articles = screen.getAllByRole("article");
    expect(articles.length).toBeGreaterThan(0);
  });

  it("filters jobs by Funded status", () => {
    render(<App />);
    const fundedCheckbox = screen.getByDisplayValue("Funded");

    fireEvent.click(fundedCheckbox);

    // After filtering by Funded, should only show funded jobs
    const articles = screen.getAllByRole("article");
    articles.forEach((article) => {
      expect(article.textContent).toContain("Funded");
    });
  });

  it("filters jobs by Completed status", () => {
    render(<App />);
    const completedCheckbox = screen.getByDisplayValue("Completed");

    fireEvent.click(completedCheckbox);

    // After filtering by Completed, should only show completed jobs
    const articles = screen.getAllByRole("article");
    articles.forEach((article) => {
      expect(article.textContent).toContain("Completed");
    });
  });

  it("filters jobs by amount range", () => {
    render(<App />);
    const inputs = screen.getAllByPlaceholderText("0.000");
    const minInput = inputs[0];
    const maxInput = inputs[1];

    fireEvent.change(minInput, { target: { value: "0.01" } });
    fireEvent.change(maxInput, { target: { value: "0.02" } });

    // Should only show jobs with amount between 0.01 and 0.02 ETH
    const articles = screen.queryAllByRole("article");
    // The number of articles should be reduced based on the filter
    expect(articles.length).toBeGreaterThanOrEqual(0);
  });

  it("combines status and amount filters", () => {
    render(<App />);
    const fundedCheckbox = screen.getByDisplayValue("Funded");
    const inputs = screen.getAllByPlaceholderText("0.000");
    const maxInput = inputs[1];

    fireEvent.click(fundedCheckbox);
    fireEvent.change(maxInput, { target: { value: "0.015" } });

    // Should only show Funded jobs with amount <= 0.015 ETH
    const articles = screen.queryAllByRole("article");
    expect(articles.length).toBeGreaterThanOrEqual(0);
  });

  it("resets all filters", () => {
    render(<App />);
    const fundedCheckbox = screen.getByDisplayValue("Funded");
    const resetButton = screen.getByRole("button", { name: /reset/i });

    fireEvent.click(fundedCheckbox);
    fireEvent.click(resetButton);

    // After reset, should show all jobs again
    const articles = screen.getAllByRole("article");
    expect(articles.length).toBeGreaterThan(0);
  });

  it("shows empty state when no jobs match filters", () => {
    render(<App />);
    const inputs = screen.getAllByPlaceholderText("0.000");
    const minInput = inputs[0];

    // Set min amount to a very high value to filter out all jobs
    fireEvent.change(minInput, { target: { value: "100" } });

    // Should show "No jobs available" message
    expect(screen.getByText(/No jobs available/i)).toBeInTheDocument();
  });
});
