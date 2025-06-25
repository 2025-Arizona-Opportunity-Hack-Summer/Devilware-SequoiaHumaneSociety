function ProgressBar({ currIdx }) {
  const styles = Array(101)
    .fill(0)
    .map((_, idx) => `fixed bottom-0 bg-[#40916c] h-3 w-[${idx}vw] transition-all duration-300`);

  let widthBar = 0;

  switch (currIdx) {
    case 0:
      widthBar = "relative h-1 bg-[#7C0F0F] flex mb-20 w-[10%] transition-all duration-700";
      break;
    case 1:
      widthBar = "relative h-1 bg-[#7C0F0F] flex mb-20 w-[30%] transition-all duration-700";
      break;
    case 2:
      widthBar = "relative h-1 bg-[#7C0F0F] flex mb-20 w-[50%] transition-all duration-700";
      break;
    case 3:
      widthBar = "relative h-1 bg-[#7C0F0F] flex mb-20 w-[70%] transition-all duration-700";
      break;
    case 4:
      widthBar = "relative h-1 bg-[#7C0F0F] flex mb-20 w-[100%] transition-all duration-700";
      break;
  }

  console.log(widthBar);
  return (
    <div className="relative h-1 bg-[#EFEFEF] flex mb-20 xl:w-[1000px]">
      <div className={widthBar}></div>
      <div className="absolute translate-[-50%] top-[500%] left-[10%] flex flex-col items-center max-w-[100px]">
        <div
          className={`w-12 h-12 ${
            currIdx < 0 ? "bg-[#EFEFEF]" : "bg-[#7C0F0F]"
          } rounded-full transition-all duration-700`}></div>
        <div>
          <p className={`text-center ${currIdx < 0 ? "text-[#ced4da]" : "text-[#7C0F0F]"} font-semibold`}>
            Housing Environment
          </p>
        </div>
      </div>
      <div className="absolute translate-[-50%] top-[500%] left-[30%] flex flex-col items-center max-w-[100px]">
        <div
          className={`w-12 h-12 ${
            currIdx < 1 ? "bg-[#EFEFEF]" : "bg-[#7C0F0F]"
          } rounded-full transition-all duration-700`}></div>
        <div>
          <p className={`text-center ${currIdx < 1 ? "text-[#adb5bd]" : "text-[#7C0F0F]"} font-semibold`}>
            Household Composition
          </p>
        </div>
      </div>
      <div className="absolute translate-[-50%] top-[500%] left-[50%] flex flex-col items-center max-w-[100px]">
        <div
          className={`w-12 h-12 ${
            currIdx < 2 ? "bg-[#EFEFEF]" : "bg-[#7C0F0F]"
          } rounded-full transition-all duration-700`}></div>
        <div>
          <p className={`text-center ${currIdx < 2 ? "text-[#adb5bd]" : "text-[#7C0F0F]"} font-semibold`}>
            Lifestyle & Commitment
          </p>
        </div>
      </div>
      <div className="absolute translate-[-50%] top-[500%] left-[70%] flex flex-col items-center max-w-[100px]">
        <div
          className={`w-12 h-12 ${
            currIdx < 3 ? "bg-[#EFEFEF]" : "bg-[#7C0F0F]"
          } rounded-full transition-all duration-700`}></div>
        <div>
          <p className={`text-center ${currIdx < 3 ? "text-[#adb5bd]" : "text-[#7C0F0F]"} font-semibold`}>
            Experience & Expectations
          </p>
        </div>
      </div>
      <div className="absolute translate-[-50%] top-[500%] left-[90%] flex flex-col items-center max-w-[100px]">
        <div
          className={`w-12 h-12 ${
            currIdx < 4 ? "bg-[#EFEFEF]" : "bg-[#7C0F0F]"
          } rounded-full transition-all duration-700`}></div>
        <div>
          <p className={`text-center ${currIdx < 4 ? "text-[#adb5bd]" : "text-[#7C0F0F]"} font-semibold`}>
            Specific Preferences
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProgressBar;
