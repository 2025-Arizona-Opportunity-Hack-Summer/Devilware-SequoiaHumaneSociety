import { useEffect, useState } from "react";
import { useSearchParams, createSearchParams } from "react-router";

import { fetchUpdatePet } from "../../../features/fetchPetRoutes";

import ImageList from "../ImagesList";

function EditPetForm({ pet }) {
  const [renderedImages, setRenderedImages] = useState([]);
  const [storedImages, setStoredImages] = useState([]);
  const [deleteImages, setDeleteImages] = useState([]);
  const [visiblePetInfo, setVisiblePetInfo] = useState(false);
  const [visiblePetPhotos, setVisiblePetPhotos] = useState(false);
  const [updatedPet, setUpdatedPet] = useState(pet);

  useEffect(() => {
    setUpdatedPet((prev) => pet);
    if (pet !== null) {
      const images = [];
      for (let i = 0; i < pet.images.length; ++i) {
        images.push({
          url: pet.imagesURL[i],
          fileName: pet.images[i],
        });
      }

      setRenderedImages((prev) => [...images]);
    }
  }, [pet]);

  if (updatedPet === null) {
    return <></>;
  }

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

  const breedOptions = updatedPet.species === "Cat" ? catBreeds : dogBreeds;

  const onChangeSpecies = (event) => {
    setUpdatedPet((prev) => ({ ...prev, ["species"]: event.target.value, ["breed"]: [] }));
  };

  const onChangeDeleteImage = (fileUrl, fileName) => {
    setStoredImages((prev) => prev.filter((image) => image.name !== fileName));
    setRenderedImages((prev) => prev.filter((image) => image.url !== fileUrl));
    setDeleteImages((prev) => [...prev, fileName]);
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
    setUpdatedPet((prev) => ({ ...prev, ["breed"]: optionList }));
  };

  const onClickCharacteristicOptions = (optionList) => {
    setUpdatedPet((prev) => ({ ...prev, ["characteristics"]: optionList }));
  };

  const handleTextInput = (event) => {
    const { name, value } = event.target;
    setUpdatedPet((prev) => ({ ...prev, [name]: value }));
  };

  const handlerSubmit = async (event) => {
    event.preventDefault();

    const seachParams = createSearchParams({ deleteImages: [...deleteImages] }).toString();

    if (deleteImages.length !== 0) {
      fetch(`http://localhost:4041/images?${seachParams}`, {
        method: "DELETE",
      }).catch((err) => {
        console.log(err);
      });
    }

    if (storedImages.length !== 0) {
      const formData = new FormData();
      for (const file of storedImages) {
        formData.append("images", file);
      }
      fetch("http://localhost:4041/images", {
        method: "POST",
        body: formData,
      });
    }
    const imagesOrignialName = renderedImages.map((image) => image.fileName);

    const body = {
      name: updatedPet.name,
      animal_id: updatedPet.animal_id,
      species: updatedPet.species,
      age: updatedPet.age,
      weight: updatedPet.weight,
      sex: updatedPet.sex,
      breed: updatedPet.breed,
      characteristics: updatedPet.characteristics,
      adoption_fee: updatedPet.adoption_fee,
      images: imagesOrignialName,
      active_level: updatedPet.active_level,
      about: updatedPet.about,
    };
    try {
      const data = await fetchUpdatePet(pet_id, body);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
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
              value={updatedPet.name}
              onChange={handleTextInput}
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
              value={updatedPet.animal_id}
              onChange={handleTextInput}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-3xl border-b-2">Pet Info</h3>
          <p
            onClick={() => {
              setVisiblePetInfo((prev) => !prev);
            }}
            className="cursor-pointer underline text-blue-500">
            {visiblePetInfo === false ? "Show more" : "Show less"}
          </p>
          {visiblePetInfo && (
            <>
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
                    onChange={handleTextInput}
                    value={updatedPet.age}
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
                    onChange={handleTextInput}
                    value={updatedPet.weight}
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
                  onChange={handleTextInput}
                  value={updatedPet.sex}>
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
                  onChange={onChangeSpecies}
                  value={updatedPet.species}>
                  <option value="Cat">Cat</option>
                  <option value="Dog">Dog</option>
                </select>
              </div>
              <div>
                <InputDatalist
                  defaultOptions={breedOptions}
                  id="pet-breed"
                  defaultAnswers={updatedPet.breed}
                  placeholder="Choose breeds or type"
                  onSubmitAnswer={onClickBreedOption}>
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
                  onChange={handleTextInput}
                  value={updatedPet.active_level}>
                  <option value="Very active">Very active</option>
                  <option value="Moderately active">Moderately active</option>
                  <option value="Quietly active">Quietly acitve</option>
                </select>
              </div>
              <div>
                <InputDatalist
                  defaultOptions={characteristicsOption}
                  id="pet-characteristic"
                  defaultAnswers={updatedPet.characteristics}
                  placeholder="Choose characteristics or type"
                  onSubmitAnswer={onClickCharacteristicOptions}>
                  Characteristics
                </InputDatalist>
              </div>
            </>
          )}
        </div>
        <div>
          <h3 className="text-3xl border-b-2">Photos</h3>
          <p
            onClick={() => {
              setVisiblePetPhotos((prev) => !prev);
            }}
            className="cursor-pointer underline text-blue-500">
            {visiblePetPhotos === false ? "Show more" : "Show less"}
          </p>
          {visiblePetPhotos && (
            <>
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
            </>
          )}
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
              onChange={handleTextInput}
              value={updatedPet.adoption_fee}
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
              onChange={handleTextInput}
              placeholder="About the pet..."
              value={updatedPet.about}
            />
          </div>
        </div>
        <div>
          <input
            type="submit"
            value="Edit Pet"
            className="uppercase bg-gradient-to-r from-[#7C0F0F] to-[#C1272D] hover:to-[#7C0F0F] text-white cursor-pointer p-3 font-semibold rounded-md w-full max-w-[720px] hover:scale-105 duration-200 text-xl"
          />
        </div>
      </form>
    </div>
  );
}

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

export default EditPetForm;
