import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { withAuthInfo } from "@propelauth/react";
import { Outlet, useLocation } from "react-router-dom";
import { ScrollRestoration } from "react-router-dom";

import NavigationBar from "../../components/NavigationBar/NavigationBar";
import { userSlice } from "../../redux/UserInfoSlice";
import { saveUserQuesionnaire } from "../../features/saveUserPreferences";

import {
  fetchFindUserByEmail,
  fetchCreateUser,
  fetchUpdateUserQuesionnaireBySessionStorage,
} from "../../features/fetchUserRoutes";

export default withAuthInfo(function Root({ isLoggedIn, user, accessToken }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const isMatchPage = location.pathname === "/match";
  const isAdoptPage = location.pathname.includes("/adopt");

  useEffect(() => {
    async function loadUser() {
      if (!isLoggedIn) {
        return;
      }
      let userInfo;

      try {
        userInfo = await fetchFindUserByEmail(user.email);
      } catch (err) {
        throw Error(err);
      }

      if (userInfo === null) {
        try {
          userInfo = await fetchCreateUser(user.email, user.firstName, user.lastName, null, null);
        } catch (err) {
          throw Error(err);
        }
      }

      // const updatedMatchQuestions = saveUserQuesionnaire(userInfo);
      const updatedMatchQuestions = {};
      userInfo = await fetchUpdateUserQuesionnaireBySessionStorage(user.email, updatedMatchQuestions);

      dispatch(userSlice.actions.assign(userInfo));
    }

    loadUser().catch((err) => {
      console.log(err);
    });
  }, [isLoggedIn]);

  return (
    <div className="root">
      <ScrollRestoration />
      <NavigationBar />
      {/* If match page, then no styling. Otherwise, have padding and margins for any text below navbar */}
      <main>
        <Outlet />
      </main>
    </div>
  );
});
