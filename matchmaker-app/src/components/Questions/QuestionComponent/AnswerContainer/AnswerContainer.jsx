function AnswerContainer({ children, className, visible }) {
  if (visible === false) {
    return <></>;
  }
  return <div className={`bg-[#7C0F0F] p-3 rounded-md text-white ${className}`}>{children}</div>;
}

export default AnswerContainer;
