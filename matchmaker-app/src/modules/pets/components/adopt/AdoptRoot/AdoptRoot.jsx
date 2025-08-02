import React from 'react';

// Mock images - replace with your actual imports
import catIcon from "../../../../../assets/images/cat-1-com.svg";
import dogIcon from "../../../../../assets/images/dog-1-com.svg";
import barn from "../../../../../assets/images/barn.jpg";

function AdoptRoot() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <img
          src={barn}
          alt="Adopt Banner"
          className="absolute inset-0 w-full h-full object-cover opacity-100"
          style={{ zIndex: 0 }}
        />
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
              <span className="text-orange-200">ADOPT</span> WITH US
            </h1>
            <p className="text-lg sm:text-xl text-white max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed">
              Give a loving home to animals in need
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Introduction */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6">
            Start Your Adoption Journey
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            To start an adoption application, choose the type of animal you are looking to adopt. 
            Every pet deserves a loving family!
          </p>
        </div>

        {/* Adoption Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Cat Card */}
          <div className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
            <div className="absolute top-4 right-4 bg-[#C1272D] text-white px-3 py-1 rounded-full text-sm font-semibold">
              Available
            </div>
            <div className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden">
                  <img src={catIcon} alt="cat" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">Cats</h3>
                  <p className="text-gray-600">Adopt a feline friend</p>
                </div>
              </div>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Our cats are looking for warm homes and loving families. Each cat has been 
                health-checked and is ready for adoption.
              </p>
              <a
                href="/adopt/cat"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block text-center bg-gradient-to-r from-[#7C0F0F] to-[#C1272D] text-white font-semibold py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Adopt a Cat
              </a>
            </div>
          </div>

          {/* Dog Card */}
          <div className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
            <div className="absolute top-4 right-4 bg-[#C1272D] text-white px-3 py-1 rounded-full text-sm font-semibold">
              Available
            </div>
            <div className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden">
                  <img src={dogIcon} alt="dog" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">Dogs</h3>
                  <p className="text-gray-600">Adopt a canine companion</p>
                </div>
              </div>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Our dogs are eager to find their forever homes. From playful puppies to 
                gentle seniors, we have the perfect match for you.
              </p>
              <a
                href="/adopt/dog"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block text-center bg-gradient-to-r from-[#7C0F0F] to-[#C1272D] text-white font-semibold py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Adopt a Dog
              </a>
            </div>
          </div>
        </div>

        {/* Support Section */}
        <div className="bg-gradient-to-r from-[#7C0F0F] to-[#C1272D] rounded-3xl p-8 lg:p-12 text-white mb-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-white text-4xl mb-6">❤️</div>
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Not Ready to Adopt Yet?
            </h3>
            <p className="text-lg text-orange-100 mb-6 leading-relaxed">
              If you're not quite ready to adopt, you can still support these cuties! All our animals 
              are available for adoption, but some may not be ready to go home just yet.
            </p>
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
              <span className="text-yellow-400">✨</span>
              <span className="font-semibold">You can still help by fostering or donating!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdoptRoot;