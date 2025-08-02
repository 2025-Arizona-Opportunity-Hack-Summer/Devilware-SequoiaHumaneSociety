import AdminPetInfo from "./AdminPetInfo";
import InputText from "../../../../../components/common/inputs/InputText";
import InputButton from "../../../../../components/common/inputs/InputButton";

import { useEffect, useState } from "react";

import { fetchFindPets } from "../../../services/petServices";
import { isSubString } from "../../../../../utils/helperFunction";
import searchImg from "../../../../../assets/images/search-com.svg";

function AdminPetList({ onClickMoveTo }) {
  const [petList, setPetList] = useState([]);
  const [searchPet, setSearchPet] = useState("");

  useEffect(() => {
    fetchFindPets(null, true)
      .then((data) => {
        setPetList((prev) => data.pets);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let petsFilter = petList;

  if (searchPet !== "") {
    petsFilter = petList.filter((pet) => isSubString(searchPet, pet.name));
  }

  const petsRender = petsFilter.map((pet) => (
    <li key={pet._id}>
      <AdminPetInfo pet={pet} onClickMoveTo={onClickMoveTo} />
    </li>
  ));

  return (
    <div className="flex flex-col items-start">
      <p className="text-xl font-semibold text-[#adb5bd] mb-5">Click on the pet to edit or delete</p>
      <div className="flex w-[80%] px-3 p-2 items-center shadow-[5px_5px_5px_#00000040] filter-text-container border-2 border-transparent">
        <img src={searchImg} alt="search" className="w-4 h-4 mr-3" />
        <InputText
          id="searchMachtedPet"
          inputStyle="w-full focus:border-0 focus:outline-0"
          placeholder="Search for a pet"
          value={searchPet}
          onChangeHandler={(event) => setSearchPet(event.target.value)}
        />
        <InputButton
          id="clearText"
          inputStyle="hidden"
          labelStyle="cursor-pointer font-semibold"
          onClickHandler={() => setSearchPet((prev) => "")}>
          x
        </InputButton>
      </div>
      <ul className="flex flex-wrap gap-20 justify-start mt-20">{petsRender}</ul>
    </div>
  );
}

export default AdminPetList;
