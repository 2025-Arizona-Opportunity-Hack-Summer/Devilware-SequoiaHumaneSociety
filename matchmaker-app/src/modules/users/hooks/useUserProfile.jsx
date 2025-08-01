import { useState } from "react";

function useUserProfile() {
  const [userProfile, setUserProfile] = useState(null);

  const handlerAssignUser = (data) => {
    setUserProfile((prev) => data);
  };

  return [userProfile, handlerAssignUser];
}

export default useUserProfile;
