import { Outlet, useLocation } from "react-router-dom";

import NavigationBar from "../../components/NavigationBar/NavigationBar";
import Footer from "../../components/Footer/Footer";

function Root() {
  const location = useLocation();
  const isMatchPage = location.pathname === "/match";
  const isSignInPage = location.pathname == "/sign-in";

  return (
    <div className="root">
      <NavigationBar />
      {/* If match page, then no styling. Otherwise, have padding and margins for any text below navbar */}
      <main className={isMatchPage || isSignInPage ? "" : "pt-10 mx-20"}>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Root;
