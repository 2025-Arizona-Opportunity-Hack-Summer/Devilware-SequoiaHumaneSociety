import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { withAuthInfo } from "@propelauth/react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ScrollRestoration } from "react-router-dom";

import NavigationBar from "../../components/layout/NavigationBar/NavigationBar.jsx";
import Footer from "../../components/layout/Footer/Footer.jsx";
import { userSlice } from "../../store/slices/UserInfoSlice.jsx";
import saveUserAnswers from "../../utils/saveUserAnswers.jsx";

import { fetchCreateUser, fetchFindUserByEmail } from "../../modules/auth/services/authServices.jsx";
import { fetchUpdateUserQuesionnaireBySessionStorage } from "../../modules/users/services/userSevices.jsx";
export default withAuthInfo(function Root({ isLoggedIn, user, accessToken, orgHelper, userClass }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const isMatchPage = location.pathname === "/match";
  const isAdoptPage = location.pathname.includes("/adopt");
  const navigate = useNavigate();

  useEffect(() => {
    async function loadUser() {
      if (!isLoggedIn) {
        return;
      }
      let userInfo;

      if (userClass.getOrgs().length > 0) {
      } else {
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

        const updatedMatchQuestions = saveUserAnswers(userInfo);
        userInfo = await fetchUpdateUserQuesionnaireBySessionStorage(user.email, updatedMatchQuestions);

        dispatch(userSlice.actions.assign(userInfo));
      }
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
      <Footer />
    </div>
  );
});
