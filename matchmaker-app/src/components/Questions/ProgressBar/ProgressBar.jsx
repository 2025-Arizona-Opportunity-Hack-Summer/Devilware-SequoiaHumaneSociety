function ProgressBar({ percentage }) {
  return (
    <div className="relative h-3 bg-[#adb5bd] flex w-full rounded-2xl">
      <div
        className="absolute top-0 left-0 w-full bg-[#09bc8a] h-3 duration-150  rounded-2xl"
        style={{ width: `${percentage <= 100 ? percentage : 100}%` }}></div>
    </div>
  );
  // let widthBar = 0;
  // switch (currIdx) {
  //   case 0:
  //     widthBar = "relative h-1 bg-[#7C0F0F] flex mb-20 w-[0%] transition-all duration-700";
  //     break;
  //   case 1:
  //     widthBar = "relative h-1 bg-[#7C0F0F] flex mb-20 w-[20%] transition-all duration-700";
  //     break;
  //   case 2:
  //     widthBar = "relative h-1 bg-[#7C0F0F] flex mb-20 w-[40%] transition-all duration-700";
  //     break;
  //   case 3:
  //     widthBar = "relative h-1 bg-[#7C0F0F] flex mb-20 w-[60%] transition-all duration-700";
  //     break;
  //   case 4:
  //     widthBar = "relative h-1 bg-[#7C0F0F] flex mb-20 w-[80%] transition-all duration-700";
  //     break;
  //   case 5:
  //     widthBar = "relative h-1 bg-[#7C0F0F] flex mb-20 w-[100%] transition-all duration-700";
  //     break;
  // }
  // return (
  //   <div className="relative h-1 bg-[#EFEFEF] flex xl:mb-20 w-full">
  //     <div className={widthBar}></div>
  //     <div className="absolute translate-[-50%] xl:top-[650%] xl:left-[0%] flex flex-col items-center max-w-24">
  //       <div
  //         className={`w-6 h-6 ${
  //           currIdx < 0 ? "bg-[#EFEFEF]" : "bg-[#7C0F0F]"
  //         } rounded-full transition-all duration-700`}></div>
  //       <div className="hidden xl:block">
  //         <p className={`text-center ${currIdx < 0 ? "text-[#ced4da]" : "text-[#7C0F0F]"} font-semibold`}>
  //           Housing Environment
  //         </p>
  //       </div>
  //     </div>
  //     <div className="absolute translate-[-50%] xl:top-[650%] left-[20%] flex flex-col items-center max-w-24">
  //       <div
  //         className={`w-6 h-6 ${
  //           currIdx < 1 ? "bg-[#EFEFEF]" : "bg-[#7C0F0F]"
  //         } rounded-full transition-all duration-700`}></div>
  //       <div className="hidden xl:block">
  //         <p className={`text-center ${currIdx < 1 ? "text-[#adb5bd]" : "text-[#7C0F0F]"} font-semibold`}>
  //           Household Composition
  //         </p>
  //       </div>
  //     </div>
  //     <div className="absolute translate-[-50%] xl:top-[650%] left-[40%] flex flex-col items-center max-w-24">
  //       <div
  //         className={`w-6 h-6 ${
  //           currIdx < 2 ? "bg-[#EFEFEF]" : "bg-[#7C0F0F]"
  //         } rounded-full transition-all duration-700`}></div>
  //       <div className="hidden xl:block">
  //         <p className={`text-center ${currIdx < 2 ? "text-[#adb5bd]" : "text-[#7C0F0F]"} font-semibold`}>
  //           Lifestyle Commitment
  //         </p>
  //       </div>
  //     </div>
  //     <div className="absolute translate-[-50%] xl:top-[650%] left-[60%] flex flex-col items-center max-w-24">
  //       <div
  //         className={`w-6 h-6 ${
  //           currIdx < 3 ? "bg-[#EFEFEF]" : "bg-[#7C0F0F]"
  //         } rounded-full transition-all duration-700`}></div>
  //       <div className="hidden xl:block">
  //         <p className={`text-center ${currIdx < 3 ? "text-[#adb5bd]" : "text-[#7C0F0F]"} font-semibold`}>
  //           Experience Expectations
  //         </p>
  //       </div>
  //     </div>
  //     <div className="absolute translate-[-50%] xl:top-[650%] left-[80%] flex flex-col items-center max-w-24">
  //       <div
  //         className={`w-6 h-6 ${
  //           currIdx < 4 ? "bg-[#EFEFEF]" : "bg-[#7C0F0F]"
  //         } rounded-full transition-all duration-700`}></div>
  //       <div className="hidden xl:block">
  //         <p className={`text-center ${currIdx < 4 ? "text-[#adb5bd]" : "text-[#7C0F0F]"} font-semibold`}>
  //           Specific Preferences
  //         </p>
  //       </div>
  //     </div>
  //     <div className="absolute translate-[-50%] xl:top-[350%] left-[100%] flex flex-col items-center max-w-24">
  //       <div
  //         className={`w-6 h-6 ${
  //           currIdx < 5 ? "bg-[#EFEFEF]" : "bg-[#7C0F0F]"
  //         } rounded-full transition-all duration-700`}></div>
  //       <div className="hidden xl:block">
  //         <p className={`text-center ${currIdx < 5 ? "text-[#adb5bd]" : "text-[#7C0F0F]"} font-semibold`}>Review</p>
  //       </div>
  //     </div>
  //   </div>
  // );
}

export default ProgressBar;
