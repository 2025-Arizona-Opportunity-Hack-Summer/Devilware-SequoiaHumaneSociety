import shsLogo from "../../../../assets/images/shs-logo.png";

function QuestionContainer({ children }) {
  return (
    <div className="flex items-center justify-end">
      {/* Chat box */}
      <div className="bg-[#E0E0E0] p-3 rounded-md border-white border w-max">{children}</div>
      {/* Company logo */}
      <img src={shsLogo} alt="company" className="xl:w-12 xl:h-12" />
    </div>
  );
}

export default QuestionContainer;
