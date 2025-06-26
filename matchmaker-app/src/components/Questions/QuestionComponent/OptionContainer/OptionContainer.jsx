function OptionContainer({ children, className, visible }) {
  if (visible === false) {
    return <></>;
  }
  return <div className={`flex flex-col gap-2 items-end ${className} flex-wrap`}>{children}</div>;
}

export default OptionContainer;
