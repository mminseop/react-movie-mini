import { ClipLoader } from "react-spinners";

function LoadingIndicator({ lodingText }) {
  return (
    <div className="loading-wrap">
      <ClipLoader color="#666" size={50} />
      <div className="loading-text">{lodingText}...</div>
    </div>
  );
}

export default LoadingIndicator;
