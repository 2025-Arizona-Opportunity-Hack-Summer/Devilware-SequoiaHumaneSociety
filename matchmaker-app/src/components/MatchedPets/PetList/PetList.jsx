import { useSelector } from "react-redux";

import { userSlice } from "../../../redux/UserInfoSlice";
import PetInfo from "../PetInfo/PetInfo";

function PetList({ petList = [], className, setVisibleSignIn }) {
  const user = useSelector((store) => store[userSlice.name]);

  const petsRender = petList.map((pet) => (
    <li key={pet._id}>
      <PetInfo pet={pet} setVisibleSignIn={setVisibleSignIn} isFavorite={user.favoritePets.includes(pet._id)} />
    </li>
  ));

  return (
    <div className={`flex flex-col items-start ${className}`}>
      <ul className="flex flex-wrap gap-20 justify-start">{petsRender}</ul>
    </div>
  );
}

export default PetList;
