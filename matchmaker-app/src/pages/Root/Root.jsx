import { Outlet, useLocation } from "react-router-dom";

import NavigationBar from "../../components/NavigationBar/NavigationBar";

function Root() {
  const location = useLocation();
  const isMatchPage = location.pathname === "/match";

  return (
    <div className="root">
      <NavigationBar />
      {/* If match page, then no styling. Otherwise, have padding and margins for any text below navbar */}
      <main className={isMatchPage ? "" : "pt-10 mx-20"}>
        <Outlet />
      </main>
    </div>
  );
}

export default Root;
