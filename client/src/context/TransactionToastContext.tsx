import React, { createContext, useCallback, useContext, useState } from "react";
import TransactionToast from "../components/TransactionToast/TransactionToast";

type TxStatus = "pending" | "success" | "error" | null;

type ToastState = {
  status: TxStatus;
  txHash?: string;
  message?: string;
  chain?: string;
};

type TransactionToastContextType = {
  showToast: (payload: {
    status: Exclude<TxStatus, null>;
    txHash?: string;
    message?: string;
    chain?: string;
  }) => void;
  hideToast: () => void;
};

const TransactionToastContext = createContext<
  TransactionToastContextType | undefined
>(undefined);

export const TransactionToastProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [toast, setToast] = useState<ToastState>({ status: null });

  const showToast = useCallback(
    (payload: {
      status: Exclude<TxStatus, null>;
      txHash?: string;
      message?: string;
      chain?: string;
    }) => {
      setToast({
        status: payload.status,
        txHash: payload.txHash,
        message: payload.message,
        chain: payload.chain,
      });
    },
    []
  );

  const hideToast = useCallback(() => setToast({ status: null }), []);

  return (
    <TransactionToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      <TransactionToast
        status={toast.status}
        txHash={toast.txHash}
        message={toast.message}
        onClose={hideToast}
        chain={toast.chain as any}
      />
    </TransactionToastContext.Provider>
  );
};

export function useTransactionToast() {
  const ctx = useContext(TransactionToastContext);
  if (!ctx)
    throw new Error(
      "useTransactionToast must be used within TransactionToastProvider"
    );
  return ctx;
}

export default TransactionToastContext;
