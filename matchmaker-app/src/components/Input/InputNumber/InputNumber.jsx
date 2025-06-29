/**
  Support input[type=number]
  @param {Object} properties attributes of component
  @param {Object} properties.children child components in label
  @param {string} properties.id unique string for label.htmlFor, input.id, and input.name
  @param {string} properties.labelStyle string for label styling == label.className
  @param {string} properties.inputStyle string for input styling == input.className
  @param {string} properties.value string value for input
  @param {string} propertes.placeholder string placeholder 
  @param {number} properties.min number for the mininum value == input.min
  @param {number} properties.max number for the maximum value == input.max
  @param {function():void} properties.onChangeHandler function called when the value is changed

  @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/number MDN Reference}
**/

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
