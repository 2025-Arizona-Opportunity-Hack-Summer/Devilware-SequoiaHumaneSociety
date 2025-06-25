function InputNumber({ children, id, onChangeHandler, labelStyle, inputStyle, value, placeholder, min, max }) {
  return (
    <>
      <label htmlFor={id} className={labelStyle}>
        {children}
      </label>
      <input
        type="number"
        name={id}
        id={id}
        value={value}
        className={inputStyle}
        onChange={onChangeHandler}
        placeholder={placeholder}
        min={min}
        max={max}
      />
    </>
  );
}

export default InputNumber;
