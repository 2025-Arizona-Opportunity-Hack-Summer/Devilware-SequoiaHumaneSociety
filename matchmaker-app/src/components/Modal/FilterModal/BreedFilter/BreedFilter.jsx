// import { useEffect, useState } from "react";

// import InputCheckbox from "../../../Input/InputCheckbox/InputCheckbox";
// import { extractUniqueBreeds } from "../../../../utils/petUtils";

// function BreedFilter({ petList, breedFilter, setBreedFilter }) {
//   const [breeds, setBreeds] = useState([]);

//   useEffect(() => {
//     const uniqueBreed = extractUniqueBreeds(petList);

//     setBreeds((preState) => uniqueBreed);
//   }, [petList]);

//   if (breeds.length === 0) {
//     return <></>;
//   }

//   const onChangeBreedFilter = (event) => {
//     const currBreed = event.target.value;

//     if (breedFilter.includes(currBreed) === false) {
//       setBreedFilter((preState) => [...breedFilter, currBreed]);
//     } else {
//       setBreedFilter((preState) => preState.filter((item) => item !== currBreed));
//     }
//   };

//   const BreedCheckboxes = breeds.map((breed) => (
//     <InputCheckbox
//       id={`filter_${breed}`}
//       value={breed}
//       inputStyle="hidden checkbox-question-input"
//       labelStyle="checkbox-question-label text-center flex-grow"
//       checked={breedFilter.includes(breed)}
//       onChangeHandler={onChangeBreedFilter}
//       key={`filter_${breed}`}>
//       {breed}
//     </InputCheckbox>
//   ));

//   return (
//     <div className="flex flex-col gap-2">
//       <p className="font-medium text-md">Breed</p>
//       <div className="flex justify-start gap-3 flex-wrap">{BreedCheckboxes}</div>
//     </div>
//   );
// }

// export default BreedFilter;
