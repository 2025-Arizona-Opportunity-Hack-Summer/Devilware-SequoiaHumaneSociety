import { useState } from "react";
import shsLogo from "../../../assets/images/shs-logo.png";
import user from "../../../assets/images/user.png";
import PulseLoader from "react-spinners/PulseLoader";

import "./HousingEnvironmentQuestions.css";

export function QuestionHE1({ onSubmitAnswer }) {
  const [answer, setAnswer] = useState("");

  const onClickAnswer = (event) => {
    setAnswer((preAnser) => event.target.value);
    onSubmitAnswer(event.target.value);
  };

  return (
    <div className="xl:max-w-max">
      <div className="flex items-center justify-between">
        <div className="bg-[#E0E0E0] p-3 rounded-2xl border-white border w-max">
          <p className="typewriter overflow-hidden">
            Do you own or rent your house? If renting, do you have written
            permission from your landloard to have pets?
          </p>
        </div>
        <img src={shsLogo} alt="company" className="xl:w-12 xl:h-12" />
      </div>
      <div className="flex items-end justify-end mt-3 answer">
        {answer == "" && (
          <div className="flex flex-col gap-2">
            <div className="flex justify-end">
              <label
                htmlFor="he1a"
                className="block px-6 py-3 border border-[#E0E0E0] rounded-2xl cursor-pointer hover:bg-[#7C0F0F] hover:text-white transition-all duration-300"
              >
                I have my own home
              </label>
              <input
                type="radio"
                name="he1"
                id="he1a"
                className="hidden"
                value="own-home"
                onClick={onClickAnswer}
              />
            </div>
            <div className="flex justify-end">
              <label
                htmlFor="he1b"
                className="block px-6 py-3 border border-[#E0E0E0] rounded-2xl cursor-pointer hover:bg-[#7C0F0F] hover:text-white transition-all duration-300"
              >
                I rent home but I have permission from my landloard to have pets
              </label>
              <input
                type="radio"
                name="he1"
                id="he1b"
                className="hidden"
                value="rent-home"
                onClick={onClickAnswer}
              />
            </div>
          </div>
        )}
        {answer != "" && (
          <div>
            <p className="bg-[#7C0F0F] p-3 rounded-2xl text-white">
              {answer == "own-home"
                ? "I have my own home"
                : "I rent home but I have permission from my landloard to have pets"}
            </p>
          </div>
        )}

        <div className="flex items-center">
          <img src={user} alt="you" className="xl:w-12 xl:h-12" />
        </div>
      </div>
      {answer === "" && (
        <div className="flex items-center justify-end answer mt-5">
          <PulseLoader size={10} />
          <img src={shsLogo} alt="company" className="xl:w-12 xl:h-12" />
        </div>
      )}
    </div>
  );
}

