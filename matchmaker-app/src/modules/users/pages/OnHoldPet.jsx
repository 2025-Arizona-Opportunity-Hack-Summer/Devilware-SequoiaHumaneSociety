import { withRequiredAuthInfo } from "@propelauth/react";
import OnHoldPetList from "../components/OnHoldPetsList/OnHoldPetsList";
import NavPet from "../components/NavPet/NavPet";
import SignIn from "../../auth/pages/SignIn";

export default withRequiredAuthInfo(
  function OnHoldPet({ user }) {
    return (
      <div className="lg:min-h-screen lg:px-40 lg:py-20 p-5">
        <NavPet />
        <OnHoldPetList user={user} />
      </div>
    );
  },
  { displayIfLoggedOut: <SignIn /> }
);
