import PetInfo from "./AdminPetInfo";

import { useEffect, useState } from "react";

import { fetchGetAllPets } from "../../../features/fetchPetRoutes";

function AdminPetList() {
  const [petList, setPetList] = useState([]);

  useEffect(() => {
    fetchGetAllPets()
      .then((data) => {
        setPetList((prev) => data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const petsRender = petList.map((pet) => (
    <li key={pet._id}>
      <PetInfo pet={pet} />
    </li>
  ));

  return (
    <div className="flex flex-col items-start ">
      <p className="text-xl font-semibold text-[#adb5bd]">Click on the pet to edit or delete</p>
      <ul className="flex flex-wrap gap-20 justify-start mt-20">{petsRender}</ul>
    </div>
  );
}

export default AdminPetList;
