import { useEffect, useState } from "react";

import PetList from "./PetList";

import { fetchGetAllPets } from "../../../features/fetchPetRoutes";

function EditPetList() {
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

  return (
    <div className="m-20">
      <PetList petList={petList} />
    </div>
  );
}

export default EditPetList;
