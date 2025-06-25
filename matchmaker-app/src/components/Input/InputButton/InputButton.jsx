function InputButton({ children, id, onClickHandler, labelStyle, inputStyle, value }) {
  return (
    <>
      <label htmlFor={id} className={labelStyle}>
        {children}
      </label>
      <input type="text" name={id} id={id} value={value} className={inputStyle} onClick={onClickHandler} />
    </>
  );
}

export default InputButton;
