import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { userSlice } from "../../../../store/slices/UserInfoSlice";

import { fetchFindOnHoldPets } from "../../services/userSevices";

import OnHoldPetInfo from "./OnHoldPetInfo";

function OnHoldPetList({ user }) {
  const userInfo = useSelector((store) => store[userSlice.name]);
  const [petList, setPetList] = useState([]);

  useEffect(() => {
    if (user) {
      fetchFindOnHoldPets(user.email)
        .then((data) => setPetList((prev) => data))
        .catch((err) => {
          console.log(err);
        });
    } else if (userInfo !== null && userInfo.favoritePets.length === 0) {
      setPetList((prev) => []);
    }
  }, [user]);

  if (petList.length === 0) {
    return (
      <div className="px-40 py-20 flex flex-col items-center gap-10">
        <h2 className="text-4xl text-[#495057]">No on-hold pets here yet</h2>
        <div className="flex items-center gap-2">
          <p className="text-2xl text-[#6c757d]">
            On-hold pets are pets with a visit scheduled with the user. Let us know who you are interested in adopting
            and place a hold on the animal for one business day to meet with them without a hold fee.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div>
        <p className="text-4xl text-[#6c757d]">On-hold pets ({petList.length})</p>
        <p className="text-xl text-[#6c757d] mt-5">You have one business day to meet with them without a hold fee.</p>
      </div>
      <div className="mt-10">
        {petList.map((pet) => (
          <OnHoldPetInfo
            pet={pet}
            setVisibleSignIn={() => {}}
            isLoggedIn={true}
            isFavorite={userInfo.favoritePets.includes(pet._id)}
          />
        ))}
      </div>
    </div>
  );
}

export default OnHoldPetList;
