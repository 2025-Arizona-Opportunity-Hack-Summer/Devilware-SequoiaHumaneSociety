import { withAuthInfo } from "@propelauth/react";
import { useEffect, useState } from "react";
import { useSearchParams, createSearchParams } from "react-router";

import { fetchGetPet, fetchUpdatePet } from "../../../features/fetchPetRoutes";

import ImageList from "../ImagesList";
import EditPetList from "./EditPetList";
import OnHoldForm from "./OnHoldForm";
import AdoptedForm from "./AdoptedForm";
import DeletePetForm from "./DeletePetForm";

export default withAuthInfo(function EditPetForm() {
  const [seachParams, _] = useSearchParams();
  const [renderedImages, setRenderedImages] = useState([]);
  const [storedImages, setStoredImages] = useState([]);
  const [petName, setPetName] = useState("");
  const [petId, setPetId] = useState("");
  const [petAge, setPetAge] = useState(0);
  const [petWeight, setPetWeight] = useState(0);
  const [petSex, setPetSex] = useState("Male");
  const [petSpecies, setPetSpecies] = useState("Cat");
  const [petBreeds, setPetBreeds] = useState([]);
  const [petActiveLevel, setPetActiveLevel] = useState("Very active");
  const [petCharacteristics, setPetCharacteristicss] = useState([]);
  const [petAdoptionFee, setPetAdoptionFee] = useState([]);
  const [petAbout, setPetAbout] = useState("");
  const [deleteImages, setDeleteImages] = useState([]);
  const [visiblePetInfo, setVisiblePetInfo] = useState(false);
  const [visiblePetPhotos, setVisiblePetPhotos] = useState(false);
  const [onHoldEmail, setOnHoldEmail] = useState(null);
  const [onHoldDate, setOnHoldDate] = useState(null);
  const [adoptedEmail, setAdoptedEmail] = useState(null);
  const [adoptedDate, setAdoptedDate] = useState(null);

  const pet_id = seachParams.get("pet_id");

  useEffect(() => {
    if (pet_id !== null) {
      fetchGetPet(pet_id)
        .then((data) => {
          const pet = data.content[0];
          setPetName((prev) => pet.name);
          setPetId((prev) => pet.animal_id);
          setPetAge((prev) => pet.age);
          setPetWeight((prev) => pet.weight);
          setPetSex((prev) => pet.sex);
          setPetSpecies((prev) => pet.species);
          setPetBreeds((prev) => pet.breed);
          setPetActiveLevel((prev) => pet.active_level);
          setPetCharacteristicss((prev) => pet.characteristics);
          setPetAdoptionFee((prev) => pet.adoption_fee);
          setPetAbout((prev) => pet.about);
          setOnHoldDate((prev) => pet.onHoldDate);
          setOnHoldEmail((prev) => pet.onHoldEmail);
          setAdoptedEmail((prev) => pet.adoptedEmail);
          setAdoptedDate((prev) => pet.adoptedDate);
          const images = [];
          for (let i = 0; i < pet.images.length; ++i) {
            images.push({
              url: pet.imagesURL[i],
              fileName: pet.images[i],
            });
          }

          setRenderedImages((prev) => [...images]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [pet_id]);

  if (pet_id === null) {
    return <EditPetList />;
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

  const breedOptions = petSpecies === "Cat" ? catBreeds : dogBreeds;

  const onChangeSpecies = (event) => {
    setPetSpecies((prev) => event.target.value);
    setPetBreeds((prev) => []);
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
    setPetBreeds((prev) => optionList);
  };

  const onClickCharacteristicOptions = (optionList) => {
    setPetCharacteristicss((prev) => optionList);
  };

  const handlerSubmit = async (event) => {
    event.preventDefault();

    const seachParams = createSearchParams({ deleteImages: [...deleteImages] }).toString();

    console.log(`http://localhost:4041/images?${seachParams}`);
    if (deleteImages.length !== 0) {
      fetch(`http://localhost:4041/images?${seachParams}`, {
        method: "DELETE",
      }).catch((err) => {
        console.log(err);
      });
    }

    console.log(storedImages);
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
      name: petName,
      animal_id: petId,
      species: petSpecies,
      age: petAge,
      weight: petWeight,
      sex: petSex,
      breed: petBreeds,
      characteristics: petCharacteristics,
      adoption_fee: petAdoptionFee,
      images: imagesOrignialName,
      active_level: petActiveLevel,
      about: petAbout,
    };
    try {
      const data = await fetchUpdatePet(pet_id, body);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <h2 className="text-5xl mb-10 text-[#7C0F0F] font-semibold uppercase">Edit Pet</h2>
      <form className="flex flex-col gap-10" onSubmit={handlerSubmit}>
        <div className="flex flex-col gap-2">
          <div>
            <label htmlFor="pet-name" className="block">
              Pet Name
            </label>
            <input
              type="text"
              id="pet-name"
              name="pet-name"
              required
              className={textInputStyles}
              onChange={(event) => {
                setPetName((prev) => event.target.value);
              }}
              value={petName}
            />
          </div>
          <div>
            <label htmlFor="pet-id" className="block">
              Pet ID
            </label>
            <input
              type="text"
              id="pet-id"
              name="pet-id"
              required
              className={textInputStyles}
              value={petId}
              onChange={(event) => {
                setPetId(event.target.value);
              }}
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
                  <label htmlFor="pet-age" className="block">
                    Age (months)
                  </label>
                  <input
                    type="number"
                    id="pet-age"
                    name="pet-age"
                    className={textInputStyles}
                    min={0}
                    onChange={(event) => {
                      setPetAge((prev) => event.target.value);
                    }}
                    value={petAge}
                  />
                </div>
                <div>
                  <label htmlFor="pet-weight" className="block">
                    Weight (lbs)
                  </label>
                  <input
                    type="number"
                    id="pet-weight"
                    name="pet-weight"
                    className={textInputStyles}
                    onChange={(event) => {
                      setPetWeight((prev) => event.target.value);
                    }}
                    value={petWeight}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="pet-sex" className="block">
                  Sex
                </label>
                <select
                  id="pet-sex"
                  name="pet-sex"
                  className={textInputStyles}
                  onChange={(event) => {
                    setPetSex((prev) => event.target.value);
                  }}
                  value={petSex}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div>
                <label htmlFor="pet-species" className="block">
                  Species
                </label>
                <select
                  id="pet-species"
                  name="pet-species"
                  className={textInputStyles}
                  onChange={onChangeSpecies}
                  value={petSpecies}>
                  <option value="Cat">Cat</option>
                  <option value="Dog">Dog</option>
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
                <select
                  id="pet-active-level"
                  name="pet-active-level"
                  className={textInputStyles}
                  onChange={(event) => setPetActiveLevel(event.target.value)}
                  value={petActiveLevel}>
                  <option value="Very active">Very active</option>
                  <option value="Moderately active">Moderately active</option>
                  <option value="Quietly active">Quietly acitve</option>
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
              {" "}
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
            <label htmlFor="pet-fee" className="block">
              Fee ($)
            </label>
            <input
              type="number"
              id="pet-fee"
              name="pet-fee"
              className={textInputStyles}
              min={0}
              onChange={(event) => setPetAdoptionFee((prev) => event.target.value)}
              value={petAdoptionFee}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-3xl border-b-2">About Pet</h3>
          <div>
            <textarea
              id="pet-about"
              className={`border resize-y ${textInputStyles} min-h-36`}
              onChange={(event) => setPetAbout(event.target.value)}
              placeholder="About the pet..."
              value={petAbout}
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
      <OnHoldForm onHoldDate={onHoldDate} onHoldEmail={onHoldEmail} pet_id={pet_id} adoptedEmail={adoptedEmail} />
      <AdoptedForm adoptedDate={adoptedDate} adoptedEmail={adoptedEmail} pet_id={pet_id} />
      <DeletePetForm pet_id={pet_id} />
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
