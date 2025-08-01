import UserProfileForm from "../components/UserProfileForm/UserProfileform";
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
