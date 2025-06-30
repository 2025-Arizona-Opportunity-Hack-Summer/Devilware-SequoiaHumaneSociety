/**
  Support input[type=checkbox]
  @param {Object} properties attributes of component
  @param {Object} properties.children child components in (placed in label)
  @param {string} properties.id unique string for label.htmlFor, input.id
  @param {string} properties.name string for input.name
  @param {string} properties.labelStyle string for label styling == className in label tag
  @param {string} properties.inputStyle string for input styling == input.className
  @param {string} properties.value unique string represents the value of the checkbox == input.value
  @param {function():void} properties.onClickHandler function called when the button is clicked
  
  @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/radio MDN Reference}
**/

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
