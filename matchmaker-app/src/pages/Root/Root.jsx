import { Outlet } from "react-router";

import NavigationBar from "../../components/NavigationBar/NavigationBar";

function Root() {
  return (
    <div className="root">
      <NavigationBar />
      <Outlet />
    </div>
  );
}

export default Root;
