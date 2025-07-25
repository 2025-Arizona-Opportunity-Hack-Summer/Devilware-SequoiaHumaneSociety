import CreatePetForm from "../../components/CreatePetForm/CreatePetForm";
import { Outlet } from "react-router";
import { withRequiredAuthInfo } from "@propelauth/react";
import Homepage from "../Homepage/Homepage";

export default withRequiredAuthInfo(
  function PetAdmin({ user }) {
    return (
      <div>
        <Outlet />
      </div>
    );
  },
  { displayIfLoggedOut: <Homepage /> }
);
