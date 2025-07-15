import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { withAuthInfo } from "@propelauth/react";
import { Outlet, useLocation } from "react-router-dom";

import NavigationBar from "../../components/NavigationBar/NavigationBar";
import { userSlice } from "../../redux/UserInfoSlice";
import { saveUserQuesionnaire } from "../../features/saveUserPreferences";
import SessionStorage from "../../features/sessionStorage";

export default withAuthInfo(function Root({ isLoggedIn, user, accessToken }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const isMatchPage = location.pathname === "/match";
  const isAdoptPage = location.pathname.includes("/adopt");

  useEffect(() => {
    if (isLoggedIn) {
      const API_BASE_URL = import.meta.env.VITE_API_URL;
      const FIND_USER_ENDPOINT = import.meta.env.VITE_FIND_USER_ENDPOINT;
      const UPDATE_USER_QUESTIONNAIRE_ENDPOINT = import.meta.env.VITE_UPDATE_USER_QUESTIONNAIRE_ENDPOINT;

      const endpoint = `${API_BASE_URL}/${FIND_USER_ENDPOINT}?email=${user.email}`;
      fetch(endpoint, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.content);
          const updatedMatchQuestions = saveUserQuesionnaire(data.content);
          const endpointUpdate = `${API_BASE_URL}/${UPDATE_USER_QUESTIONNAIRE_ENDPOINT}`;
          fetch(endpointUpdate, {
            method: "PUT",
            body: JSON.stringify({ email: user.email, questionnaire: updatedMatchQuestions }),
            headers: {
              "Content-type": "application/json",
            },
          })
            .then((response) => response.json())
            .then((data) => {
              dispatch(userSlice.actions.assign(data.content));
            })
            .catch((err) => {
              console.log(err);
            });

          console.log(SessionStorage.getItem("sp1"));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoggedIn]);

  return (
    <div className="root">
      <NavigationBar />
      {/* If match page, then no styling. Otherwise, have padding and margins for any text below navbar */}
      <main className={isMatchPage || isAdoptPage ? "" : "pt-10 mx-20"}>
        <Outlet />
      </main>
    </div>
  );
});
