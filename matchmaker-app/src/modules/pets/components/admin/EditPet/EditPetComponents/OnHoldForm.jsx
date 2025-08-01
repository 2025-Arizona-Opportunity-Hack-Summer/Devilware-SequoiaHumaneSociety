import { useEffect, useState } from "react";
import { fetchSetPetOnHold } from "../../../../services/petServices";

function OnHoldForm({ onHoldEmail, onHoldDate, pet_id, adoptedEmail }) {
  const [date, setDate] = useState(onHoldDate);
  const [email, setEmail] = useState(onHoldEmail);

  useEffect(() => {
    setEmail((prev) => onHoldEmail);
    setDate((prev) => onHoldDate);
  }, [onHoldEmail]);

  const textInputStyles =
    "border rounded-lg p-2 focus:border-orange-500  outline-0 w-full max-w-[720px] italic font-[500] disabled:bg-[#ced4da]";
  const buttonStyles =
    "p-3 disabled:bg-[#ced4da] disabled:text-white font-semibold rounded-md cursor-pointer disabled:cursor-default enabled:hover:scale-110 duration-200 border border-[#7251b5] disabled:border-none";

  const submitHandler = async (event) => {
    event.preventDefault();
    if (email !== "") {
      await fetchSetPetOnHold(pet_id, email).catch((err) => {
        console.log(err);
      });

      location.reload();
    }
  };

  const onClickRemoveOnHold = async () => {
    setEmail((prev) => null);
    setDate((prev) => null);

    await fetchSetPetOnHold(pet_id, email).catch((err) => {
      console.log(err);
    });
    location.reload();
  };

  return (
    <div className="mt-20 flex flex-col gap-2">
      <h3 className="text-3xl border-b-2">On-Hold Pet</h3>
      <p className="font-semibold text-[#6c757d] lg:max-w-[720px]">
        On-hold pets are pets with a visit scheduled with the user. They will be temporarily hidden from other users'
        pages.
      </p>
      <form id="on-hold-pet" onSubmit={submitHandler}>
        <div>
          <label htmlFor="on-hold-user" className="block">
            User Email
          </label>
          <input
            type="text"
            id="on-hold-user"
            name="on-hold-user"
            required
            className={textInputStyles}
            placeholder="john.doe@gmail.com"
            onChange={(event) => setEmail(event.target.value)}
            value={email === null ? "" : email}
            disabled={onHoldEmail !== null || adoptedEmail !== null}
          />
        </div>
        {date !== null && (
          <div>
            <p>On hold date: {new Date(date).toLocaleDateString()}</p>
          </div>
        )}

        <div className="flex gap-5 mt-5">
          <input
            type="button"
            value="Remove this pet from on-hold list"
            disabled={onHoldEmail === null}
            className={`${buttonStyles} text-[#7251b5]`}
            onClick={onClickRemoveOnHold}
          />
          <input
            type="submit"
            value="Set this pet to be on-hold"
            disabled={onHoldEmail !== null || adoptedEmail !== null}
            className={`${buttonStyles} bg-[#7251b5] text-white`}
          />
        </div>
      </form>
    </div>
  );
}

export default OnHoldForm;
