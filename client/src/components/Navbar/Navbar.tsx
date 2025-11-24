import { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import PriceFeedTicker from "../PriceFeedTicker/PriceFeedTicker";
import CreateJobModal from "../CreateJobCard/CreateJobModal";
import useCurrentUser from "../../hooks/useCurrentUser";

export const Navbar = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { isAdmin } = useCurrentUser();
  return (
    <>
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
            <div className="flex items-center gap-4">
              <PriceFeedTicker />
              {isAdmin && (
                <button
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-1 rounded-full shadow transition"
                  onClick={() => setModalOpen(true)}
                >
                  Create Job
                </button>
              )}
              <ConnectButton />
            </div>
          </div>
        </div>
      </header>
      <CreateJobModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default Navbar;
