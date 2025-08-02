import UserProfileForm from "../components/UserProfileForm/UserProfileForm";
import Homepage from "../../../pages/Homepage";
import { withRequiredAuthInfo } from "@propelauth/react";

export default withRequiredAuthInfo(
  function UserProfile({ user }) {
    return (
      <div className="lg:min-h-screen">
        <UserProfileForm email={user.email} />
      </div>
    );
  },
  {
    displayIfLoggedOut: <Homepage />,
  }
);
