import { withAuthInfo } from "@propelauth/react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

import { fetchGetPet } from "../../../features/fetchPetRoutes";

import EditPetList from "./AdminPetList";
import OnHoldForm from "./OnHoldForm";
import AdoptedForm from "./AdoptedForm";
import DeletePetForm from "./DeletePetForm";
import EditPetForm from "./EditPetForm";
import AdminPetDescription from "./AdminPetDescription";

export default withAuthInfo(function EditPetRoot() {
  const [seachParams, _] = useSearchParams();
  const [visiblePetForm, setVisiblePetForm] = useState(true);
  const [originalPet, setOriginalPet] = useState(null);
  const pet_id = seachParams.get("pet_id");

  useEffect(() => {
    if (pet_id !== null) {
      fetchGetPet(pet_id)
        .then((data) => {
          const pet = data.content[0];
          setOriginalPet((prev) => pet);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [pet_id]);

  if (pet_id === null) {
    return <EditPetList />;
  }

  if (originalPet === null) {
    return <></>;
  }
  return (
    <div>
      <div className="flex gap-5 mb-10 ">
        <h2
          className="text-xl font-semibold cursor-pointer"
          style={visiblePetForm === true ? { borderBottom: "2px solid blue", color: "black" } : { color: "#adb5bd" }}
          onClick={() => setVisiblePetForm((prev) => true)}>
          Edit pet
        </h2>
        <h2
          className="text-xl text-[#7C0F0F] font-semibold cursor-pointer"
          style={visiblePetForm === false ? { borderBottom: "2px solid blue", color: "black" } : { color: "#adb5bd" }}
          onClick={() => setVisiblePetForm((prev) => false)}>
          Pet description
        </h2>
      </div>

      {visiblePetForm && (
        <>
          <EditPetForm pet={originalPet} />
          <OnHoldForm
            onHoldDate={originalPet.onHoldDate}
            onHoldEmail={originalPet.onHoldEmail}
            pet_id={pet_id}
            adoptedEmail={originalPet.adoptedEmail}
          />
          <AdoptedForm adoptedDate={originalPet.adoptedDate} adoptedEmail={originalPet.adoptedEmail} pet_id={pet_id} />
          <DeletePetForm pet_id={pet_id} />
        </>
      )}
      {!visiblePetForm && <AdminPetDescription data={originalPet} />}
    </div>
  );
});
