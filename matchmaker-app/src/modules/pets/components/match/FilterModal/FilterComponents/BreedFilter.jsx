import { useEffect, useState } from "react";

import InputCheckbox from "../../../../../../components/common/inputs/InputCheckbox";

import { extractUniqueBreeds } from "../../../../utils/petUtils";
import { isCatSpecies } from "../../../../utils/petUtils";

function BreedFilter({ petList, breedFilter, setBreedFilter }) {
  const [breeds, setBreeds] = useState([]);

  useEffect(() => {
    const uniqueBreed = extractUniqueBreeds(petList);

    setBreeds((preState) => uniqueBreed);
  }, [petList]);

  if (breeds.length === 0) {
    return <></>;
  }

  const onChangeBreedFilter = (event) => {
    const currBreed = event.target.value;

    if (breedFilter.includes(currBreed) === false) {
      setBreedFilter((preState) => [...breedFilter, currBreed]);
    } else {
      setBreedFilter((preState) => preState.filter((item) => item !== currBreed));
    }
  };

  const catBreed = [];
  const dogBreed = [];

  const BreedCheckboxes = breeds.forEach((breed) => {
    const inputCheckboxRender = (
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
    );
    if (isCatSpecies(breed)) {
      catBreed.push(inputCheckboxRender);
    } else {
      dogBreed.push(inputCheckboxRender);
    }
  });

  return (
    <div className="flex flex-col gap-2">
      <p className="font-medium text-md">Breed (cat)</p>
      <div className="flex justify-start gap-3 flex-wrap">{catBreed}</div>
      <p className="font-medium text-md">Breed (dog)</p>
      <div className="flex justify-start gap-3 flex-wrap">{dogBreed}</div>
    </div>
  );
}

export default BreedFilter;
