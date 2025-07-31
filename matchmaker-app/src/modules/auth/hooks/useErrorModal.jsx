import { useState } from "react";

function useErrorModal() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [visibleModal, setVisibleModal] = useState(false);

  const openErrorModal = (error) => {
    setErrorMessage((prev) => error);
    setVisibleModal((prev) => true);

    setTimeout(() => {
      setErrorMessage((prev) => null);
      setVisibleModal((prev) => false);
    }, 10000);
  };

  return [errorMessage, visibleModal, openErrorModal];
}

export default useErrorModal;
