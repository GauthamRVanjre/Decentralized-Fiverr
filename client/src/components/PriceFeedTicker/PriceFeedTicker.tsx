import { useUsdtoEth } from "../../hooks/useUsdtoEth";
import Loader from "../Loader/Loader";

const PriceFeedTicker = () => {
  const { data: price, isLoading, isError } = useUsdtoEth();

  return (
    <span className="inline-block min-w-[120px] px-4 py-1 rounded-full bg-emerald-500 text-white font-semibold text-base shadow-md text-center">
      {isLoading ? <Loader /> : isError ? "Error" : `1 ETH = $${price}`}
    </span>
  );
};

export default PriceFeedTicker;
