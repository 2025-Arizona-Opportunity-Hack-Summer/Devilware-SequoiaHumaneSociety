import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { userSlice } from "../../../../store/slices/UserInfoSlice";

import { fetchFindAdoptedPets } from "../../services/userSevices";

import AdoptedPetInfo from "./AdoptedPetInfo";

function AdoptedPetsList({ user }) {
  const userInfo = useSelector((store) => store[userSlice.name]);
  const [petList, setPetList] = useState([]);

  useEffect(() => {
    if (user) {
      fetchFindAdoptedPets(user.email)
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
        <h2 className="text-4xl text-[#495057]">No adopted pet here yet</h2>
      </div>
    );
  }
  return (
    <div>
      <div>
        <p className="text-4xl text-[#6c757d]">Adopted Pets ({petList.length})</p>
      </div>
      <div className="mt-10">
        {petList.map((pet) => (
          <AdoptedPetInfo
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

export default AdoptedPetsList;
