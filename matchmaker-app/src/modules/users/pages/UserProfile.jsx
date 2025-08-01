import UserProfileForm from "../components/UserProfileForm/UserProfileForm";
import Homepage from "../../../pages/Homepage";
import { withRequiredAuthInfo } from "@propelauth/react";

export default withRequiredAuthInfo(
  function UserProfile({ user }) {
    return <UserProfileForm email={user.email} />;
  },
  {
    displayIfLoggedOut: <Homepage />,
  }
);
