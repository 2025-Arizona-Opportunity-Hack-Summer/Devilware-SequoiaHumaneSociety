import { withRequiredAuthInfo } from "@propelauth/react";
import FavoritePetsList from "../components/FavoritePetsList/FavoritePetsList";
import SignIn from "../../auth/pages/SignIn";

export default withRequiredAuthInfo(
  function FavoritePet({ user }) {
    return (
      <div className="lg:min-h-screen">
        <FavoritePetsList user={user} />
      </div>
    );
  },
  { displayIfLoggedOut: <SignIn /> }
);
