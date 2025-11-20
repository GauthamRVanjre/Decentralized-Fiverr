// Hook that provides the connected wallet address and an isAdmin flag.
// Uses wagmi's useAccount to read the current connected address from RainbowKit/wagmi.
import { useMemo } from "react";
import { useAccount } from "wagmi";

export function useCurrentUser() {
  const { address } = useAccount();

  // Admin address can be configured via env var VITE_ADMIN_ADDRESS. Fallback kept for dev.
  const adminAddress =
    (import.meta.env.VITE_ADMIN_ADDRESS as string) ||
    "0xAdmin000000000000000000000000000000000000";

  const isAdmin = useMemo(() => {
    if (!address) return false;
    try {
      return address.toLowerCase() === adminAddress.toLowerCase();
    } catch (e) {
      return false;
    }
  }, [address, adminAddress]);

  return { address, isAdmin, adminAddress };
}

export default useCurrentUser;
