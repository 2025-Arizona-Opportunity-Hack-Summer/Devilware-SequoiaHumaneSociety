function Modal({ children, className, visible }) {
  if (visible === false) {
    return <></>;
  }
  return <div className={`fixed top-0 left-0 w-screen h-screen bg-[#00000080] ${className} z-50`}>{children}</div>;
}

export default Modal;
