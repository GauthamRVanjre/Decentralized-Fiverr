import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Navbar from "./Navbar";

describe("Navbar", () => {
  it("renders title and default connect button", () => {
    render(<Navbar />);
    expect(screen.getByText("DecentraFiverr")).toBeInTheDocument();
    expect(screen.getByText("Connect Wallet")).toBeInTheDocument();
  });

  it("renders custom WalletButton and rightSlot", () => {
    const customWallet = <button>My Wallet</button>;
    const rightSlot = <div data-testid="ticker">1 ETH = $3,000</div>;

    render(<Navbar WalletButton={customWallet} rightSlot={rightSlot} />);

    expect(screen.getByText("My Wallet")).toBeInTheDocument();
    expect(screen.getByTestId("ticker")).toHaveTextContent("1 ETH = $3,000");
  });
});
