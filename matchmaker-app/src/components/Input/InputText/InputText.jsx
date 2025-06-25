function InputText({ children, id, onChangeHandler, labelStyle, inputStyle, value, placeholder }) {
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
        onChange={onChangeHandler}
        placeholder={placeholder}
      />
    </>
  );
}

export default InputText;
