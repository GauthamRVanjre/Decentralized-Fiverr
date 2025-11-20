import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { sepolia } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "Coffee Ordering App",
  projectId: import.meta.env.VITE_RAINBOWKIT_PROJECT_ID,
  chains: [sepolia],
});
