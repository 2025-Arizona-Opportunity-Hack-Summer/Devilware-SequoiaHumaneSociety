/**
  Support input[type=checkbox]
  @param {Object} properties attributes of component
  @param {Object} properties.children child components in (placed in label)
  @param {string} properties.id unique string for label.htmlFor, input.id, and input.name
  @param {string} properties.labelStyle string for label styling == className in label tag
  @param {string} properties.inputStyle string for input styling == input.className
  @param {string} properties.value unique string represents the value of the checkbox == input.value
  @param {boolean} properties.checked true when the button is checked, false otherwise
  @param {function():void} properties.onChangeHandler function when the button is clicked
  
  @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/checkbox MDN Reference}
**/

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
