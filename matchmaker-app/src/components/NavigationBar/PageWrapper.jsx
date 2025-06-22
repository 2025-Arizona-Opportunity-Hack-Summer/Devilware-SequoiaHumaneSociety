function PageWrapper({ children, className = "" }) {
  if (className === "match") {
    return <div className={`pt-0 match`}>{children}</div>;
  }
  return <div className={`pt-20 md:pt-24 ${className}`}>{children}</div>;
}

export default PageWrapper;
