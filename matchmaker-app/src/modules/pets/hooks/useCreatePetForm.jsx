import { useState } from "react";
import { getRandomString } from "../../../utils/helperFunction";

function useCreatePetForm() {
  const [renderedImages, setRenderedImages] = useState([]);
  const [storedImages, setStoredImages] = useState([]);
  const [petData, setPetData] = useState({
    animal_id: "",
    name: "",
    species: "Cat",
    breed: [],
    age: 0,
    weight: 0,
    sex: "Male",
    active_level: "Very active",
    adoption_fee: 0,
    about: "",
    characteristics: [],
  });

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

  const handlerInsertImage = (event) => {
    const newImageUrl = [];
    const newFiles = event.target.files;
    const selectedFiles = [];

    for (const originalFile of newFiles) {
      const newFileName = `${originalFile.name}_${getRandomString(32)}`;
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

  const handlerDeleteImage = (fileUrl, fileName) => {
    setStoredImages((state) => state.filter((image) => image.name !== fileName));
    setRenderedImages((state) => state.filter((image) => image.url !== fileUrl));
  };

  const handlerResetForm = () => {
    setPetData((prev) => ({
      ...prev,
      name: "",
      animal_id: "",
      age: 0,
      weight: 0,
      sex: "Male",
      species: "",
      breed: [],
      characteristics: [],
      active_level: "Very active",
      adoption_fee: 0,
      about: 0,
    }));

    setRenderedImages((prev) => []);
    setStoredImages((prev) => []);
  };
  return [
    petData,
    renderedImages,
    storedImages,
    handlerTextInputChange,
    handlerListInputChange,
    handlerInsertImage,
    handlerDeleteImage,
    handlerResetForm,
  ];
}

export default useCreatePetForm;
