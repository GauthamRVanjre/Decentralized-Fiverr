import React from "react";

interface PriceFeedTickerProps {
  price?: number;
  loading?: boolean;
}

const PriceFeedTicker: React.FC<PriceFeedTickerProps> = ({
  price = 123.45,
  loading,
}) => {
  return (
    <span className="inline-block min-w-[120px] px-4 py-1 rounded-full bg-emerald-500 text-white font-semibold text-base shadow-md text-center">
      {loading ? (
        <span className="inline-block h-8 w-full rounded-full from-emerald-100 via-emerald-200 to-emerald-100 animate-pulse" />
      ) : price !== undefined ? (
        `1 ETH = $${price.toFixed(2)}`
      ) : (
        "—"
      )}
    </span>
  );
};

export default PriceFeedTicker;
