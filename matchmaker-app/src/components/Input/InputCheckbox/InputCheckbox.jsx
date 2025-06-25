function InputCheckbox({ children, id, onClickHandler, labelStyle, inputStyle, value, checked }) {
  return (
    <>
      <input
        type="checkbox"
        name={id}
        id={id}
        value={value}
        className={inputStyle}
        onClick={onClickHandler}
        checked={checked}
      />
      <label htmlFor={id} className={labelStyle}>
        {children}
      </label>
    </>
  );
}

export default InputCheckbox;
