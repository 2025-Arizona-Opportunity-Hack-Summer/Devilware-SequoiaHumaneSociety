import { withRequiredAuthInfo } from "@propelauth/react";
import SignIn from "../SignIn/SignIn";

export default withRequiredAuthInfo(
  function FavoritePage({}) {
    return <></>;
  },
  { displayIfLoggedOut: <SignIn /> }
);
