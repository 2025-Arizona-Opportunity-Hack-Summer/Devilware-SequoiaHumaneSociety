function ProgressBar({ percentage }) {
  const styles = Array(101)
    .fill(0)
    .map((_, idx) => `fixed bottom-0 bg-[#40916c] h-3 w-[${idx}vw] transition-all duration-300`);

  return <div className={styles[percentage]}></div>;
}

export default ProgressBar;
