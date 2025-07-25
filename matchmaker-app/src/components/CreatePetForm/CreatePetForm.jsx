import { withAuthInfo } from "@propelauth/react";
import { useEffect, useState } from "react";
import ImageList from "./ImagesList";

export default withAuthInfo(function CreatePetForm() {
  const [renderedImages, setRenderedImages] = useState([]);
  const [storedImages, setStoredImages] = useState([]);
  const [petSpecies, setPetSpecies] = useState("Cat");
  const [petBreeds, setPetBreeds] = useState([]);
  const [petCharacteristics, setPetCharacteristicss] = useState([]);

  const textInputStyles =
    "border rounded-lg p-2 focus:border-orange-500  outline-0 w-full max-w-[720px]  [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300";

  const catBreeds = ["Siamese", "Domestic_Long_Hair", "Domestic_Shorthair", "Domestic_Medium_Hair"];
  const dogBreeds = [
    "Pug",
    "Mix",
    "Jack_Russel",
    "Collie",
    "Dachshund",
    "Rottweiler",
    "Siberian",
    "Labrador",
    "Airedale",
    "Husky",
    "Retriever",
    "Border",
    "Chihuahua",
    "Akita",
    "Sheepdog",
    "Cairn",
    "Terrier",
    "Pit_Bull",
    "Boxer",
    "Shepherd",
    "German",
    "Miniaure_Smooth_Haired",
  ];
  const characteristicsOption = ["Bonded", "Shy", "No_Cats", "No_Dogs", "Single_Dog_Home", "No_kids_under_10"];

  const breedOptions = petSpecies === "Cat" ? catBreeds : dogBreeds;

  const onChangeSpecies = (event) => {
    setPetSpecies((prev) => event.target.value);
    setPetBreeds((prev) => []);
  };

  const onChangeDeleteImage = (fileUrl, fileName) => {
    setStoredImages((state) => state.filter((image) => image.name !== fileName));
    setRenderedImages((state) => state.filter((image) => image.url !== fileUrl));
  };

  const onChangeInsertImage = (event) => {
    const newImageUrl = [];
    const newFiles = event.target.files;
    const selectedFiles = [];

    for (const originalFile of newFiles) {
      const newFileName = `${getRandomString(32)}_${originalFile.name}`;
      const newFile = new File([originalFile], newFileName, {
        type: originalFile.type,
        lastModified: originalFile.lastModified,
      });

      newImageUrl.push({
        url: URL.createObjectURL(newFile),
        fileName: newFile.name,
      });
      selectedFiles.push(newFile);
    }

    setRenderedImages((prevFiles) => [...prevFiles, ...newImageUrl]);
    setStoredImages((prevFiles) => [...prevFiles, ...selectedFiles]);
    event.target.value = "";
  };

  const onClickBreedOption = (optionList) => {
    setPetBreeds((prev) => optionList);
  };

  const onClickCharacteristicOptions = (optionList) => {
    setPetCharacteristicss((prev) => optionList);
  };
  return (
    <div className="m-20 px-40">
      <h2 className="text-5xl mb-10 text-[#7C0F0F] font-semibold uppercase">Upload Pet</h2>
      <form className="flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <div>
            <label htmlFor="pet-name" className="block">
              Pet Name
            </label>
            <input type="text" id="pet-name" name="pet-name" required className={textInputStyles} />
          </div>
          <div>
            <label htmlFor="pet-id" className="block">
              Pet ID
            </label>
            <input type="text" id="pet-id" name="pet-id" required className={textInputStyles} />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-3xl border-b-2">Pet Info</h3>
          <div className="flex gap-10">
            <div>
              <label htmlFor="pet-age" className="block">
                Age (months)
              </label>
              <input type="number" id="pet-age" name="pet-age" className={textInputStyles} min={0} />
            </div>
            <div>
              <label htmlFor="pet-weight" className="block">
                Weight (lbs)
              </label>
              <input type="number" id="pet-weight" name="pet-weight" className={textInputStyles} />
            </div>
          </div>
          <div>
            <label htmlFor="pet-sex" className="block">
              Sex
            </label>
            <select id="pet-sex" name="pet-sex" className={textInputStyles}>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>
          <div>
            <label htmlFor="pet-species" className="block">
              Species
            </label>
            <select id="pet-species" name="pet-species" className={textInputStyles} onChange={onChangeSpecies}>
              <option>Cat</option>
              <option>Dog</option>
            </select>
          </div>
          <div>
            <InputDatalist
              defaultOptions={breedOptions}
              id="pet-breed"
              defaultAnswers={petBreeds}
              placeholder="Choose breeds or type"
              onSubmitAnswer={onClickBreedOption}>
              Breed
            </InputDatalist>
          </div>

          <div>
            <label htmlFor="pet-active-level" className="block">
              Active level
            </label>
            <select id="pet-active-level" name="pet-active-level" className={textInputStyles}>
              <option>High</option>
              <option>Mediums</option>
              <option>Small</option>
            </select>
          </div>
          <div>
            <InputDatalist
              defaultOptions={characteristicsOption}
              id="pet-characteristic"
              defaultAnswers={petCharacteristics}
              placeholder="Choose breeds or type"
              onSubmitAnswer={onClickCharacteristicOptions}>
              Characteristics
            </InputDatalist>
          </div>
        </div>
        <div>
          <h3 className="text-3xl border-b-2">Photos</h3>
          <div>
            <label
              htmlFor="pet-images"
              className="cursor-pointer bg-gray-400 text-white font-semibold p-2 block w-max my-2 rounded-md">
              Upload images
            </label>
            <input
              type="file"
              multiple
              id="pet-images"
              name="pet-images"
              className="hidden"
              accept=".jpg, .jpeg, .png"
              onChange={onChangeInsertImage}
            />
          </div>
          <div>
            <ImageList images={renderedImages} onClickDeleteImage={onChangeDeleteImage} />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-3xl border-b-2">Adoption Fee</h3>
          <div>
            <label htmlFor="pet-age" className="block">
              Fee ($)
            </label>
            <input type="number" id="pet-age" name="pet-age" className={textInputStyles} min={0} />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-3xl border-b-2">About Pet</h3>
          <div>
            <textarea className={`border resize-y ${textInputStyles} min-h-36`} />
          </div>
        </div>
        <div>
          <input
            type="submit"
            value="Upload Pet"
            className="uppercase bg-gradient-to-r from-[#7C0F0F] to-[#C1272D] hover:to-[#7C0F0F] text-white cursor-pointer p-3 font-semibold rounded-md w-full max-w-[720px] hover:scale-105 duration-200 text-xl"
          />
        </div>
      </form>
    </div>
  );
});

