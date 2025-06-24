import PulseLoader from "react-spinners/PulseLoader";
import shsLogo from "../../../../assets/images/shs-logo.png";

function WaitingAnswerSpinner({ anwser }) {
  if (anwser !== "") {
    return <></>;
  }
  return (
    <div className="flex items-center justify-end answer mt-5">
      <PulseLoader size={10} />
      <img src={shsLogo} alt="company" className="xl:w-12 xl:h-12" />
    </div>
  );
}

export default WaitingAnswerSpinner;
