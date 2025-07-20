import { withRequiredAuthInfo } from "@propelauth/react";
import { useSelector } from "react-redux";

import { userSlice } from "../../redux/UserInfoSlice";
import { fetchGetPet } from "../../features/fetchPetRoutes";

import SignIn from "../SignIn/SignIn";
import PetList from "../../components/MatchedPets/PetList/PetList";

import { useEffect, useState } from "react";
import heartImg from "../../assets/images/heart-com.svg";

export default withRequiredAuthInfo(
  function FavoritePage() {
    const user = useSelector((store) => store[userSlice.name]);
    const [petList, setPetList] = useState([]);

    useEffect(() => {
      if (user !== null && user.favoritePets.length > 0) {
        fetchGetPet(user.favoritePets, undefined, undefined)
          .then((data) => setPetList(data.content))
          .catch((err) => {
            console.log(err);
          });
      } else if (user !== null && user.favoritePets.length === 0) {
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
  },
  { displayIfLoggedOut: <SignIn /> }
);
