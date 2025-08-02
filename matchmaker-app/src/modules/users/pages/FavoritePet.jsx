import { withRequiredAuthInfo } from "@propelauth/react";
import FavoritePetsList from "../components/FavoritePetsList/FavoritePetsList";
import SignIn from "../../auth/pages/SignIn";

import NavPet from "../components/NavPet/NavPet";

export default withRequiredAuthInfo(
  function FavoritePet({ user }) {
    return (
      <div className="lg:min-h-screen lg:px-40 lg:py-20 p-5">
        <NavPet />
        <FavoritePetsList user={user} />
      </div>
    );
  },
  { displayIfLoggedOut: <SignIn /> }
);
