import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { createSearchParams } from "react-router";
import { useDispatch } from "react-redux";
import { withAuthInfo } from "@propelauth/react";
import { userSlice } from "../../../../store/slices/UserInfoSlice";
import InputButton from "../../../../components/common/inputs/InputButton";

import noPetImage from "../../../../assets/images/no-pet-image.png";
import heart from "../../../../assets/images/heart-com.svg";
import loadingImage from "../../../../assets/images/loading-image.png";

import { fetchUpdateFavoritePetById } from "../../services/userSevices";

export default withAuthInfo(function OnHoldPetInfo({ pet, setVisibleSignIn, isLoggedIn, user, isFavorite, userClass }) {
  const dispatch = useDispatch();
  const { imagesURL, name, _id, on_hold_date } = pet;
  const [imageLoading, setImageLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (userClass !== null && userClass.getOrgs().length > 0) {
      setIsAdmin((prev) => true);
    }
  }, []);
  const navigate = useNavigate();

  const petImage = imagesURL.length === 0 ? noPetImage : imagesURL[0];

  const onClickFavorite = async () => {
    if (!isLoggedIn) {
      setVisibleSignIn((preState) => true);
    } else {
      fetchUpdateFavoritePetById(user.email, _id)
        .then((response) => {
          dispatch(userSlice.actions.toggleFavorite(_id));
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
    <div
      key={pet._id}
      className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden max-w-72">
      <div className={`${pet.color} h-64 flex items-center justify-center relative`}>
        {!isAdmin && (
          <div className="absolute lg:bottom-0 bottom-5 right-2 flex  justify-center items-center">
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
        <div className="text-center">
          <div className="bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg cursor-pointer">
            <img
              src={!imageLoading ? loadingImage : petImage}
              alt={name}
              className="w-72 rounded-md"
              onClick={onClickNavigateToDetails}
              onLoad={() => {
                setImageLoading((preState) => true);
              }}
            />
          </div>
        </div>
        <div className="absolute top-4 right-4">
          <span className="bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-600 shadow-lg">
            {pet.age} months
          </span>
        </div>
      </div>

      <div className="p-6 cursor-pointer" onClick={onClickNavigateToDetails}>
        <p className="text-lg font-semibold text-[#7251b5]">
          On-hold date: {new Date(on_hold_date).toLocaleDateString()}
        </p>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{pet.name}</h3>
        <p className="text-[#C1272D] font-medium mb-3 max-w-50 overflow-hidden whitespace-nowrap text-ellipsis">
          {pet.breed.join(", ")}
        </p>
        <p className="text-gray-500 mb-2 leading-relaxed">Sex: {pet.sex}</p>
        <p className="text-gray-500 mb-2 leading-relaxed">Weight: {pet.weight} lbs</p>

        <div className="my-4">
          <p className="font-semibold">Characteristics</p>
          <div className="flex gap-2">
            {pet.characteristics.length === 0 && (
              <span className="inline-flex items-center rounded-xl px-4 py-2 font-semibold text-sm bg-gray-200 text-gray-400">
                Do not have records
              </span>
            )}
            {pet.characteristics.length !== 0 &&
              pet.characteristics.map((item) => {
                let colorClass;
                switch (item.toLowerCase()) {
                  case "no dogs":
                  case "no cats":
                  case "active":
                    colorClass = "bg-red-200 text-red-800";
                    break;
                  case "spunky":
                    colorClass = "bg-orange-200 text-red-800";
                    break;
                  case "foster to adopt":
                  case "spirited":
                    colorClass = "bg-yellow-100 text-orange-800";
                    break;
                  case "shy":
                  case "calm":
                    colorClass = "bg-blue-200 text-blue-800";
                    break;
                  case "friendly":
                    colorClass = "bg-green-100 text-green-800";
                    break;
                  case "bonded":
                    colorClass = "bg-purple-200 text-purple-800";
                    break;
                  default:
                    colorClass = "bg-gray-200 text-gray-700";
                }

                return (
                  <span
                    key={item}
                    className={`inline-flex items-center rounded-xl px-4 py-2 font-semibold text-sm ${colorClass}`}>
                    {item}
                  </span>
                );
              })}
          </div>
        </div>
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
