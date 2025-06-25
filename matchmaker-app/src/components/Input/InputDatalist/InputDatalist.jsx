import { useState } from "react";

function InputDatalist({ id, labelText, placeholder, defaultOptions, onSubmitAnswer }) {
  const [focus, setFocus] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [options, setOptions] = useState(defaultOptions);
  const [typing, setTyping] = useState("");

  const onFocus = (event) => {
    setFocus((preState) => true);
  };

  const onBlur = (event) => {
    setFocus((preState) => false);
  };

  const onClickOption = (event) => {
    const newAnswers = [...answers, event.target.value];
    setTyping((preState) => "");
    setAnswers((preState) => newAnswers);
    setOptions((preState) => preState.filter((option) => option !== event.target.value));
    onSubmitAnswer(newAnswers);
    setFocus((preState) => false);
  };

  const onChangeTyping = (event) => {
    setTyping((preState) => event.target.value);
  };

  return (
    <>
      <div onMouseOver={onFocus} onMouseOut={onBlur} className="relative z-30">
        <label htmlFor={id}>{labelText}</label>
        <input
          type="text"
          name={id}
          id={id}
          placeholder={placeholder}
          value={typing}
          onChange={onChangeTyping}
          className="block px-6 py-3 border-2 focus:border-orange-400 outline-0 w-96"
        />
        {focus && (
          <div className="flex flex-col absolute w-full z-30">
            {options
              .filter((option) => isSubString(typing, option))
              .map((val) => (
                <input
                  key={val}
                  type="button"
                  id={`${id}_${val}`}
                  name={`${id}_${val}`}
                  value={val}
                  onClick={onClickOption}
                  className="py-2 border cursor-pointer border-t-0 hover:bg-blue-300 bg-white z-30"
                />
              ))}
            {typing !== "" && !options.includes(typing) && (
              <input
                key={typing}
                type="button"
                id={`${id}_${typing}`}
                name={`${id}_${typing}`}
                value={typing}
                onClick={onClickOption}
                className="py-2 border cursor-pointer border-t-0 hover:bg-blue-300 bg-white z-30"
              />
            )}
          </div>
        )}
      </div>
      <div>
        <ul className="flex gap-1 max-w-[400px] flex-wrap justify-end mt-2">
          {answers.map((answer) => (
            <li key={answer} className="py-3 px-6 bg-blue-300 text-black">
              {answer}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

// is t a substring of s
function isSubString(t, s) {
  if (t.length > s.length) {
    return false;
  }

  if (t === s) {
    return true;
  }

  for (let i = 0; i < t.length; ++i) {
    if (t[i] !== s[i]) {
      return false;
    }
  }

  return true;
}
export default InputDatalist;
