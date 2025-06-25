function InputButton({ children, id, onClickHandler, labelStyle, inputStyle, value, disabled }) {
  console.log(disabled);
  return (
    <>
      <label htmlFor={id} className={labelStyle}>
        {children}
      </label>
      <input
        type="text"
        name={id}
        id={id}
        value={value}
        className={inputStyle}
        onClick={onClickHandler}
        disabled={disabled}
      />
    </>
  );
}

export default InputButton;
