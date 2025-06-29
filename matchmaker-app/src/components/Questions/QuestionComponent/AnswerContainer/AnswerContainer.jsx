function AnswerContainer({ children, className, visible }) {
  if (visible === false) {
    return <></>;
  }
  return (
    // <div className="col-start-2 col-end-3 flex flex-row justify-end ">
    //   <div className={`bg-[#7C0F0F] p-3 rounded-md text-white max-w-96 xl:max-w-max w-max ${className}`}>
    //     {children}
    //   </div>
    // </div>
    <div className={`bg-[#7C0F0F] p-3 rounded-md text-white max-w-96 xl:max-w-max w-max ${className}`}>{children}</div>
  );
}

export default AnswerContainer;
