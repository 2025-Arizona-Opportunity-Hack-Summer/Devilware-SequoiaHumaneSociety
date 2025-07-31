import { useEffect } from "react";
import { fetchUserProfileByEmail } from "../../services/userSevices";
import useUserProfile from "../../hooks/useUserProfile";

function UserProfileForm({ email }) {
  const [userProfile, handlerAssignUser] = useUserProfile();

  useEffect(() => {
    fetchUserProfileByEmail(email)
      .then((data) => {
        handlerAssignUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (userProfile === null) {
    return <></>;
  }

  const boxContainer = "border border-[#dee2e6] rounded-md lg:p-6 p-3 shadow-xl";
  const dataContainer = "p-2 bg-[#dce1de] rounded-md text-[#495057] cursor-not-allowed";
  return (
    <div className="m-auto mt-10 flex flex-col gap-5 max-w-[300px] lg:max-w-[500px]">
      <div className="bg-[#caf0f8] p-3 border border-[#90e0ef] text-[#023e8a] font-bold rounded-md text-sm">
        <p>Your Sequoia account is linked to your Google account</p>
      </div>
      <div className={boxContainer}>
        <p className="font-bold mb-3">Email Address</p>
        <p className={dataContainer}>{userProfile.email}</p>
      </div>
      <div className={boxContainer}>
        <p className="font-bold mb-3">Profile</p>
        <div className="lg:grid lg:grid-cols-2 lg:gap-2 flex flex-col gap-2">
          <div>
            <p className="font-semibold text-[#6c757d]">First name</p>
            <p className={dataContainer}>{userProfile.name.firstName}</p>
          </div>
          <div>
            <p className="font-semibold text-[#6c757d]">Last Name</p>
            <p className={dataContainer}>{userProfile.name.lastName}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfileForm;
