import { useState } from "react";
import { useNavigate } from "react-router";
import { fetchDeleletePet } from "../../../../services/petServices";

function DeletePetForm({ pet_id }) {
  const [deleteText, setDeleteText] = useState("");
  const navigate = useNavigate();

  const textInputStyles =
    "border rounded-lg p-2 focus:border-orange-500  outline-0 w-full max-w-[720px] italic font-[500]";
  const buttonStyles =
    "p-3 disabled:bg-[#ced4da] disabled:text-white font-semibold rounded-md cursor-pointer disabled:cursor-default enabled:hover:scale-110 duration-200 border border-[#ff4d6d] disabled:border-none";

  const submitHandler = async (event) => {
    event.preventDefault();
    console.log(deleteText);
    if (deleteText === "delete permanently") {
      await fetchDeleletePet(pet_id);
      navigate({ pathname: "/petadmin/edit", search: "" });
      location.reload();
    }
  };

  return (
    <div className="mt-20 flex flex-col gap-2">
      <h3 className="text-3xl border-b-2">Delete pet</h3>
      <p className="font-semibold text-[#6c757d] lg:max-w-[720px]">
        One good example of a deleted pet is when the pet has been adopted within a long time (2 weeks or more).
      </p>
      <p className="font-semibold lg:max-w-[720px]">
        Type <span className="italic">delete permanently </span>in the below box to delete the pet. Note: This process
        cannot be undone
      </p>
      <form id="delete-pet" onSubmit={submitHandler}>
        <div>
          <label htmlFor="delete-text" className="block">
            User Email
          </label>
          <input
            type="text"
            id="delete-text"
            name="delete-text"
            required
            className={textInputStyles}
            placeholder="delete permanently"
            onChange={(event) => setDeleteText(event.target.value)}
            value={deleteText}
          />
        </div>

        <div className="flex gap-5 mt-5">
          <input type="submit" value="Delete this pet" className={`${buttonStyles} bg-[#ff4d6d] text-white`} />
        </div>
      </form>
    </div>
  );
}

export default DeletePetForm;
