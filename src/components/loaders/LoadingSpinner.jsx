/* eslint-disable react/prop-types */
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function LoadingSpinner({ isLoading, cls = "" }) {
  return (
    <>
      {isLoading && (
        <AiOutlineLoading3Quarters
          className={`animate-spin w-4 h-4 mr-2 ${cls}`}
        />
      )}
    </>
  );
}

export default LoadingSpinner;
