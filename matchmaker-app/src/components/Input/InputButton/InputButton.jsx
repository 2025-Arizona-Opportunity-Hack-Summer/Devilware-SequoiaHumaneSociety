function InputButton({ children, id, onClickHandler, labelStyle, inputStyle, disabled }) {
  return (
    <>
      <label htmlFor={id} className={labelStyle}>
        {children}
      </label>
      <input type="button" name={id} id={id} className={inputStyle} onClick={onClickHandler} disabled={disabled} />
    </>
  );
}

export default InputButton;
