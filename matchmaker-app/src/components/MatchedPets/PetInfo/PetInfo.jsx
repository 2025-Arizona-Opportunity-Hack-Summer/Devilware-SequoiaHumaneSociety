import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { createSearchParams } from "react-router";
import { withAuthInfo } from "@propelauth/react";
import { useDispatch } from "react-redux";

import { userSlice } from "../../../redux/UserInfoSlice";

import InputButton from "../../Input/InputButton/InputButton";

import noPetImage from "../../../assets/images/no-pet-image.png";
import heart from "../../../assets/images/heart-com.svg";
import loadingImage from "../../../assets/images/loading-image.png";

import { fetchUpdateFavoritePets } from "../../../features/fetchUserRoutes";

export default withAuthInfo(function PetInfo({ pet, setVisibleSignIn, isLoggedIn, user, isFavorite, userClass }) {
  const dispatch = useDispatch();
  const { imagesURL, name, breed, _id, species } = pet;
  const [imageLoading, setImageLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (userClass.getOrgs().length > 0) {
      setIsAdmin((prev) => true);
    }
  }, []);
  const navigate = useNavigate();

  const petImage = imagesURL.length === 0 ? noPetImage : imagesURL[0];

  const onClickFavorite = async () => {
    if (!isLoggedIn) {
      setVisibleSignIn((preState) => true);
    } else {
      fetchUpdateFavoritePets(user.email, _id)
        .then((response) => {
          dispatch(userSlice.actions.addFavorites(_id));
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
        {!isAdmin && (
          <div className="absolute bottom-2 right-2 flex  justify-center items-center">
            {isFavorite && (
              <InputButton
                id={`${_id}_favorite`}
                labelStyle="bg-[#C1272D] p-2 rounded-full cursor-pointer duration-200"
                onClickHandler={onClickFavorite}>
                <HeartSVG />
              </InputButton>
            )}
            {!isFavorite && (
              <InputButton
                id={`${_id}_favorite`}
                labelStyle="bg-[#ffffff80] hover:bg-white p-2 rounded-full cursor-pointer duration-200"
                onClickHandler={onClickFavorite}>
                <img src={heart} alt="favorite" className="w-8" />
              </InputButton>
            )}
          </div>
        )}
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
});

function HeartSVG() {
  return (
    <svg className="w-8 group" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.10627 18.2468C5.29819 16.0833 2 13.5422 2 9.1371C2 4.27416 7.50016 0.825464 12 5.50063L14 7.49928C14.2929 7.79212 14.7678 7.79203 15.0607 7.49908C15.3535 7.20614 15.3534 6.73127 15.0605 6.43843L13.1285 4.50712C17.3685 1.40309 22 4.67465 22 9.1371C22 13.5422 18.7018 16.0833 15.8937 18.2468C15.6019 18.4717 15.3153 18.6925 15.0383 18.9109C14 19.7294 13 20.5 12 20.5C11 20.5 10 19.7294 8.96173 18.9109C8.68471 18.6925 8.39814 18.4717 8.10627 18.2468Z"
        fill="#fff"
      />
    </svg>
  );
}
