import type { Theme } from "@rainbow-me/rainbowkit";

export const EmeraldTheme: Theme = {
  blurs: {
    modalOverlay: "opacity(0.6)",
  },
  colors: {
    // Brand accent colors
    accentColor: "rgba(16, 185, 129, 0.9)", // emerald-500
    accentColorForeground: "rgba(255, 255, 255, 0.95)",

    // Action buttons
    actionButtonBorder: "rgba(45, 212, 191, 0.4)", // teal-ish border
    actionButtonBorderMobile: "rgba(45, 212, 191, 0.3)",
    actionButtonSecondaryBackground: "rgba(30, 41, 59, 0.8)", // slate-800

    // Close button (top-right X)
    closeButton: "rgba(255, 255, 255, 0.8)",
    closeButtonBackground: "rgba(30, 41, 59, 0.8)", // slate-800

    // Connect button (on Navbar)
    connectButtonBackground: "rgba(17, 24, 39, 0.95)", // slate-900
    connectButtonBackgroundError: "rgba(220, 38, 38, 0.9)", // red-600
    connectButtonInnerBackground: "rgba(31, 41, 55, 0.95)", // slate-800
    connectButtonText: "rgba(236, 253, 245, 0.9)", // light emerald tone
    connectButtonTextError: "rgba(255, 230, 230, 0.95)",

    // Wallet connection indicator
    connectionIndicator: "rgba(16, 185, 129, 0.9)", // emerald-500

    // Download modal cards
    downloadBottomCardBackground: "rgba(31, 41, 55, 0.9)", // slate-800
    downloadTopCardBackground: "rgba(17, 24, 39, 0.9)", // slate-900

    // Errors
    error: "rgba(239, 68, 68, 0.95)", // red-500

    // Borders
    generalBorder: "rgba(71, 85, 105, 0.5)", // slate-600
    generalBorderDim: "rgba(71, 85, 105, 0.25)",

    // Menu / modal backgrounds
    menuItemBackground: "rgba(30, 41, 59, 0.9)", // slate-800
    modalBackdrop: "rgba(15, 23, 42, 0.85)", // slate-900
    modalBackground: "rgba(17, 24, 39, 0.96)",
    modalBorder: "rgba(16, 185, 129, 0.2)", // emerald accent border

    // Text inside modals
    modalText: "rgba(209, 250, 229, 0.95)", // emerald-100
    modalTextDim: "rgba(148, 163, 184, 0.8)", // slate-400
    modalTextSecondary: "rgba(148, 163, 184, 0.8)",

    // Profile actions (disconnect, switch wallet, etc.)
    profileAction: "rgba(30, 41, 59, 0.9)",
    profileActionHover: "rgba(16, 185, 129, 0.15)",
    profileForeground: "rgba(30, 41, 59, 0.9)",

    // Selected options (network, wallet)
    selectedOptionBorder: "rgba(16, 185, 129, 0.8)",
    standby: "rgba(16, 185, 129, 0.9)",
  },
  radii: {
    actionButton: "12px",
    connectButton: "12px",
    menuButton: "12px",
    modal: "16px",
    modalMobile: "12px",
  },
  shadows: {
    connectButton: "0px 4px 8px rgba(0, 0, 0, 0.25)",
    dialog: "0px 4px 12px rgba(0, 0, 0, 0.4)",
    profileDetailsAction: "0px 2px 6px rgba(0, 0, 0, 0.2)",
    selectedOption: "0px 0px 0px 1px rgba(16, 185, 129, 0.8)",
    selectedWallet: "0px 0px 0px 1px rgba(16, 185, 129, 0.8)",
    walletLogo: "0px 2px 4px rgba(0, 0, 0, 0.3)",
  },
  fonts: {
    body: "Inter, sans-serif",
  },
};
