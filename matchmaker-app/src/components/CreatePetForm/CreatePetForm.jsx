import { withAuthInfo } from "@propelauth/react";
import InputDatalist from "../Input/InputDatalist/InputDatalist";
import { useState } from "react";
import ImageList from "./ImagesList";

export default withAuthInfo(function CreatePetForm() {
  const [renderedImages, setRenderedImages] = useState([]);
  const [storedImages, setStoredImages] = useState([]);

  const textInputStyles = "border rounded-lg p-2 focus:border-orange-500 focus:border-2 outline-0 w-full max-w-[720px]";

  const onChangeDeleteImage = (fileUrl, fileName) => {
    setStoredImages((state) => state.filter((image) => image.name !== fileName));
    setRenderedImages((state) => state.filter((image) => image.url !== fileUrl));
  };

  const onChangeInsertImage = (event) => {
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

  return (
    <div className="m-20 px-40">
      <h2 className="text-5xl mb-10 text-[#7C0F0F] font-semibold">Upload Pet</h2>
      <form className="flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <div>
            <label htmlFor="pet-name" className="block">
              Pet Name
            </label>
            <input type="text" id="pet-name" name="pet-name" required className={textInputStyles} />
          </div>
          <div>
            <label htmlFor="pet-id" className="block">
              Pet ID
            </label>
            <input type="text" id="pet-id" name="pet-id" required className={textInputStyles} />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-3xl border-b-2">Pet Info</h3>
          <div className="flex gap-10">
            <div>
              <label htmlFor="pet-age" className="block">
                Age (months)
              </label>
              <input type="number" id="pet-age" name="pet-age" className={textInputStyles} min={0} />
            </div>
            <div>
              <label htmlFor="pet-weight" className="block">
                Weight (lbs)
              </label>
              <input type="number" id="pet-weight" name="pet-weight" className={textInputStyles} />
            </div>
          </div>
          <div>
            <label htmlFor="pet-sex" className="block">
              Sex
            </label>
            <select id="pet-sex" name="pet-sex" className={textInputStyles}>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>
          <div>
            <label htmlFor="pet-species" className="block">
              Species
            </label>
            <select id="pet-species" name="pet-species" className={textInputStyles}>
              <option>Cat</option>
              <option>Dog</option>
            </select>
          </div>
          <div>
            <label htmlFor="pet-breed" className="block">
              Breed
            </label>
            <select id="pet-breed" name="pet-breed" multiple className={textInputStyles}>
              <option>A</option>
              <option>B</option>
            </select>
          </div>
          <div>
            <label htmlFor="pet-active-level" className="block">
              Active level
            </label>
            <select id="pet-active-level" name="pet-active-level" className={textInputStyles}>
              <option>High</option>
              <option>Mediums</option>
              <option>Small</option>
            </select>
          </div>
        </div>
        <div>
          <h3 className="text-3xl border-b-2">Photos</h3>
          <div>
            <label htmlFor="pet-images" className="cursor-pointer">
              Upload images
            </label>
            <input
              type="file"
              multiple
              id="pet-images"
              name="pet-images"
              className="hidden"
              accept=".jpg, .jpeg, .png"
              onChange={onChangeInsertImage}
            />
          </div>
          <div>
            <ImageList images={renderedImages} onClickDeleteImage={onChangeDeleteImage} />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-3xl border-b-2">Adoption Fee</h3>
          <div>
            <label htmlFor="pet-age" className="block">
              Fee ($)
            </label>
            <input type="number" id="pet-age" name="pet-age" className={textInputStyles} min={0} />
          </div>
        </div>
      </form>
    </div>
  );
});

function getRandomString(length) {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  const charLength = 36;

  let randomString = "";

  for (let i = 0; i < length; ++i) {
    let idx = Math.floor(Math.random() * charLength);
    if (idx === 36) idx--;
    randomString += characters[idx];
  }

  return randomString;
}
