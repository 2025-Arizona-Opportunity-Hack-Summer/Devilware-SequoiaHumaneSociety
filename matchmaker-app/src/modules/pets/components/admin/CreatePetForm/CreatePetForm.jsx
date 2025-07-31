import { withAuthInfo } from "@propelauth/react";
import { useEffect, useState } from "react";

import { fetchCreatePet } from "../../../services/PetServices";
import ImageList from "../ImageList/ImageList";
import { isSubString } from "../../../../../utils/helperFunction";

import { catBreeds, dogBreeds } from "../../../context/petBreeds";
import { petCharacteristicsList } from "../../../context/petCharacteristics";
import useCreatePetForm from "../../../hooks/useCreatePetForm";

export default withAuthInfo(function CreatePetForm() {
  const [
    petData,
    renderedImages,
    storedImages,
    handlerTextInputChange,
    handlerListInputChange,
    handlerInsertImage,
    handlerDeleteImage,
    handlerResetForm,
  ] = useCreatePetForm();
  const textInputStyles =
    "border rounded-lg p-2 focus:border-orange-500  outline-0 w-full max-w-[720px]  [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300";

  const characteristicsOption = petCharacteristicsList;

  const breedOptions = petData.species === "Cat" ? catBreeds : dogBreeds;

  const handlerSubmit = async (event) => {
    event.preventDefault();

    if (storedImages.length !== 0) {
      const formData = new FormData();

      for (const file of storedImages) {
        formData.append("images", file);
      }
      const endpoint = `${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_IMAGE_ENDPOINT}`;

      fetch(endpoint, {
        method: "POST",
        body: formData,
      });
    }

    const imageFileNameOnly = storedImages.map((image) => image.name);

    const body = {
      name: petData.name,
      animal_id: petData.animal_id,
      species: petData.species,
      age: petData.age,
      weight: petData.weight,
      sex: petData.sex,
      breed: petData.breed,
      characteristics: petData.characteristics,
      adoption_fee: petData.adoption_fee,
      images: imageFileNameOnly,
      active_level: petData.active_level,
      about: petData.about,
    };

    try {
      await fetchCreatePet(body);
      handlerResetForm();
    } catch (err) {
      console.log(err);
    }
  };

  console.log(petData);
  return (
    <div>
      <h2 className="text-5xl mb-10 text-[#7C0F0F] font-semibold uppercase">Upload Pet</h2>
      <form className="flex flex-col gap-10" onSubmit={handlerSubmit}>
        <div className="flex flex-col gap-2">
          <div>
            <label htmlFor="name" className="block">
              Pet Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className={textInputStyles}
              onChange={handlerTextInputChange}
              value={petData.name}
              autoComplete="off"
            />
          </div>
          <div>
            <label htmlFor="animal_id" className="block">
              Pet ID
            </label>
            <input
              type="text"
              id="animal_id"
              name="animal_id"
              required
              className={textInputStyles}
              onChange={handlerTextInputChange}
              value={petData.animal_id}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-3xl border-b-2">Pet Info</h3>
          <div className="flex gap-10">
            <div>
              <label htmlFor="age" className="block">
                Age (months)
              </label>
              <input
                type="number"
                id="age"
                name="age"
                className={textInputStyles}
                min={0}
                onChange={handlerTextInputChange}
                value={petData.age}
              />
            </div>
            <div>
              <label htmlFor="weight" className="block">
                Weight (lbs)
              </label>
              <input
                type="number"
                id="weight"
                name="weight"
                className={textInputStyles}
                onChange={handlerTextInputChange}
                value={petData.weight}
              />
            </div>
          </div>
          <div>
            <label htmlFor="sex" className="block">
              Sex
            </label>
            <select
              id="sex"
              name="sex"
              className={textInputStyles}
              onChange={handlerTextInputChange}
              value={petData.sex}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div>
            <label htmlFor="species" className="block">
              Species
            </label>
            <select
              id="species"
              name="species"
              className={textInputStyles}
              onChange={handlerTextInputChange}
              value={petData.species}>
              <option value="Cat">Cat</option>
              <option value="Dog">Dog</option>
            </select>
          </div>
          <div>
            <InputDatalist
              defaultOptions={breedOptions}
              id="breed"
              defaultAnswers={petData.breed}
              placeholder="Choose breeds or type"
              onSubmitAnswer={handlerListInputChange("breed")}>
              Breed
            </InputDatalist>
          </div>

          <div>
            <label htmlFor="active_level" className="block">
              Active level
            </label>
            <select
              id="active_level"
              name="active_level"
              className={textInputStyles}
              onChange={handlerTextInputChange}
              value={petData.active_level}>
              <option value="Very active">Very active</option>
              <option value="Moderately active">Moderately active</option>
              <option value="Quietly active">Quietly acitve</option>
            </select>
          </div>
          <div>
            <InputDatalist
              defaultOptions={characteristicsOption}
              id="characteristic"
              defaultAnswers={petData.characteristics}
              placeholder="Choose breeds or type"
              onSubmitAnswer={handlerListInputChange("characteristic")}>
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
              onChange={handlerInsertImage}
            />
          </div>
          <div>
            <ImageList images={renderedImages} onClickDeleteImage={handlerDeleteImage} />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-3xl border-b-2">Adoption Fee</h3>
          <div>
            <label htmlFor="adoption_fee" className="block">
              Fee ($)
            </label>
            <input
              type="number"
              id="adoption_fee"
              name="adoption_fee"
              className={textInputStyles}
              min={0}
              onChange={handlerTextInputChange}
              value={petData.adoption_fee}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-3xl border-b-2">About Pet</h3>
          <div>
            <textarea
              id="about"
              name="about"
              className={`border resize-y ${textInputStyles} min-h-36`}
              onChange={handlerTextInputChange}
              placeholder="About the pet..."
              value={petData.about}
            />
          </div>
        </div>
        <div>
          <input
            type="submit"
            value="Upload Pet"
            className="uppercase bg-gradient-to-r from-[#52b788] to-[#2d6a4f] text-white cursor-pointer p-3 font-semibold rounded-md w-full max-w-[720px] hover:scale-105 duration-200 text-xl"
          />
        </div>
      </form>
    </div>
  );
});

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
