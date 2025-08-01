import { Outlet, useNavigate } from "react-router";
import { withRequiredAuthInfo } from "@propelauth/react";

import Homepage from "../../../pages/Homepage/Homepage";

export default withRequiredAuthInfo(
  function PetAdmin({ user }) {
    const navigate = useNavigate();
    const buttonStyle =
      "p-3 rounded-md cursor-pointer font-semibold text-white shadow-[3px_3px_#000] hover:translate-[3px] hover:shadow-none duration-300 ";
    return (
      <div className="m-20">
        <div className="flex gap-2 mb-10">
          <button
            className={`${buttonStyle} bg-[#52b788]`}
            onClick={() => {
              navigate("create");
            }}>
            Creat pet
          </button>
          <button
            className={`${buttonStyle} bg-[#0077b6]`}
            onClick={() => {
              navigate("edit");
            }}>
            Edit and delete pet
          </button>
        </div>
        <div className="flex justify-center">
          <div className="w-full">
            <Outlet />
          </div>
        </div>
      </div>
    );
  },
  { displayIfLoggedOut: <Homepage /> }
);
