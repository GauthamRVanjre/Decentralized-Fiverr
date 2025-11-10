// src/components/Navbar.tsx
import React from "react";

export type NavbarProps = {
  /**
   * Optional wallet element — pass RainbowKit's <ConnectButton /> or any custom button.
   * If not provided, a placeholder 'Connect Wallet' button is shown.
   */
  WalletButton?: React.ReactNode;
  /**
   * Optional small element to show to the left of the wallet button (e.g. price ticker)
   */
  rightSlot?: React.ReactNode;
};

export const Navbar: React.FC<NavbarProps> = ({ WalletButton, rightSlot }) => {
  return (
    <header className="w-full bg-gray-900 text-slate-100 border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          {/* Left: logo / title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-sm">
              {/* Simple logo: DF */}
              <span className="font-semibold text-sm text-black">DF</span>
            </div>
            <div>
              <div className="text-sm font-semibold">DecentraFiverr</div>
              <div className="text-xs text-slate-400">Escrow · Sepolia</div>
            </div>
          </div>

          {/* Right: optional ticker + wallet */}
          <div className="flex items-center gap-4">
            {rightSlot ? (
              <div className="hidden sm:flex items-center">{rightSlot}</div>
            ) : null}

            <div>
              {WalletButton ? (
                WalletButton
              ) : (
                <button
                  className="px-3 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-sm border border-slate-700"
                  type="button"
                >
                  Connect Wallet
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
