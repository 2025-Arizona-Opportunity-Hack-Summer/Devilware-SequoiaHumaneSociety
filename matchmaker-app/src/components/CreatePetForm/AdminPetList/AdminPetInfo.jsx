import { useState } from "react";
import { useNavigate } from "react-router";

import noPetImage from "../../../assets/images/no-pet-image.png";
import loadingImage from "../../../assets/images/loading-image.png";

function AdminPetInfo({ pet }) {
  const navigate = useNavigate();
  const { imagesURL, name, breed, _id, species } = pet;
  const [imageLoading, setImageLoading] = useState(false);

  const petImage = imagesURL.length === 0 ? noPetImage : imagesURL[0];

  const onClickNavigateToDetails = () => {
    navigate({
      pathname: "/petadmin/edit",
      search: `?pet_id=${_id}`,
    });
  };

  return (
    <div className="rounded-xl border-[#adb5bd] border-2 pb-5 shadow-2xl cursor-pointer hover:shadow-[0_35px_60px_-15px_#000000cc] duration-100">
      <div className="relative">
        <img
          src={!imageLoading ? loadingImage : petImage}
          alt={name}
          className="w-56 rounded-md"
          onClick={onClickNavigateToDetails}
          onLoad={() => {
            setImageLoading((preState) => true);
          }}
        />
      </div>
      <div className="flex flex-col items-center mt-10 gap-2" onClick={onClickNavigateToDetails}>
        <p className="text-[#C1272D] text-2xl font-semibold">{name.toUpperCase()}</p>
        <p
          style={{
            fontFamily: "Koulen, sans-serif",
            fontStyle: "normal",
            fontWeight: 600,
          }}
          className="max-w-50 overflow-hidden whitespace-nowrap text-ellipsis text-[#4f2edc]">
          {species} &#x2022; {breed.join(" ")}
        </p>
      </div>
    </div>
  );
}

export default AdminPetInfo;
