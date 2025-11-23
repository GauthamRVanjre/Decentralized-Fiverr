import React from "react";

interface ErrorProps {
  message: string;
  children?: React.ReactNode;
}

const Error: React.FC<ErrorProps> = ({ message, children }) => {
  return (
    <div className="flex items-center gap-2 text-red-400 text-sm">
      <svg
        className="h-5 w-5 shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <path
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>{message || children}</span>
    </div>
  );
};

export default Error;
