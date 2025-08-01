function ProgressBar({ percentage }) {
  return (
    <div className="relative h-3 bg-[#adb5bd] flex w-full rounded-2xl">
      <div
        className="absolute top-0 left-0 w-full bg-[#09bc8a] h-3 duration-150  rounded-2xl"
        style={{ width: `${percentage <= 100 ? percentage : 100}%` }}></div>
    </div>
  );
}

export default ProgressBar;
