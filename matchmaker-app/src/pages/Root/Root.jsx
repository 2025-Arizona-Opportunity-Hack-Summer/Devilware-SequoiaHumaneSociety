import { useAuthInfo, withAuthInfo } from "@propelauth/react";
import { Outlet, useLocation } from "react-router-dom";

import NavigationBar from "../../components/NavigationBar/NavigationBar";

export default withAuthInfo(function Root({ isLoggedIn }) {
  const location = useLocation();
  const isMatchPage = location.pathname === "/match";
  const isAdoptPage = location.pathname.includes("/adopt");

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
