import bearRiver from "../../../assets/images/bear-river.png";
import bodyTunners from "../../../assets/images/bodyTuners.png";
import cccu from "../../../assets/images/cccu.png";
import coop from "../../../assets/images/coop.png";
import greenway from "../../../assets/images/greenway.jpg";
import hilfiker from "../../../assets/images/hilfiker.png";
import redwood from "../../../assets/images/redwood.png";
import sunnyBrae from "../../../assets/images/sb.png";

import "./SponsorsScroll.css";

function SponsorsScroll({ isReverse }) {
  return (
    <div className="rootContainer">
      <div className="flex justify-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-black">We would like to thank our sponsors</h2>
      </div>
      <ul className={`sponsorList ${isReverse ? "reverseList" : ""}`}>
        <li className="sponsorLogo">
          <img alt="Greenway Partners" src={greenway} />
        </li>
        <li className="sponsorLogo">
          <img alt="Bear River" src={bearRiver} />
        </li>
        <li className="sponsorLogo">
          <img alt="Hilfiker" src={hilfiker} />
        </li>
        <li className="sponsorLogo">
          <img alt="Coast Central Credit" src={cccu} />
        </li>
        <li className="sponsorLogo">
          <img alt="North Coast Coop" src={coop} />
        </li>
        <li className="sponsorLogo">
          <img alt="Redwood Capital Bank" src={redwood} />
        </li>
        <li className="sponsorLogo">
          <img alt="Sunnry Brae Animal Clinic" src={sunnyBrae} />
        </li>
        <li className="sponsorLogo">
          <img alt="Body Tuners" src={bodyTunners} />
        </li>
        <li className="sponsorLogo">
          <img alt="Greenway Partners" src={greenway} />
        </li>
        <li className="sponsorLogo">
          <img alt="Bear River" src={bearRiver} />
        </li>
        <li className="sponsorLogo">
          <img alt="Hilfiker" src={hilfiker} />
        </li>
        <li className="sponsorLogo">
          <img alt="Coast Central Credit" src={cccu} />
        </li>
        <li className="sponsorLogo">
          <img alt="North Coast Coop" src={coop} />
        </li>
        <li className="sponsorLogo">
          <img alt="Redwood Capital Bank" src={redwood} />
        </li>
        <li className="sponsorLogo">
          <img alt="Sunnry Brae Animal Clinic" src={sunnyBrae} />
        </li>
        <li className="sponsorLogo">
          <img alt="Body Tuners" src={bodyTunners} />
        </li>
      </ul>
    </div>
  );
}

export default SponsorsScroll;
