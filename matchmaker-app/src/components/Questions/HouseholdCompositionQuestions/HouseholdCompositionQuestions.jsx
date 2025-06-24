import { useEffect, useState } from "react";
import shsLogo from "../../../assets/images/shs-logo.png";
import user from "../../../assets/images/user.png";
import PulseLoader from "react-spinners/PulseLoader";

import InputDatalist from "../../Input/InputDataList/InputDataList";
import AnimalList from "../AnimalList/AnimalList";

import "./HouseholdCompositionQuestions.css";

export function QuestionHC1({ onSubmitAnswer }) {
  const [adults, setAdults] = useState("");
  const [children, setChildren] = useState("");
  const [youngestAge, setYoungestAge] = useState("");

  const onChangeAdults = (event) => {
    setAdults((preState) => Number(event.target.value));
  };

  const onChangeChildren = (event) => {
    setChildren((preState) => Number(event.target.value));
  };

  useEffect(() => {
    if (adults !== "" && children === 0) {
      onSubmitAnswer({ adults: adults, children: 0 });
    } else if (adults !== "" && children > 0 && youngestAge !== "") {
      onSubmitAnswer({ adults: adults, children: children, youngestAge: youngestAge });
    }
  }, [adults, children, youngestAge]);

  const adultsOptions = Array(11)
    .fill(0)
    .map((_, idx) => idx)
    .map((val) => (
      <option key={`adult_${val}`} value={val}>
        {val}
      </option>
    ));

  const childrenOptions = Array(11)
    .fill(0)
    .map((_, idx) => idx)
    .map((val) => (
      <option key={`children_${val}`} value={val}>
        {val}
      </option>
    ));

  const hasAnswer = (adults !== "" && children === 0) || (adults !== "" && children > 0 && youngestAge !== "");

  return (
    <>
      <div className="xl:max-w-max">
        {/* Question container - contains the question */}
        <div className="flex items-center justify-end">
          {/* Chat box */}
          <div className="bg-[#E0E0E0] p-3 rounded-2xl border-white border w-max">
            {/* Running text */}
            <p className="typewriter overflow-hidden">How many adults and children live in your home?</p>
          </div>
          {/* Company logo */}
          <img src={shsLogo} alt="company" className="xl:w-12 xl:h-12" />
        </div>

        {/* Answer or Options conatiner - contains the answer or options depends on @answer */}
        <div className="flex items-end justify-end mt-3 answer">
          {/* If the answer is empty string ==> Display list of options */}
          {!hasAnswer && (
            /* List of options is flex column and each option must be displayed at the right corner */
            <div className="flex flex-col gap-2 items-end">
              <div className="flex gap-2">
                <div className="flex items-center gap-2">
                  <label htmlFor="hc1a">Adult</label>
                  <select
                    id="hc1a"
                    name="hc1a"
                    className="block px-3 py-3 border-2 border-[#E0E0E0] rounded-md transition-all duration-300 focus:border-[#7C0F0F] hover:border-[#7C0F0F] cursor-pointer"
                    onChange={onChangeAdults}
                    value={adults}>
                    <option value="" disabled></option>
                    {adultsOptions}
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <label htmlFor="hc1b">Children</label>
                  <select
                    id="hc1b"
                    name="hc1b"
                    className="block px-3 py-3 border-2 border-[#E0E0E0] rounded-md transition-all duration-300 focus:border-[#7C0F0F] hover:border-[#7C0F0F] cursor-pointer"
                    onChange={onChangeChildren}
                    value={children}>
                    <option value="" disabled></option>
                    {childrenOptions}
                  </select>
                </div>
              </div>
            </div>
          )}
          {/* If the answer is NOT empty string ==> Display answer */}
          {hasAnswer != "" && (
            <div>
              <p className="bg-[#7C0F0F] p-3 rounded-2xl text-white xl:max-w-[400px]">
                {children !== 0
                  ? `My home has ${adults} ${adults === 1 ? "adult" : "adults"} and ${children}
                ${children === 1 ? "child" : "children"}. The youngest one is ${youngestAge.toLowerCase()}`
                  : `My home has ${adults} ${adults === 1 ? "adult" : "adults"} and we don't have any child`}
              </p>
            </div>
          )}
          {/* Whether the answer is empty string or NOT, ALWAYS display user logo */}
          <div className="flex items-center">
            <img src={user} alt="you" className="xl:w-12 xl:h-12" />
          </div>
        </div>
      </div>
      {children !== "" && children > 0 && !hasAnswer && (
        <div className="flex items-center justify-end mt-5">
          <QuestionHC1a setYoungestAge={setYoungestAge} />
        </div>
      )}

      {!hasAnswer && (
        <div className="flex items-center justify-end answer mt-5">
          <PulseLoader size={10} />
          <img src={shsLogo} alt="company" className="xl:w-12 xl:h-12" />
        </div>
      )}
    </>
  );
}

