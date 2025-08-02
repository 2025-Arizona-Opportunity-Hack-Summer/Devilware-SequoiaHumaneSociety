import { useEffect, useState } from "react";

import noPetImage from "../../assets/images/no-pet-image.png";
import loadingImage from "../../assets/images/loading-image.png";

function FosterPetInfo({ pet }) {
  const { imagesURL, name, breed, _id, species } = pet;
  const [imageLoading, setImageLoading] = useState(false);

  const petImage = imagesURL.length === 0 ? noPetImage : imagesURL[0];

  return (
    <div
      key={pet._id}
      className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden max-w-72 lg:max-w-80">
      <div className={`${pet.color} h-64 flex items-center justify-center relative`}>
        <div className="text-center">
          <div className="bg-white flex items-center justify-center mx-auto mb-4 shadow-lg">
            <img
              src={!imageLoading ? loadingImage : petImage}
              alt={name}
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

      <div className="p-6 mt-5">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{pet.name}</h3>
        <p className="text-[#C1272D] font-medium mb-3 max-w-50 overflow-hidden whitespace-nowrap text-ellipsis">
          {pet.breed.join(", ")}
        </p>
        {/* <p className="text-gray-500 mb-4 leading-relaxed">{pet.about}</p> */}
        <p className="text-gray-500 mb-2 leading-relaxed">{pet.sex}</p>
        <p className="text-gray-500 mb-2 leading-relaxed">{pet.weight} lbs</p>
        <div className="my-4">
          <p className="font-semibold">Characteristics</p>
          <div className="flex gap-2">
            {pet.characteristics.length == 0 && (
              <p className="text-gray-400 mb-2 leading-relaxed bg-[#e9ecef] border border-transparent p-3 rounded-md font-semibold">
                Do not have record
              </p>
            )}
            {pet.characteristics.length !== 0 &&
              pet.characteristics.map((item) => (
                <p className="text-[#C1272D] mb-2 leading-relaxed border border-[#ced4da] shadow-2xl bg-white border- p-3 rounded-md font-semibold">
                  {item}
                </p>
              ))}
          </div>
        </div>

        {/* <div className="mb-6">
          <h4 className="font-semibold text-gray-700 mb-2">Special Needs:</h4>
          <p className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">{animal.needs}</p>
        </div> */}

        <button className="w-full bg-gradient-to-r from-[#7C0F0F] to-[#C1272D] text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
          Foster {name}
        </button>
      </div>
    </div>
  );
}

export default FosterPetInfo;
