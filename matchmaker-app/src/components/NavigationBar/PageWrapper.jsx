function PageWrapper({ children, className = "" }) {
  return (
    <div className={`pt-20 md:pt-24 ${className}`}>
      {children}
    </div>
  );
}

export default PageWrapper;