function QuestionHC1a({ setYoungestAge }) {
  const ageOptions = (
    <>
      <option value={"New born (0 - 1 Month)"}>New born (0 - 1 Month)</option>
      <option value={"Baby (1 - 3 Years)"}>Baby (1 - 3 Years)</option>
      <option value={"Preschool (4 - 5 Years)"}>Preschool (4 - 5 Years)</option>
      <option value={"School age (6 - 12 Years)"}>School age (6 - 12 Years)</option>
      <option value={"Teenager (13 - 18 Years)"}>Teenager (13 - 18 Years)</option>
    </>
  );

  const onSelectOption = (event) => {
    setYoungestAge((preState) => event.target.value);
  };
  return (
    <div className="xl:max-w-max">
      {/* Question container - contains the question */}
      <div className="flex items-center justify-end">
        {/* Chat box */}
        <div className="bg-[#E0E0E0] p-3 rounded-2xl border-white border w-max">
          {/* Running text */}
          <p className="typewriter overflow-hidden">How old is the youngest child?</p>
        </div>
        {/* Company logo */}
        <img src={shsLogo} alt="company" className="xl:w-12 xl:h-12" />
      </div>
      {/* Answer or Options conatiner - contains the answer or options depends on @answer */}
      <div className="flex items-end justify-end mt-3 answer">
        {/* If the answer is empty string ==> Display list of options */}
        <select
          id="hc1c"
          name="hc1c"
          className="block px-3 py-3 border-2 border-[#E0E0E0] rounded-md transition-all duration-300 focus:border-[#7C0F0F] hover:border-[#7C0F0F] cursor-pointer"
          onChange={onSelectOption}>
          {ageOptions}
        </select>
        {/* Whether the answer is empty string or NOT, ALWAYS display user logo */}
        <div className="flex items-center">
          <img src={user} alt="you" className="xl:w-12 xl:h-12" />
        </div>
      </div>
    </div>
  );
}

