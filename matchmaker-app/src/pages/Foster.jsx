import { useEffect, useState, useTransition } from "react";
import { fetchFindPets } from "../modules/pets/services/petServices";

import FosterPetInfo from "../components/foster/FosterPetInfo";
import noPetImage from "../assets/images/no-pet-image.png";
import loadingImage from "../assets/images/loading-image.png";

export default function Foster() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [petList, setPetList] = useState([]);

  const animals = [
    {
      id: 1,
      name: "Bella",
      type: "dog",
      age: "2 years",
      breed: "Golden Retriever Mix",
      about: "Gentle, loving companion who adores children and other pets.",
      needs: "Quiet home, daily walks",
      color: "bg-amber-100",
    },
    {
      id: 2,
      name: "Whiskers",
      type: "cat",
      age: "1 year",
      breed: "Domestic Shorthair",
      about: "Playful kitten with endless energy and curiosity.",
      needs: "Indoor only, toys and attention",
      color: "bg-blue-100",
    },
    {
      id: 3,
      name: "Max",
      type: "dog",
      age: "5 years",
      breed: "Labrador",
      about: "Calm, well-trained dog perfect for families.",
      needs: "Moderate exercise, loving family",
      color: "bg-green-100",
    },
    {
      id: 4,
      name: "Luna",
      type: "cat",
      age: "3 years",
      breed: "Persian Mix",
      about: "Serene lap cat who loves quiet afternoons.",
      needs: "Gentle handling, grooming",
      color: "bg-purple-100",
    },
    {
      id: 5,
      name: "Rocky",
      type: "dog",
      age: "4 years",
      breed: "German Shepherd",
      description: "Loyal protector seeking an active family.",
      needs: "Daily exercise, training",
      color: "bg-red-100",
    },
    {
      id: 6,
      name: "Mittens",
      type: "cat",
      age: "6 months",
      breed: "Maine Coon Mix",
      description: "Fluffy bundle of joy with a sweet personality.",
      needs: "Socialization, playtime",
      color: "bg-pink-100",
    },
  ];

  useEffect(() => {
    console.log(selectedCategory);
    fetchFindPets(selectedCategory === "all" ? null : selectedCategory)
      .then((data) => {
        setPetList((prev) => data.pets.slice(0, 6));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selectedCategory]);

  const filteredAnimals =
    selectedCategory === "all" ? animals : animals.filter((animal) => animal.type === selectedCategory);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#7C0F0F] via-[#C1272D] to-[#7C0F0F]">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-white bg-opacity-20 rounded-full mb-6 sm:mb-8">
              <span className="text-2xl sm:text-3xl">🏠</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">Foster</h1>
            <p className="text-lg sm:text-xl text-white max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed">
              Foster some of our animals in need!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-[#7C0F0F] px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                Start Fostering Today
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-[#7C0F0F] transition-all duration-300">
                Watch Our Story
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Foster?</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-red-600 rounded-full flex-shrink-0 mt-1"></div>
                  <p className="text-gray-500">Save lives by providing temporary homes</p>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-red-600 rounded-full flex-shrink-0 mt-1"></div>
                  <p className="text-gray-500">Help animals recover and socialize</p>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-red-600 rounded-full flex-shrink-0 mt-1"></div>
                  <p className="text-gray-500">Experience the joy of helping vulnerable pets</p>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-red-600 rounded-full flex-shrink-0 mt-1"></div>
                  <p className="text-gray-500">Test compatibility before adopting</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-red-100 to-red-200 rounded-2xl p-8 h-80 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-4xl">🐾</span>
                </div>
                <p className="text-gray-500 font-medium">[Hero Image Placeholder]</p>
                <p className="text-sm text-gray-400 mt-2">Happy foster family with pet</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-full shadow-lg p-2 inline-flex space-x-2">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                selectedCategory === "all"
                  ? "bg-gradient-to-r from-[#7C0F0F] to-[#C1272D] text-white shadow-lg"
                  : "text-gray-500 hover:bg-gray-100"
              }`}>
              All Animals
            </button>
            <button
              onClick={() => setSelectedCategory("Dog")}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                selectedCategory === "Dog"
                  ? "bg-gradient-to-r from-[#7C0F0F] to-[#C1272D] text-white shadow-lg"
                  : "text-gray-500 hover:bg-gray-100"
              }`}>
              Dogs
            </button>
            <button
              onClick={() => setSelectedCategory("Cat")}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                selectedCategory === "Cat"
                  ? "bg-gradient-to-r from-[#7C0F0F] to-[#C1272D] text-white shadow-lg"
                  : "text-gray-500 hover:bg-gray-100"
              }`}>
              Cats
            </button>
          </div>
        </div>

        {/* Animals Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {petList.map((animal) => (
            <FosterPetInfo pet={animal} key={animal._id} />
          ))}
          {/* {petList.map((animal) => {
            const [imageLoading, setImageLoading] = useState(false);

            return (
              <div
                key={animal._id}
                className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                <div className={`${animal.color} h-64 flex items-center justify-center relative`}>
                  <div className="text-center">
                    <div className="bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg cursor-pointer">
                      <img
                        src={
                          !imageLoading
                            ? loadingImage
                            : animal.imagesURL.length !== 0
                            ? animal.imagesURL[0]
                            : noPetImage
                        }
                        alt={animal.name}
                        className="w-60 rounded-md"
                        onClick={onClickNavigateToDetails}
                        onLoad={() => {
                          setImageLoading((preState) => true);
                        }}
                      />
                    </div>
                  </div>
                  {/* <div className="text-center">
                  <img />
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-3xl">{animal.type === "dog" ? "🐕" : "🐱"}</span>
                  </div>
                  <p className="text-gray-500 font-medium">[Animal Photo]</p>
                  <p className="text-sm text-gray-400 mt-1">{animal.name}</p>
                </div> */}
          {/* <div className="absolute top-4 right-4">
                    <span className="bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-600 shadow-lg">
                      {animal.age}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{animal.name}</h3>
                  <p className="text-[#C1272D] font-medium mb-3">{animal.breed}</p>
                  <p className="text-gray-500 mb-4 leading-relaxed">{animal.description}</p> */}

          {/* <div className="mb-6">
                  <h4 className="font-semibold text-gray-700 mb-2">Special Needs:</h4>
                  <p className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">{animal.needs}</p>
                </div> */}

          {/* <button className="w-full bg-gradient-to-r from-[#7C0F0F] to-[#C1272D] text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    Foster {animal.name}
                  </button>
                </div>
              </div>
            );
          })} */}
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-[#7C0F0F] to-red-800 rounded-3xl p-12 text-center text-white shadow-2xl">
          <h2 className="text-4xl font-bold mb-6">Ready to Foster?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Take the first step in saving a life. Our team will guide you through the process and match you with the
            perfect furry friend.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-[#7C0F0F] px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Apply to Foster
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-red-600 transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
