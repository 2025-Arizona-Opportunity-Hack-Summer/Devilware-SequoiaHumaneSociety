import waitingMatchedPetsVid from "../../assets/videos/waitingMatchedPet.mp4";
import BarLoader from "react-spinners/BarLoader";

import "./WaitingLoaderFindPets.css";

function WaitingLoaderFindPets({ visible }) {
  if (visible === false) {
    return <></>;
  }
  return (
    <div className="flex justify-center waiting-loader-pet-root">
      <div className="xl:w-5xl flex flex-col gap-2 mt-20">
        <p
          className="text-center text-3xl"
          style={{
            fontFamily: "Koulen, sans-serif",
            fontStyle: "normal",
            fontWeight: 600,
          }}>
          Looking for your most matched pets...
        </p>
        <BarLoader
          width="100%"
          speedMultiplier="0.5"
          color="#1dd3b0"
          height="20px"
          cssOverride={{ borderRadius: "10px" }}
        />
        <video autoPlay loop muted className="w-full">
          <source src={waitingMatchedPetsVid} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}

export default WaitingLoaderFindPets;
