import { Link } from "react-router";

import catImage from "../../../assets/images/cat.jpg";
import dogImage from "../../../assets/images/dog.jpg";
import catImage2 from "../../../assets/images/cat2.jpg";
import dogImage2 from "../../../assets/images/dog2.jpg";

function GetToMatchPage() {
  return (
    <div className="w-max shadow-2xl border-2 border-[#adb5bd] rounded-md flex flex-col items-center pt-6">
      <div className="rounded-2xl px-6">
        <p
          className="uppercase text-center text-text text-xl font-bold"
          style={{
            fontFamily: "Koulen, sans-serif",
            fontStyle: "normal",
            fontWeight: 400,
          }}>
          Find your matched pet
        </p>
        <div className="flex justify-center gap-0 mt-5 relative left-6">
          <img src={catImage} alt="cat" className="w-12 rounded-4xl" />
          <img src={dogImage} alt="dog" className="w-12 rounded-4xl relative right-4" />
          <img src={catImage2} alt="cat" className="w-12 rounded-4xl relative right-8" />
          <img src={dogImage2} alt="dog" className="w-12 rounded-4xl relative right-12" />
          <div className="w-12 rounded-4xl relative right-16 flex items-center bg-[#7C0F0F] justify-center text-white">
            <p className="font-bold">+30</p>
          </div>
        </div>
      </div>
      <button className="uppercase mt-5 cursor-pointer hover:bg-[#7C0F0F] bg-[#adb5bd] px-4 py-2 rounded-b-sm text-white font-semibold duration-[500ms] w-full">
        <Link className="uppercase" to="/match">
          Get started
        </Link>
      </button>
    </div>
  );
}

export default GetToMatchPage;
