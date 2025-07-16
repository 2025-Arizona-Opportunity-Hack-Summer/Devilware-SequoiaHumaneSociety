import { Outlet, useLocation } from "react-router-dom";

import NavigationBar from "../../components/NavigationBar/NavigationBar";

function Root() {
  const location = useLocation();
  const isMatchPage = location.pathname === "/match";
  const isAdoptPage = location.pathname.includes("/adopt");

  return (
    <div className="root">
      <NavigationBar />
      {/* If match page, then no styling. Otherwise, have padding and margins for any text below navbar */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Root;
