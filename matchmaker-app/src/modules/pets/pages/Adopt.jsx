import { Outlet } from "react-router";

function Adopt() {
  return (
    <div className="adopt lg:min-h-screen">
      <Outlet />
    </div>
  );
}

export default Adopt;
