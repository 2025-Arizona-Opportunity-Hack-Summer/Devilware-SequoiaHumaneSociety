import { useState } from "react";
import { getRandomString } from "../../../utils/helperFunction";

function useEditPetForm() {
  const [petData, setPetData] = useState(null);
  const [renderedImages, setRenderedImages] = useState([]);
  const [storedImages, setStoredImages] = useState([]);
  const [deleteImages, setDeleteImages] = useState([]);
  const [visiblePetInfo, setVisiblePetInfo] = useState(false);
  const [visibleEditPetForm, setVisibleEditPetForm] = useState(true);

  const handlerAssignData = (data) => {
    setPetData((prev) => data);
  };

  const handlerTextInputChange = (event) => {
    const { name, value } = event.target;

    setPetData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "species") {
      setPetData((prev) => ({
        ...prev,
        breed: [],
      }));
    }
  };

  const initRenderedImages = (petData) => {
    const images = [];
    for (let i = 0; i < petData.images.length; ++i) {
      images.push({
        url: petData.imagesURL[i],
        fileName: petData.images[i],
      });
    }

    setRenderedImages((prev) => [...images]);
  };
  const onClickBreedOption = (optionList) => {
    setPetData((prev) => ({
      ...prev,
      breed: optionList,
    }));
  };

  const onClickCharacteristicOptions = (optionList) => {
    setPetData((prev) => ({
      ...prev,
      characteristics: optionList,
    }));
  };

  const handlerListInputChange = (type) => {
    if (type === "breed") {
      return onClickBreedOption;
    } else {
      return onClickCharacteristicOptions;
    }
  };

  const handlerDeleteImage = (fileUrl, fileName) => {
    setStoredImages((prev) => prev.filter((image) => image.name !== fileName));
    setRenderedImages((prev) => prev.filter((image) => image.url !== fileUrl));
    setDeleteImages((prev) => [...prev, fileName]);
  };

  const handlerInsertImage = (event) => {
    const newImageUrl = [];
    const newFiles = event.target.files;
    const selectedFiles = [];

    for (const originalFile of newFiles) {
      const newFileName = `${getRandomString(32)}_${originalFile.name}`;
      const newFile = new File([originalFile], newFileName, {
        type: originalFile.type,
        lastModified: originalFile.lastModified,
      });

      newImageUrl.push({
        url: URL.createObjectURL(newFile),
        fileName: newFile.name,
      });
      selectedFiles.push(newFile);
    }

    setRenderedImages((prevFiles) => [...prevFiles, ...newImageUrl]);
    setStoredImages((prevFiles) => [...prevFiles, ...selectedFiles]);
    event.target.value = "";
  };

  const toggleVisiblePetInfo = () => {
    setVisiblePetInfo((prev) => !prev);
  };

  const openEditPetForm = () => {
    setVisibleEditPetForm((prev) => true);
  };
  const openPetDescription = () => {
    setVisibleEditPetForm((prev) => false);
  };
  return [
    {
      petData,
      renderedImages,
      storedImages,
      deleteImages,
      visibleEditPetForm,
      visiblePetInfo,
    },
    {
      handlerAssignData,
      handlerTextInputChange,
      handlerListInputChange,
      initRenderedImages,
      handlerDeleteImage,
      handlerInsertImage,
      toggleVisiblePetInfo,
      openEditPetForm,
      openPetDescription,
    },
  ];
}

export default useEditPetForm;