function getRandomString(length) {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  const charLength = 36;

  let randomString = "";

  for (let i = 0; i < length; ++i) {
    let idx = Math.floor(Math.random() * charLength);
    if (idx === 36) idx--;
    randomString += characters[idx];
  }

  return randomString;
}

/** 
  Support datalist option
  @param {Object} properties attributes of component
  @param {string} properties.id unique string
  @param {Object} properties.children child components (placed inside label)
  @param {[*]} properties.defaultOptions list of default option when the text is empty
  @param {function(any): void} properties.onSubmitAnswer connect with parent component's state

  @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/datalist MDN Reference}
**/

function InputDatalist({ id, children, placeholder, defaultOptions, onSubmitAnswer, defaultAnswers }) {
  const [focus, setFocus] = useState(false); // the option list only displays when focus is true
  const [answers, setAnswers] = useState(defaultAnswers); // the list of choices
  const [options, setOptions] = useState(defaultOptions); // the list of options
  const [typing, setTyping] = useState(""); // the current text of the datalist

  useEffect(() => {
    setAnswers((prev) => defaultAnswers);
  }, [defaultAnswers]);

  useEffect(() => {
    setOptions((prev) => defaultOptions);
  }, [defaultOptions]);
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

  const onClickRemove = (option) => {
    const newAnswers = [...answers.filter((answer) => answer !== option)];
    onSubmitAnswer(newAnswers);
    setAnswers((prev) => newAnswers);
    setOptions((prev) => [...prev, option]);
  };
  const onChangeTyping = (event) => {
    setTyping((preState) => event.target.value);
  };

  return (
    <>
      {/* The input text and the option container */}
      <div onMouseOver={onFocus} onMouseOut={onBlur} className="relative w-full max-w-[720px]">
        {/* The input text container */}
        <label htmlFor={id}>{children}</label>
        <input
          type="text"
          name={id}
          id={id}
          placeholder={placeholder}
          value={typing}
          onChange={onChangeTyping}
          className="block p-2 border focus:border-orange-400 outline-0  w-full rounded-md"
        />
        {/* The option container (in fact every option in option list is input[type=button]) */}

        {focus && (
          <div className="flex flex-col absolute w-full z-30 max-h-64 overflow-auto">
            {options
              .filter((option) => !answers.includes(option))
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
            {/* A new option when input text is not empty */}
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

      {/* The answer container */}
      <div>
        <ul className="flex gap-1 max-w-[720px] flex-wrap justify-start mt-2">
          {answers.map((answer) => (
            <li key={answer} className="py-3 px-6 bg-blue-300 text-black flex gap-2 rounded-md">
              <p>{answer}</p>
              <p
                className="bg-red-400 px-2 text-white rounded-md cursor-pointer"
                onClick={onClickRemove.bind(null, answer)}>
                R
              </p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

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
