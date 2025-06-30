/**
  Support input[type=button]
  @param {Object} properties attributes of the component
  @param {Object} properties.children child components (placed inside label)
  @param {string} properties.id unique string for label.htmlFor, input.id, and input.name
  @param {string} properties.labelStyle string for label styling == label.className
  @param {string} properties.inputStyle string for input styling == input.className
  @param {boolean} properties.disabled boolean for input disabled == input.disabled
  @param {function():void} properties.onClickHandler function when the button is clicked

  @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/button MDN Reference}
**/

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
