import { Link } from "react-router";

import catNav from "../../assets/images/cat-1-com.svg";
import dogNav from "../../assets/images/dog-1-com.svg";
import barn from "../../assets/images/barn.jpg";

import "./AdoptRoot.css";

function AdoptRoot() {
  return (
    <div className="lg:mx-20 adopt-root mx-5">
      <img src={barn} alt="barn" className="h-96" />
      <div className="pt-10  flex flex-col gap-4">
        <h2
          className="uppercase text-[#C1272D] text-5xl"
          style={{
            fontFamily: "Koulen, sans-serif",
            fontStyle: "normal",
            fontWeight: 600,
          }}>
          Adopt with us
        </h2>
        <p>To start an adoption application, choose the type of animal you are looking to adopt:</p>
        <ul className="list-disc list-outside flex flex-col gap-2">
          <li>
            <Link to="/adopt/cat" className="text-[#C1272D] font-semibold underline flex gap-2">
              <img src={catNav} alt="cat" className="w-6" />
              <p>Cat</p>
            </Link>
          </li>
          <li>
            <Link to="/adopt/dog" className="text-[#C1272D] font-semibold underline flex gap-2">
              <img src={dogNav} alt="dog" className="w-6" />
              <p>Dog</p>
            </Link>
          </li>
        </ul>
        <p className="max-w-3xl">
          If you're not quite ready to adopt, you can still support these cuties! All our animals are available for
          adoption, but some may not be ready to go home just yet.
        </p>
        <p> Please call if you have questions on current status. 707.442.1782</p>
      </div>
    </div>
  );
}

export default AdoptRoot;