export function QuestionHC2({ onSubmitAnswer }) {
  const [hasAnswer, setHasAnswer] = useState(false);
  const [hasAllergies, setHasAllergies] = useState(false);

  const [allergiesAnimal, setAllergiesAnimal] = useState([]);

  const animalOptions = ["Bird", "Cat", "Dog"];

  const onClickNo = () => {
    setHasAnswer((preState) => true);
    onSubmitAnswer([]);
  };

  const onClickYes = () => {
    setHasAllergies((preState) => true);
  };

  const onClickOption = (optionsList) => {
    setAllergiesAnimal((preState) => optionsList);
  };

  const onClickNext = () => {
    if (allergiesAnimal.length === 0) {
    } else {
      setHasAnswer((preState) => true);
      onSubmitAnswer(allergiesAnimal);
    }
  };
  return (
    <div className="xl:max-w-2xl xl:w-[550px]">
      {/* Question container - contains the questions */}
      <div className="flex items-center justify-end">
        {/* Chat box */}
        <div className="bg-[#E0E0E0] p-3 rounded-2xl border-white border w-max">
          <p className="typewriter overflow-hidden">
            {/* Running text */}
            Does anyone in the household have allergies to animals?
          </p>
        </div>
        {/* Company logo */}
        <img src={shsLogo} alt="company" className="xl:w-12 xl:h-12" />
      </div>

      {/* Answer or Options conatiner - contains the answer or options depends on @answer */}
      <div className="flex items-end justify-end mt-3 answer relative z-30">
        {/* If the answer is empty string ==> Display list of options */}
        {!hasAnswer && (
          <div className="flex flex-col gap-2 items-end">
            <label
              htmlFor="hc2a"
              className="block px-6 py-3 border-2 border-[#E0E0E0] rounded-md cursor-pointer hover:bg-[#7C0F0F] hover:text-white transition-all duration-300"
              onClick={onClickNo}>
              No
            </label>
            <input type="radio" name="hc2" id="hc2a" className="hidden" />
            <label
              htmlFor="hc2b"
              className="block px-6 py-3 border-2 border-[#E0E0E0] rounded-md cursor-pointer hover:bg-[#7C0F0F] hover:text-white transition-all duration-300"
              onClick={onClickYes}>
              Yes
            </label>
            <input type="radio" name="hc2" id="hc2b" className="hidden" />
            {hasAllergies && (
              <div className="relative z-30 flex flex-col items-end">
                <InputDatalist
                  id={"hc2c"}
                  labelText={""}
                  placeholder={"Chose animal"}
                  defaultOptions={animalOptions}
                  onSubmitAnswer={onClickOption}
                />
                <input
                  type="button"
                  className="hover:bg-[#7C0F0F] text-white px-3 py-1 rounded-sm font-bold mt-2 w-max cursor-pointer bg-[#669bbc] transition-all duration-300"
                  value={"Next"}
                  onClick={onClickNext}
                />
              </div>
            )}
          </div>
        )}
        {/* If the answer is NOT empty string ==> Display answer */}
        {hasAnswer && (
          <div>
            <p className="bg-[#7C0F0F] p-3 rounded-2xl text-white">
              {allergiesAnimal.length === 0
                ? "We do not have allergies to any animal"
                : `My family has allergies with ${allergiesAnimal.map((animal) => animal.toLowerCase()).join(", ")}`}
            </p>
          </div>
        )}
        <div>
          <img src={user} alt="you" className="xl:w-12 xl:h-12" />
        </div>
      </div>

      {/* If the answer is empty string ==> There is spinner represents the company is waiting to user's answer */}
      {!hasAnswer && (
        <div className="flex items-center justify-end answer mt-5 relative z-10">
          <PulseLoader size={10} style={{ zIndex: 0 }} />
          <img src={shsLogo} alt="company" className="xl:w-12 xl:h-12" />
        </div>
      )}
    </div>
  );
}

