import shsLogo from "../../../../../../assets/images/shs-logo.png";

/**
 * Contain question
 * @param {Object} children children components
 * **/
function QuestionContainer({ children }) {
  return (
    <div className="flex items-center justify-start flex-row w-full">
      {/* Company logo */}
      <img src={shsLogo} alt="company" className="w-12 h-12" />
      {/* Chat box */}
      <div className="bg-[#E0E0E0] p-3 rounded-md border-white border w-max">{children}</div>
    </div>
  );
}

export default QuestionContainer;
