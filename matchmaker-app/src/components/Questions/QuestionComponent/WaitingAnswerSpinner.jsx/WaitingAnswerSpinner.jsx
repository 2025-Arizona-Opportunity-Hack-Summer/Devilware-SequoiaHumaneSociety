import PulseLoader from "react-spinners/PulseLoader";
import shsLogo from "../../../../assets/images/shs-logo.png";

function WaitingAnswerSpinner({ visible }) {
  if (visible === false) {
    return <></>;
  }
  return (
    <div className="flex items-center justify-start xl:answer mt-5 relative z-0">
      <img src={shsLogo} alt="company" className="w-12 h-12" />
      <PulseLoader size={10} />
    </div>
  );
}

export default WaitingAnswerSpinner;
