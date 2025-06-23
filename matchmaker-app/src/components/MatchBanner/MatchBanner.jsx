import cat from "../../assets/images/Cat Standing.png";
import dog from "../../assets/images/Dog.png";

function MatchBanner() {
  return (
    <div className="bg-[#7C0F0F] text-center py-28 relative overflow-hidden">
      <h1
        className="uppercase text-white xl:text-5xl tracking-tight "
        style={{
          fontFamily: "Koulen, sans-serif",
          fontStyle: "normal",
          fontWeight: 400,
        }}
      >
        Find your most matched pets right now
      </h1>
      <img
        src={dog}
        alt="dog"
        className="absolute w-[28rem] left-0 translate-x-[-230px] top-0"
      />
      <img
        src={cat}
        alt="cat"
        className="absolute w-[28rem] right-0 translate-x-[230px] top-0"
      />
    </div>
  );
}

export default MatchBanner;
