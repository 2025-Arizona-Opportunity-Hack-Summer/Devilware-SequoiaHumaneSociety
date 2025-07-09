import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { createSearchParams } from "react-router-dom";
import RequiredSignInModal from "../RequiredSignInModal/RequiredSignInModal";

import noPetImage from "../../assets/images/no-pet-image.png";

import "./PetDescriptions.css";

function PetDescriptions() {
  const [searchParams, _] = useSearchParams();
  const [data, setData] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);

  const [visibleRequireModal, setVisibleRequireModal] = useState(false);

  const pet_id = searchParams.get("pet_id");

  useEffect(() => {
    const searchQuery = createSearchParams({ pet_id: pet_id }).toString();

    setImageIndex(0);
    fetch(`http://localhost:4041/pets?${searchQuery}`, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        setData((preState) => data.content[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [pet_id]);

  if (data === null) {
    return <></>;
  }

  const { age, adoption_fee, characteristics, breed, imagesURL, species, sex, name, weight, about } = data;

  const onClickApplyForAdoption = () => {
    setVisibleRequireModal((preState) => true);
  };

  const onClickAddToFavorite = () => {
    setVisibleRequireModal((preState) => true);
  };

  const onClickBack = () => {
    history.back();
  };

  const onClickBackImage = () => {
    setImageIndex((preState) => preState - 1);
  };

  const onClickNextImage = () => {
    setImageIndex((preState) => preState + 1);
  };

  const ImagesRender = imagesURL.map((image) => (
    <img src={image} alt={name} className="w-72 rounded-2xl" key={image} />
  ));

  const ImageIdex = imagesURL.slice(2).map((image, idx) => (
    <div key={idx} className={imageIndex === idx ? "curr-image" : ""}>
      <LineSVG />
    </div>
  ));

  const translateImageStyle = {
    transform: `translateX(-${288 * imageIndex}px)`,
  };

  console.log(translateImageStyle);
  return (
    <>
      <div className="px-40 flex flex-col gap-10">
        <div>
          <button
            className="flex gap-2 border-2 border-transparent hover:border-2 hover:border-black cursor-pointer py-1 px-3 rounded-md duration-150 go-back-button"
            onClick={onClickBack}>
            <ArrowSVG /> <span className="font-bold text-[#adb5bd]">Back</span>
          </button>
        </div>
        <div className="flex flex-col items-center">
          {imagesURL.length === 0 && <img src={noPetImage} alt={name} className="w-72 rounded-2xl" />}
          {imagesURL.length !== 0 && (
            <>
              <div className="flex justify-between w-max relative gap-5">
                <button onClick={onClickBackImage} disabled={imageIndex == 0} className="image-button">
                  <LeftArrowSVG />
                </button>
                <div className="max-w-4xl overflow-hidden">
                  <div className="flex justify-start gap-2 w-full duration-300" style={translateImageStyle}>
                    {ImagesRender}
                  </div>
                </div>
                <button
                  onClick={onClickNextImage}
                  disabled={imageIndex >= imagesURL.length - 3}
                  className="image-button">
                  <RightArrowSVG />
                </button>
              </div>
              <div className="flex">{ImageIdex}</div>
            </>
          )}
        </div>

        <div className="flex justify-between gap-10">
          <div className="flex-grow p-10 rounded-2xl">
            <h1 className="uppercase text-[#343a40] text-6xl pet-name">{name}</h1>
            <h2 className="uppercase text-[#343a40] text-3xl pet-name border-t border-[#dee2e6] mt-5 pt-5">Info</h2>
            <div className="max-w-96 mt-5">
              <div className="grid grid-cols-2">
                <p className="uppercase text-[#495057] pet-category">species</p>
                <p className="pet-data">{species}</p>
              </div>
              <div className="grid grid-cols-2">
                <p className="uppercase text-[#495057] pet-category">breed</p>
                <p className="pet-data">{breed.join(",")}</p>
              </div>
              <div className="grid grid-cols-2">
                <p className="uppercase text-[#495057] pet-category">sex</p>
                <p className="pet-data">{sex}</p>
              </div>
              <div className="grid grid-cols-2">
                <p className="uppercase text-[#495057] pet-category">weight</p>
                <p className="pet-data">{weight} lbs</p>
              </div>
              <div className="grid grid-cols-2">
                <p className="uppercase text-[#495057] pet-category">age</p>
                <p className="pet-data">{age} months</p>
              </div>
              <div className="grid grid-cols-2">
                <p className="uppercase text-[#495057] pet-category">adoption fee</p>
                <p className="pet-data">${adoption_fee}</p>
              </div>
            </div>
            <h2 className="uppercase text-[#343a40] text-3xl pet-name border-t border-[#dee2e6] mt-5 pt-5">About</h2>
            <div className="mt-5 max-w-full whitespace-pre-wrap">
              <p className="about-text text-wrap">{about}</p>
            </div>
          </div>

          <div className="mt-10">
            <div className="flex flex-col gap-2 w-max">
              <button className="pet-description-button" onClick={onClickApplyForAdoption}>
                <span>Apply for adoption</span>
              </button>
              <button className="pet-description-button" onClick={onClickAddToFavorite}>
                <span>&#x2764; Add to favorites</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <RequiredSignInModal visible={visibleRequireModal} setVisible={setVisibleRequireModal} />
    </>
  );
}

function ArrowSVG() {
  return (
    <svg
      className="w-6 h-6"
      viewBox="-1 0 10 10"
      id="meteor-icon-kit__regular-long-arrow-down-xs"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      transform="rotate(90)">
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5 6.5858L6.2929 5.2929C6.6834 4.9024 7.3166 4.9024 7.7071 5.2929C8.0976 5.6834 8.0976 6.3166 7.7071 6.7071L4.7071 9.7071C4.3166 10.0976 3.6834 10.0976 3.2929 9.7071L0.29289 6.7071C-0.09763 6.3166 -0.09763 5.6834 0.29289 5.2929C0.68342 4.9024 1.31658 4.9024 1.70711 5.2929L3 6.5858V1C3 0.44772 3.4477 0 4 0C4.5523 0 5 0.44772 5 1V6.5858z"
          fill="#adb5bd"></path>
      </g>
    </svg>
  );
}

function LeftArrowSVG() {
  return (
    <svg
      className="w-6 h-6"
      fill="#adb5bd"
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 492.432 492.432"
      xmlSpace="preserve"
      transform="rotate(180)">
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <g id="XMLID_134_">
          <path
            id="XMLID_135_"
            d="M142.238,492.432c-9.79,0-19.588-3.736-27.05-11.209c-14.945-14.934-14.945-39.162,0-54.098l180.9-180.909 l-180.9-180.91c-14.945-14.935-14.945-39.163,0-54.098c14.926-14.944,39.172-14.944,54.098,0l207.96,207.958 c14.943,14.935,14.943,39.164,0,54.1l-207.96,207.957C161.824,488.697,152.026,492.432,142.238,492.432z"></path>
        </g>
      </g>
    </svg>
  );
}

function RightArrowSVG() {
  return (
    <svg
      className="w-6 h-6"
      fill="#adb5bd"
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 492.432 492.432"
      xmlSpace="preserve"
      transform="rotate(0)">
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <g id="XMLID_134_">
          <path
            id="XMLID_135_"
            d="M142.238,492.432c-9.79,0-19.588-3.736-27.05-11.209c-14.945-14.934-14.945-39.162,0-54.098l180.9-180.909 l-180.9-180.91c-14.945-14.935-14.945-39.163,0-54.098c14.926-14.944,39.172-14.944,54.098,0l207.96,207.958 c14.943,14.935,14.943,39.164,0,54.1l-207.96,207.957C161.824,488.697,152.026,492.432,142.238,492.432z"></path>
        </g>
      </g>
    </svg>
  );
}

function LineSVG() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12" transform="rotate(90)">
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <g id="Interface / Line_L">
          <path
            id="Vector"
            d="M12 19V5"
            stroke="#adb5bd"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"></path>
        </g>
      </g>
    </svg>
  );
}
export default PetDescriptions;
