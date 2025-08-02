import { useSelector } from "react-redux";
import { withAuthInfo } from "@propelauth/react";
import { userSlice } from "../../../../store/slices/UserInfoSlice";
import PetInfo from "./PetInfo";

export default withAuthInfo(function PetList({ petList = [], className, setVisibleSignIn, isLoggedIn }) {
  const user = useSelector((store) => store[userSlice.name]);

  const petsRender = petList.map((pet) => (
    <li key={pet._id}>
      <PetInfo
        pet={pet}
        setVisibleSignIn={setVisibleSignIn}
        isFavorite={isLoggedIn && user !== null ? user.favoritePets.includes(pet._id) : false}
      />
    </li>
  ));

  if (petList.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <p className="text-3xl text-[#6c757d]">We cannot find any pet records</p>
      </div>
    );
  }
  return (
    <div className={`flex flex-col items-start ${className}`}>
      <ul className="flex flex-wrap gap-20 justify-start">{petsRender}</ul>
    </div>
  );
});
