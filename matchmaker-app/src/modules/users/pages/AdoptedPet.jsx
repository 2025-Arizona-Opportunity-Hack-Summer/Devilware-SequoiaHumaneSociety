import { withRequiredAuthInfo } from "@propelauth/react";
import AdoptedPetsList from "../components/AdoptedPetsList/AdoptedPetsList";
import NavPet from "../components/NavPet/NavPet";
import SignIn from "../../auth/pages/SignIn";

export default withRequiredAuthInfo(
  function AdoptedPet({ user }) {
    return (
      <div className="lg:min-h-screen lg:px-40 lg:py-20 px-10">
        <NavPet />
        <AdoptedPetsList user={user} />
      </div>
    );
  },
  { displayIfLoggedOut: <SignIn /> }
);
