function InputRadio({ children, id, name, onClickHandler, labelStyle, inputStyle, value }) {
  return (
    <>
      <label htmlFor={id} className={labelStyle}>
        {children}
      </label>
      <input type="radio" name={name} id={id} value={value} className={inputStyle} onClick={onClickHandler} />
    </>
  );
}

export default InputRadio;
