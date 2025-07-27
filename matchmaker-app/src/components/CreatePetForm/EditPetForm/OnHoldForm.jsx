import { useEffect, useState } from "react";
import { fetchSetPetOnHold } from "../../../features/fetchPetRoutes";

function OnHoldForm({ onHoldEmail, onHoldDate, pet_id }) {
  const [date, setDate] = useState(onHoldDate);
  const [userEmail, setUserEmail] = useState(onHoldEmail);
  const [email, setEmail] = useState(onHoldEmail);

  useEffect(() => {
    setEmail((prev) => onHoldEmail);
    setDate((prev) => onHoldDate);
    setUserEmail((prev) => onHoldEmail);
  }, [onHoldEmail]);
  const textInputStyles =
    "border rounded-lg p-2 focus:border-orange-500  outline-0 w-full max-w-[720px] italic font-[500]";
  const buttonStyles =
    "p-3 disabled:bg-[#ced4da] disabled:text-white font-semibold rounded-md cursor-pointer disabled:cursor-default enabled:hover:scale-110 duration-200 border border-[#7251b5] disabled:border-none";

  const submitHandler = async (event) => {
    event.preventDefault();
    if (email !== "") {
      setUserEmail((prev) => email);

      await fetchSetPetOnHold(pet_id, email).catch((err) => {
        console.log(err);
      });

      location.reload();
    }
  };

  const onClickRemoveOnHold = async () => {
    setUserEmail((prev) => null);
    setEmail((prev) => null);
    setDate((prev) => null);

    location.reload();
  };

  return (
    <div className="mt-20 flex flex-col gap-2">
      <h3 className="text-3xl border-b-2">On hold pet</h3>
      <p className="font-semibold text-[#6c757d]">
        On hold pets are pets having visit scheduling with the user. They will be temporary hidden from other users'
        page.
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
            value="Remove this pet on hold"
            disabled={userEmail === null}
            className={`${buttonStyles} text-[#7251b5]`}
            onClick={onClickRemoveOnHold}
          />
          <input
            type="submit"
            value="Set this pet on hold"
            disabled={userEmail !== null}
            className={`${buttonStyles} bg-[#7251b5] text-white`}
          />
        </div>
      </form>
    </div>
  );
}

export default OnHoldForm;
