import shsLogo from "../../../../assets/images/shs-logo.png";

function QuestionContainer({ children }) {
  return (
    <div className="flex items-center justify-start flex-row w-full">
      {/* Company logo */}
      <img src={shsLogo} alt="company" className="w-12 h-12" />
      {/* Chat box */}
      <div className="bg-[#E0E0E0] p-3 rounded-md border-white border w-max">{children}</div>
    </div>

    // <div className="grid grid-cols-[48px_1fr_48px] items-center justify-start flex-row w-full">
    //   {/* Company logo */}
    //   <img src={shsLogo} alt="company" className="w-12 h-12" />
    //   {/* Chat box */}
    //   <div className="bg-[#E0E0E0] p-3 rounded-md border-white border w-full">{children}</div>
    // </div>
  );
}

export default QuestionContainer;
