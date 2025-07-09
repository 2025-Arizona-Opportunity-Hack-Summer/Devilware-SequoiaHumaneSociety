import { useEffect, useState } from "react";

import InputCheckbox from "../../../Input/InputCheckbox/InputCheckbox";

function BreedFilter() {
  const [breeds, setBreeds] = useState([]);
  const [breedFilter, setBreedFilter] = useState([]);

  useEffect(() => {
    const API_BASE_URL = import.meta.env.VITE_API_URL;
    const PETS_ENDPOINT = import.meta.env.VITE_PETS_ENDPOINT;

    const url = `${API_BASE_URL}/${PETS_ENDPOINT}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const st = new Set();
        for (const pet of data.content) {
          for (const breed of pet.breed) {
            st.add(breed);
          }
        }

        const uniqueBreed = [];

        for (const pet of st) {
          uniqueBreed.push(pet);
        }

        setBreeds((preState) => uniqueBreed);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (breeds.length === 0) {
    return <></>;
  }

  const onChangeBreedFilter = (event) => {
    const currBreed = event.target.value;

    if (breedFilter.includes(currBreed) === false) {
      setBreedFilter((preState) => [...preState, currBreed]);
    } else {
      setBreedFilter((preState) => preState.filter((speciesItem) => speciesItem != currBreed));
    }
  };

  const BreedCheckboxes = breeds.map((breed) => (
    <InputCheckbox
      id={`filter_${breed}`}
      value={breed}
      inputStyle="hidden checkbox-question-input"
      labelStyle="checkbox-question-label text-center flex-grow"
      checked={breedFilter.includes(breed)}
      onChangeHandler={onChangeBreedFilter}
      key={`filter_${breed}`}>
      {breed}
    </InputCheckbox>
  ));

  return (
    <div className="flex flex-col gap-2">
      <p className="font-medium text-md">Breed</p>
      <div className="flex justify-start gap-3 flex-wrap">{BreedCheckboxes}</div>
    </div>
  );
}

export default BreedFilter;