export function QuestionHE2({ onSubmitAnswer }) {
  const [answer, setAnswer] = useState("");
  const [other, setOther] = useState(false);
  const [otherAnswer, setOtherAnswer] = useState("");

  const onClickOther = () => {
    setOther((prevState) => true);
  };

  const onClickNonOther = (event) => {
    setAnswer((prevAnswer) => event.target.value);
    onSubmitAnswer(event.target.value);
  };

  const onClickNext = () => {
    if (otherAnswer !== "") {
      setAnswer((prevAnswer) => otherAnswer);
      onSubmitAnswer(otherAnswer);
    }
  };

  const onChangeOtherAnswer = (event) => {
    setOtherAnswer((prevState) => event.target.value);
  };
  return (
    <div className="xl:max-w-2xl">
      <div className="flex items-center justify-between">
        <div className="bg-[#E0E0E0] p-3 rounded-2xl border-white border w-max">
          <p className="typewriter overflow-hidden">
            What type of housing do you live in?
          </p>
        </div>
        <img src={shsLogo} alt="company" className="xl:w-12 xl:h-12" />
      </div>
      <div className="flex items-end justify-end mt-3 answer">
        {answer === "" && (
          <div className="flex flex-col gap-2">
            <div className="flex justify-end">
              <label
                htmlFor="he2a"
                className="block px-6 py-3 border border-[#E0E0E0] rounded-2xl cursor-pointer hover:bg-[#7C0F0F] hover:text-white transition-all duration-300"
              >
                Apartment
              </label>
              <input
                type="radio"
                name="he2"
                id="he2a"
                className="hidden"
                onClick={onClickNonOther}
                value={"Apartment"}
              />
            </div>
            <div className="flex justify-end">
              <label
                htmlFor="he2b"
                className="block px-6 py-3 border border-[#E0E0E0] rounded-2xl cursor-pointer hover:bg-[#7C0F0F] hover:text-white transition-all duration-300"
              >
                House
              </label>
              <input
                type="radio"
                name="he2"
                id="he2b"
                className="hidden"
                onClick={onClickNonOther}
                value={"House"}
              />
            </div>
            <div className="flex justify-end">
              <label
                htmlFor="he2c"
                className="block px-6 py-3 border border-[#E0E0E0] rounded-2xl cursor-pointer hover:bg-[#7C0F0F] hover:text-white transition-all duration-300"
              >
                Condo
              </label>
              <input
                type="radio"
                name="he2"
                id="he2c"
                className="hidden"
                onClick={onClickNonOther}
                value={"Condo"}
              />
            </div>
            {!other && (
              <div className="flex justify-end">
                <label
                  htmlFor="he2d"
                  className="block px-6 py-3 border border-[#E0E0E0] rounded-2xl cursor-pointer hover:bg-[#7C0F0F] hover:text-white transition-all duration-300"
                >
                  Other
                </label>
                <input
                  type="radio"
                  name="he2"
                  id="he2d"
                  className="hidden"
                  onClick={onClickOther}
                />
              </div>
            )}
            {other && (
              <div className="flex flex-col items-end">
                <div>
                  <input
                    type="text"
                    name="he2d1"
                    id="he21"
                    placeholder="Please specify"
                    className="block px-6 py-3 border-2 rounded-md focus:border-orange-400 outline-0"
                    value={otherAnswer}
                    onChange={onChangeOtherAnswer}
                  />
                </div>
                <button
                  className="hover:bg-[#7C0F0F] text-white px-3 py-1 rounded-sm font-bold mt-2 w-max cursor-pointer bg-[#669bbc] transition-all duration-300"
                  onClick={onClickNext}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}
        {answer !== "" && (
          <div>
            <p className="bg-[#7C0F0F] p-3 rounded-2xl text-white">{answer}</p>
          </div>
        )}
        <div>
          <img src={user} alt="you" className="xl:w-12 xl:h-12" />
        </div>
      </div>
      {answer === "" && (
        <div className="flex items-center justify-end answer mt-5">
          <PulseLoader size={10} />
          <img src={shsLogo} alt="company" className="xl:w-12 xl:h-12" />
        </div>
      )}
    </div>
  );
}

export function QuestionHE3({ onSubmitAnswer }) {
  const [type, setType] = useState("");
  const [height, setHeight] = useState("");
  const [hasFence, setHasFence] = useState(false);
  const [answer, setAnswer] = useState("");

  const onClickYes = () => {
    setHasFence((prevState) => true);
  };

  const onChangeHeight = (event) => {
    setHeight((prevState) => event.target.value);
  };

  const onChangeType = (event) => {
    setType((prevState) => event.target.value);
  };

  const onClickNo = () => {
    const newAnswer = {
      type: "None",
      height: 0,
    };
    onSubmitAnswer({ type: "None", height: 0 });
    setAnswer((prevState) => newAnswer);
  };

  const onClickNext = () => {
    let newAnswer;
    if (!(type === "" || type === "")) {
      newAnswer = {
        type: type,
        height: height,
      };
    }
    onSubmitAnswer(newAnswer);
    setAnswer((prevState) => newAnswer);
  };
  return (
    <div className="xl:max-w-2xl">
      <div className="flex items-center">
        <div className="bg-[#E0E0E0] p-3 rounded-2xl border-white border w-max">
          <p className="typewriter overflow-hidden">
            Do you have a fenced yard? If so, what type and height of fencing?
          </p>
        </div>

        <img src={shsLogo} alt="company" className="xl:w-12 xl:h-12" />
      </div>
      <div className="flex items-end justify-end mt-3 answer">
        <div className="flex flex-col gap-2">
          {answer == "" && (
            <>
              <div className="flex justify-end">
                <label
                  htmlFor="he3b"
                  className="block px-6 py-3 border border-[#E0E0E0] rounded-2xl cursor-pointer hover:bg-[#7C0F0F] hover:text-white transition-all duration-300"
                >
                  Yes
                </label>
                <input
                  type="radio"
                  name="he3"
                  id="he3b"
                  className="hidden"
                  onClick={onClickYes}
                />
              </div>
              <div className="flex justify-end">
                <label
                  htmlFor="he3a"
                  className="block px-6 py-3 border border-[#E0E0E0] rounded-2xl cursor-pointer hover:bg-[#7C0F0F] hover:text-white transition-all duration-300"
                >
                  No
                </label>
                <input
                  type="radio"
                  name="he3"
                  id="he3a"
                  className="hidden"
                  onClick={onClickNo}
                />
              </div>
              {hasFence && (
                <>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      name="he3b1"
                      id="he3b1"
                      placeholder="Type"
                      className="block px-6 py-3 border-2 rounded-md focus:border-orange-400 outline-0 w-48"
                      onChange={onChangeType}
                      value={type}
                    />
                    <input
                      type="number"
                      name="he3b2"
                      id="he3b2"
                      placeholder="Height (meter)"
                      className="block px-6 py-3 border-2 rounded-md focus:border-orange-400 outline-0 w-48"
                      min={1}
                      onChange={onChangeHeight}
                      value={height}
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={onClickNext}
                      className="hover:bg-[#7C0F0F] text-white px-3 py-1 rounded-sm font-bold mt-2 w-max cursor-pointer bg-[#669bbc] transition-all duration-300"
                    >
                      Next
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
        {answer !== "" && (
          <div>
            <p className="bg-[#7C0F0F] p-3 rounded-2xl text-white">
              {answer.type == "None"
                ? "No"
                : `I have ${answer.type.toLowerCase()} fence with ${
                    answer.height
                  } meters`}
            </p>
          </div>
        )}
        <div>
          <img src={user} alt="you" className="xl:w-12 xl:h-12" />
        </div>
      </div>
      {answer === "" && (
        <div className="flex items-center justify-end answer mt-5">
          <PulseLoader size={10} />
          <img src={shsLogo} alt="company" className="xl:w-12 xl:h-12" />
        </div>
      )}
    </div>
  );
}

export function QuestionHE4({ onSubmitAnswer }) {
  const [answer, setAnswer] = useState("");
  const hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

  const Options = hours.map((val) => {
    return (
      <option key={val} value={val}>
        {val}
      </option>
    );
  });

  const onSelect = (event) => {
    onSubmitAnswer(event.target.value);
    setAnswer((preState) => event.target.value);
  };

  return (
    <div className="xl:max-w-2xl">
      <div className="flex items-center">
        <div className="bg-[#E0E0E0] p-3 rounded-2xl border-white border w-max">
          <label htmlFor="he4" className="typewriter overflow-hidden block">
            Hour may hours per day will the pet be left alone?
          </label>
        </div>
        <img src={shsLogo} alt="company" className="xl:w-12 xl:h-12" />
      </div>
      <div className="flex items-center justify-end mt-3 answer">
        {answer === "" && (
          <div className="">
            <select
              name="he4"
              id="he4"
              className="block px-3 py-3 border border-[#E0E0E0] rounded-2xl cursor-pointertransition-all duration-300 focus:border-[#7C0F0F] hover:border-[#7C0F0F] cursor-pointer"
              value={answer}
              onChange={onSelect}
            >
              {Options}
            </select>
          </div>
        )}
        {answer !== "" && (
          <div>
            <p className="bg-[#7C0F0F] p-3 rounded-2xl text-white">{answer}</p>
          </div>
        )}
        <img src={user} alt="you" className="xl:w-12 xl:h-12" />
      </div>
      {answer === "" && (
        <div className="flex items-center justify-end answer mt-5">
          <PulseLoader size={10} />
          <img src={shsLogo} alt="company" className="xl:w-12 xl:h-12" />
        </div>
      )}
    </div>
  );
}

export function QuestionHE5({ onSubmitAnswer }) {
  const [answer, setAnswer] = useState("");
  const [other, setOther] = useState(false);
  const [otherAnswer, setOtherAnswer] = useState("");

  const onClickOther = () => {
    setOther((prevState) => true);
  };

  const onClickNonOther = (event) => {
    setAnswer((prevAnswer) => event.target.value);
    onSubmitAnswer(event.target.value);
  };

  const onClickNext = () => {
    if (otherAnswer !== "") {
      setAnswer((prevAnswer) => otherAnswer);
      onSubmitAnswer(otherAnswer);
    }
  };

  const onChangeOtherAnswer = (event) => {
    setOtherAnswer((prevState) => event.target.value);
  };
  return (
    <div className="xl:max-w-2xl">
      <div className="flex items-center justify-between">
        <div className="bg-[#E0E0E0] p-3 rounded-2xl border-white border w-max">
          <p className="typewriter overflow-hidden">
            Where will the pet sleep and spend most of its time?
          </p>
        </div>
        <img src={shsLogo} alt="company" className="xl:w-12 xl:h-12" />
      </div>
      <div className="flex items-end justify-end mt-3 answer">
        {answer === "" && (
          <div className="flex flex-col gap-2">
            <div className="flex justify-end">
              <label
                htmlFor="he5a"
                className="block px-6 py-3 border border-[#E0E0E0] rounded-2xl cursor-pointer hover:bg-[#7C0F0F] hover:text-white transition-all duration-300"
              >
                Living room
              </label>
              <input
                type="radio"
                name="he5"
                id="he5a"
                className="hidden"
                onClick={onClickNonOther}
                value={"Living room"}
              />
            </div>
            <div className="flex justify-end">
              <label
                htmlFor="he5b"
                className="block px-6 py-3 border border-[#E0E0E0] rounded-2xl cursor-pointer hover:bg-[#7C0F0F] hover:text-white transition-all duration-300"
              >
                Bedroom
              </label>
              <input
                type="radio"
                name="he5"
                id="he5b"
                className="hidden"
                onClick={onClickNonOther}
                value={"Bedroom"}
              />
            </div>
            <div className="flex justify-end">
              <label
                htmlFor="he5c"
                className="block px-6 py-3 border border-[#E0E0E0] rounded-2xl cursor-pointer hover:bg-[#7C0F0F] hover:text-white transition-all duration-300"
              >
                Kitchen
              </label>
              <input
                type="radio"
                name="he5"
                id="he5c"
                className="hidden"
                onClick={onClickNonOther}
                value={"Kitchen"}
              />
            </div>
            {!other && (
              <div className="flex justify-end">
                <label
                  htmlFor="he5d"
                  className="block px-6 py-3 border border-[#E0E0E0] rounded-2xl cursor-pointer hover:bg-[#7C0F0F] hover:text-white transition-all duration-300"
                >
                  Other
                </label>
                <input
                  type="radio"
                  name="he5"
                  id="he5d"
                  className="hidden"
                  onClick={onClickOther}
                />
              </div>
            )}
            {other && (
              <div className="flex flex-col items-end">
                <div>
                  <input
                    type="text"
                    name="he2d1"
                    id="he21"
                    placeholder="Please specify"
                    className="block px-6 py-3 border-2 rounded-md focus:border-orange-400 outline-0"
                    value={otherAnswer}
                    onChange={onChangeOtherAnswer}
                  />
                </div>
                <button
                  className="hover:bg-[#7C0F0F] text-white px-3 py-1 rounded-sm font-bold mt-2 w-max cursor-pointer bg-[#669bbc] transition-all duration-300"
                  onClick={onClickNext}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}
        {answer !== "" && (
          <div>
            <p className="bg-[#7C0F0F] p-3 rounded-2xl text-white">{answer}</p>
          </div>
        )}
        <div>
          <img src={user} alt="you" className="xl:w-12 xl:h-12" />
        </div>
      </div>
      {answer === "" && (
        <div className="flex items-center justify-end answer mt-5">
          <PulseLoader size={10} />
          <img src={shsLogo} alt="company" className="xl:w-12 xl:h-12" />
        </div>
      )}
    </div>
  );
}
