import { useState } from "react";
import { useNavigate } from "react-router";
import { createSearchParams } from "react-router";

import InputButton from "../../Input/InputButton/InputButton";

import noPetImage from "../../../assets/images/no-pet-image.png";
import heart from "../../../assets/images/heart-com.svg";
import loadingImage from "../../../assets/images/loading-image.png";

function PetInfo({ pet, setVisibleSignIn }) {
  const { imagesURL, name, breed, _id, species } = pet;
  const [imageLoading, setImageLoading] = useState(false);
  const navigate = useNavigate();

  const petImage = imagesURL.length === 0 ? noPetImage : imagesURL[0];

  const onClickFavorite = () => {
    setVisibleSignIn((preState) => true);
  };

  const onClickNavigateToDetails = () => {
    const searchQueryString = createSearchParams({ pet_id: _id }).toString();
    navigate({
      pathname: "/adopt/pet",
      search: `?${searchQueryString}`,
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
        <div className="absolute bottom-2 right-2 flex  justify-center items-center ">
          <InputButton
            id={`${_id}_favorite`}
            labelStyle="bg-[#ffffff80] hover:bg-white p-2 rounded-full cursor-pointer duration-200"
            onClickHandler={onClickFavorite}>
            <img src={heart} alt="favorite" className="w-8" />
          </InputButton>
        </div>
      </div>
      <div className="flex flex-col items-center mt-10 gap-2" onClick={onClickNavigateToDetails}>
        <p className="text-[#C1272D] text-2xl font-semibold">{name.toUpperCase()}</p>
        <p
          style={{
            fontFamily: "Koulen, sans-serif",
            fontStyle: "normal",
            fontWeight: 600,
          }}
          className="max-w-50 overflow-hidden whitespace-nowrap text-ellipsis text-[#a06cd5]">
          {species} &#x2022; {breed.join(" ")}
        </p>
      </div>
    </div>
  );
}

export default PetInfo;