export function QuestionHC3({ onSubmitAnswer }) {
  const [hasAnimal, setHasAnimal] = useState(false);
  const [hasAnswer, setHasAnswer] = useState(false);
  const [animalList, setAnimalList] = useState([]);

  const onClickYes = () => {
    setHasAnimal((prevState) => true);
  };

  const onClickNo = () => {
    onSubmitAnswer([]);
    setHasAnswer((preState) => true);
  };

  const onClickNext = () => {
    onSubmitAnswer(animalList);
    setHasAnswer((preState) => true);
  };

  return (
    <>
      <div className="xl:max-w-2xl xl:w-[550px]">
        {/* Question container - contains the questions */}
        <div className="flex items-center justify-end">
          <div className="bg-[#E0E0E0] p-3 rounded-2xl border-white border w-max">
            <p className="typewriter overflow-hidden">Do you currently have other pets?</p>
          </div>
          <img src={shsLogo} alt="company" className="xl:w-12 xl:h-12" />
        </div>

        {/* Answer or Options conatiner - contains the answer or options depends on @answer */}
        <div className="flex items-end justify-end mt-3 answer">
          <div className="flex flex-col gap-2 items-end">
            {!hasAnswer && (
              <>
                <label
                  htmlFor="hc3a"
                  className="block px-6 py-3 border border-[#E0E0E0] rounded-md cursor-pointer hover:bg-[#7C0F0F] hover:text-white transition-all duration-300">
                  No
                </label>
                <input type="radio" name="hc3" id="hc3a" className="hidden" onClick={onClickNo} />

                <label
                  htmlFor="hc3b"
                  className="block px-6 py-3 border border-[#E0E0E0] rounded-md cursor-pointer hover:bg-[#7C0F0F] hover:text-white transition-all duration-300">
                  Yes
                </label>
                <input type="radio" name="hc3" id="hc3b" className="hidden" onClick={onClickYes} />
              </>
            )}
          </div>
          {hasAnswer && (
            <div>
              <div className="bg-[#7C0F0F] p-3 rounded-2xl text-white">
                <p>
                  {animalList.length == 0
                    ? "My family does not have any animals at home"
                    : `My home has ${animalList.length} ${
                        animalList.length == 1 ? "animal" : "animals"
                      } at the moment:`}
                </p>
                <ol start={1}>
                  {animalList.map((animal, idx) => (
                    <li key={idx}>
                      {animal.type}, {animal.age} months, {animal.isNeutered === true ? "Neutered" : "Spayed"}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          )}
          <div>
            <img src={user} alt="you" className="xl:w-12 xl:h-12" />
          </div>
        </div>

        {/* If the answer is empty string ==> There is spinner represents the company is waiting to user's answer */}
      </div>
      {hasAnimal && (
        <div className="flex items-center justify-end mt-5">
          <QuestionHC3a animalList={animalList} setAnimalList={setAnimalList} onClickNext={onClickNext} />
        </div>
      )}

      {!hasAnswer && (
        <div className="flex items-center justify-end answer mt-5">
          <PulseLoader size={10} />
          <img src={shsLogo} alt="company" className="xl:w-12 xl:h-12" />
        </div>
      )}
    </>
  );
}

function QuestionHC3a({ animalList, setAnimalList, onClickNext }) {
  return (
    <div className="xl:max-w-2xl xl:w-[550px]">
      {/* Question container - contains the questions */}
      <div className="flex items-center justify-end">
        <div className="bg-[#E0E0E0] p-3 rounded-2xl border-white border w-max">
          <p className="typewriter overflow-hidden"> If so, what types, ages, and are they spayed/neutered?</p>
        </div>
        <img src={shsLogo} alt="company" className="xl:w-12 xl:h-12" />
      </div>

      {/* Answer or Options conatiner - contains the answer or options depends on @answer */}
      <div className="flex items-end justify-end mt-3 answer">
        <div className="flex flex-col gap-2 items-end">
          <AnimalList animalList={animalList} setAnimalList={setAnimalList} />
          <input
            type="button"
            className="hover:bg-[#7C0F0F] text-white px-3 py-1 rounded-sm font-bold mt-2 w-max cursor-pointer bg-[#669bbc] transition-all duration-300"
            onClick={onClickNext}
            value={"Next"}
          />
        </div>
        <div>
          <img src={user} alt="you" className="xl:w-12 xl:h-12" />
        </div>
      </div>
    </div>
  );
}

export function QuestionHC4({ onSubmitAnswer }) {
  const [hasAnswer, setHasAnswer] = useState(false);
  const [hasPetBefore, setHasPetBefore] = useState(false);
  const [answer, setAnswer] = useState("");

  const onClickNo = () => {
    onSubmitAnswer("No previous pet");
    setHasAnswer((preState) => true);
  };

  const onClickYes = () => {
    setHasPetBefore((preState) => true);
  };

  const onClickNext = () => {
    if (answer.length === 0) {
    } else {
      onSubmitAnswer(answer);
      setHasAnswer((preState) => true);
    }
  };

  const onChangeAnswer = (event) => {
    setAnswer((prevState) => event.target.value);
  };
  return (
    <>
      <div className="xl:max-w-2xl xl:w-[550px]">
        {/* Question container - contains the questions */}
        <div className="flex items-center justify-end">
          {/* Chat box */}
          <div className="bg-[#E0E0E0] p-3 rounded-2xl border-white border w-max">
            <p className="typewriter overflow-hidden">
              {/* Running text */}
              Have you had pets before?
            </p>
          </div>
          {/* Company logo */}
          <img src={shsLogo} alt="company" className="xl:w-12 xl:h-12" />
        </div>

        {/* Answer or Options conatiner - contains the answer or options depends on @answer */}
        <div className="flex items-end justify-end mt-3 answer relative z-30">
          {/* If the answer is empty string ==> Display list of options */}
          {!hasAnswer && (
            <div className="flex flex-col gap-2 items-end">
              <label
                htmlFor="hc4a"
                className="block px-6 py-3 border-2 border-[#E0E0E0] rounded-md cursor-pointer hover:bg-[#7C0F0F] hover:text-white transition-all duration-300"
                onClick={onClickNo}>
                No
              </label>
              <input type="radio" name="hc4" id="hc4a" className="hidden" />
              <label
                htmlFor="hc4b"
                className="block px-6 py-3 border-2 border-[#E0E0E0] rounded-md cursor-pointer hover:bg-[#7C0F0F] hover:text-white transition-all duration-300"
                onClick={onClickYes}>
                Yes
              </label>
              <input type="radio" name="hc4" id="hc4b" className="hidden" />
            </div>
          )}
          {/* If the answer is NOT empty string ==> Display answer */}
          {hasAnswer && (
            <div>
              <p className="bg-[#7C0F0F] p-3 rounded-2xl text-white">
                {hasPetBefore === false ? "We don't have pet before" : `Yes. ${answer}`}
              </p>
            </div>
          )}
          <div>
            <img src={user} alt="you" className="xl:w-12 xl:h-12" />
          </div>
        </div>
      </div>
      {hasPetBefore && !hasAnswer && <QuestionHC4a onClickNext={onClickNext} onChangeAnswer={onChangeAnswer} />}
      {/* If the answer is empty string ==> There is spinner represents the company is waiting to user's answer */}
      {!hasAnswer && (
        <div className="flex items-center justify-end answer mt-5 relative z-10">
          <PulseLoader size={10} style={{ zIndex: 0 }} />
          <img src={shsLogo} alt="company" className="xl:w-12 xl:h-12" />
        </div>
      )}
    </>
  );
}

export function QuestionHC4a({ onSubmitAnswer, onClickNext, onChangeAnswer }) {
  return (
    <div className="xl:max-w-2xl xl:w-[550px] mt-5">
      {/* Question container - contains the questions */}
      <div className="flex items-center justify-end">
        {/* Chat box */}
        <div className="bg-[#E0E0E0] p-3 rounded-2xl border-white border w-max">
          <p className="typewriter overflow-hidden">
            {/* Running text */}
            What happened to previous pets?
          </p>
        </div>
        {/* Company logo */}
        <img src={shsLogo} alt="company" className="xl:w-12 xl:h-12" />
      </div>

      {/* Answer or Options conatiner - contains the answer or options depends on @answer */}
      <div className="flex items-end justify-end mt-3 answer relative z-30">
        <div className="flex flex-col gap-2 items-end">
          <input
            type="text"
            name="hc4c"
            id="hc4c"
            className="block px-6 py-3 border-2 focus:border-orange-400 outline-0 w-80"
            placeholder="Please specify"
            onChange={onChangeAnswer}
          />
          <input
            type="button"
            className="hover:bg-[#7C0F0F] text-white px-3 py-1 rounded-sm font-bold mt-2 w-max cursor-pointer bg-[#669bbc] transition-all duration-300"
            onClick={onClickNext}
            value={"Next"}
          />
        </div>
        <div>
          <img src={user} alt="you" className="xl:w-12 xl:h-12" />
        </div>
      </div>
    </div>
  );
}
