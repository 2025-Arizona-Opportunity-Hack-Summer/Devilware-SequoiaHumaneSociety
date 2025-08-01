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

  return (
    <div className={`flex flex-col items-start ${className}`}>
      <ul className="flex flex-wrap gap-20 justify-start">{petsRender}</ul>
    </div>
  );
});
