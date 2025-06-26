function InputCheckbox({ children, id, onChangeHandler, labelStyle, inputStyle, value, checked }) {
  return (
    <>
      <input
        type="checkbox"
        name={id}
        id={id}
        value={value}
        className={inputStyle}
        onChange={onChangeHandler}
        checked={checked}
      />
      <label htmlFor={id} className={labelStyle}>
        {children}
      </label>
    </>
  );
}

export default InputCheckbox;
