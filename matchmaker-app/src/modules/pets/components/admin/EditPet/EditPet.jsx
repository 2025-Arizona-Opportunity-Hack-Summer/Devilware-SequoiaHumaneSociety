import { withAuthInfo } from "@propelauth/react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

import { fetchFindPetById } from "../../../services/petServices";

import EditPetForm from "./EditPetComponents/EditPetForm";
import AdoptedForm from "./EditPetComponents/AdoptedForm";
import OnHoldForm from "./EditPetComponents/OnHoldForm";
import DeletePetForm from "./EditPetComponents/DeletePetForm";
import AdminPetList from "../AdminPet/AdminPetList";
import AdminPetDescription from "../AdminPet/AdminPetDescription";

import useEditPetForm from "../../../hooks/useEditPetForm";

export default withAuthInfo(function EditPetRoot() {
  const [seachParams] = useSearchParams();
  const pet_id = seachParams.get("pet_id");

  const [data, setData] = useEditPetForm();

  const { petData, visibleEditPetForm } = data;
  const { handlerAssignData, openEditPetForm, openPetDescription } = setData;

  console.log(petData);
  useEffect(() => {
    if (pet_id !== null) {
      fetchFindPetById(pet_id)
        .then((data) => {
          handlerAssignData(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [pet_id]);

  if (pet_id === null) {
    return <AdminPetList />;
  }

  console.log(petData);
  if (petData === null) {
    return <></>;
  }
  return (
    <div>
      <div className="flex gap-5 mb-10 ">
        <h2
          className="text-xl font-semibold cursor-pointer"
          style={
            visibleEditPetForm === true ? { borderBottom: "2px solid blue", color: "black" } : { color: "#adb5bd" }
          }
          onClick={openEditPetForm}>
          Edit pet
        </h2>
        <h2
          className="text-xl text-[#7C0F0F] font-semibold cursor-pointer"
          style={
            visibleEditPetForm === false ? { borderBottom: "2px solid blue", color: "black" } : { color: "#adb5bd" }
          }
          onClick={openPetDescription}>
          Pet description
        </h2>
      </div>

      {visibleEditPetForm && (
        <>
          <EditPetForm data={data} setData={setData} pet_id={pet_id} />
          <OnHoldForm
            onHoldDate={petData.on_hold_date}
            onHoldEmail={petData.on_hold_email}
            pet_id={pet_id}
            adoptedEmail={petData.adopted_email}
          />
          <AdoptedForm adoptedDate={petData.adopted_date} adoptedEmail={petData.adopted_email} pet_id={pet_id} />
          <DeletePetForm pet_id={pet_id} />
        </>
      )}
      {!visibleEditPetForm && <AdminPetDescription petData={petData} />}
    </div>
  );
});
