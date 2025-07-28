import { useEffect, useState } from "react";
import { fetchSetPetAdopted } from "../../../features/fetchPetRoutes";

function AdoptedForm({ adoptedEmail, adoptedDate, pet_id }) {
  const [date, setDate] = useState(adoptedDate);
  const [userEmail, setUserEmail] = useState(adoptedEmail);
  const [email, setEmail] = useState(adoptedEmail);

  useEffect(() => {
    setEmail((prev) => adoptedEmail);
    setDate((prev) => adoptedDate);
    setUserEmail((prev) => adoptedEmail);
  }, [adoptedEmail]);

  const textInputStyles =
    "border rounded-lg p-2 focus:border-orange-500  outline-0 w-full max-w-[720px] italic font-[500]";
  const buttonStyles =
    "p-3 disabled:bg-[#ced4da] disabled:text-white font-semibold rounded-md cursor-pointer disabled:cursor-default enabled:hover:scale-110 duration-200 border border-[#127475] disabled:border-none";

  const submitHandler = async (event) => {
    event.preventDefault();
    if (email !== "") {
      setUserEmail((prev) => email);

      await fetchSetPetAdopted(pet_id, email).catch((err) => {
        console.log(err);
      });

      location.reload();
    }
  };

  const onClickRemoveOnHold = async () => {
    setUserEmail((prev) => null);
    setEmail((prev) => null);
    setDate((prev) => null);

    await fetchSetPetAdopted(pet_id, email).catch((err) => {
      console.log(err);
    });
    location.reload();
  };

  return (
    <div className="mt-20 flex flex-col gap-2">
      <h3 className="text-3xl border-b-2">Newly Adopted Pet</h3>
      <p className="font-semibold text-[#6c757d] lg:max-w-[720px]">
        Newly adopted pets are pets that have been adopted within a short time. In other words, they are pets with a
        high chance of being returned to the shelter. Additionally, they will be temporarily hidden from other users'
        pages.
      </p>
      <p className="font-semibold text-[#6c757d] text-sm lg:max-w-[720px]">
        Note: Newly adopted pets have higher priority than on-hold pets. Once you set the pet to be newly adopted, the
        email in this on-hold pet will be removed.
      </p>
      <form id="adopted-pet" onSubmit={submitHandler}>
        <div>
          <label htmlFor="adopted-user" className="block">
            User Email
          </label>
          <input
            type="text"
            id="adopted-user"
            name="adopted-user"
            required
            className={textInputStyles}
            placeholder="john.doe@gmail.com"
            onChange={(event) => setEmail(event.target.value)}
            value={email === null || email === undefined ? "" : email}
          />
        </div>
        {date !== null && date !== undefined && (
          <div>
            <p>Adopted date: {new Date(date).toLocaleDateString()}</p>
          </div>
        )}

        <div className="flex gap-5 mt-5">
          <input
            type="button"
            value="Remove this pet from newly adopted list"
            disabled={userEmail === null || userEmail === undefined}
            className={`${buttonStyles} text-[#127475]`}
            onClick={onClickRemoveOnHold}
          />
          <input
            type="submit"
            value="Set this pet to be newly adopted"
            disabled={userEmail !== null && userEmail !== undefined}
            className={`${buttonStyles} bg-[#127475] text-white`}
          />
        </div>
      </form>
    </div>
  );
}

export default AdoptedForm;
