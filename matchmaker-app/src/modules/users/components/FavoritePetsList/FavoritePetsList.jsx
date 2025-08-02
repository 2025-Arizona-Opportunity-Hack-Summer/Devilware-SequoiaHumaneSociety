import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { userSlice } from "../../../../store/slices/UserInfoSlice";

import { fetchFindFavoritePets } from "../../services/userSevices";

import PetList from "../../../pets/components/PetList/PetList";

import heartImg from "../../../../assets/images/heart-com.svg";

function FavoritePetList({ user }) {
  const userInfo = useSelector((store) => store[userSlice.name]);
  const [petList, setPetList] = useState([]);

  useEffect(() => {
    if (user) {
      fetchFindFavoritePets(user.email)
        .then((data) => setPetList(data))
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
        <h2 className="text-4xl text-[#495057]">No favorites pet here yet</h2>
        <div className="flex items-center gap-2">
          <p className="text-2xl text-[#6c757d]">
            Add the pet you love to your favorites list by tapping the favorite button
          </p>
          <img src={heartImg} alt="heart" className="w-6" />
        </div>
      </div>
    );
  }
  return (
    <div className="px-40 py-20">
      <div>
        <p className="text-5xl text-[#6c757d]">My Favorites ({petList.length})</p>
      </div>
      <div className="mt-10">
        <PetList petList={petList} isLoggedIn={true} setVisibleSignIn={() => {}} />
      </div>
    </div>
  );
}

export default FavoritePetList;
