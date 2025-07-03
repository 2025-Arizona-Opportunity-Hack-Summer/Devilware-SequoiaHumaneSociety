import Questions from "../../components/Questions/Questions";
import MatchBanner from "../../components/MatchBanner/MatchBanner";

function Match() {
  return (
    <div className="match">
      <MatchBanner />
      <Questions />
    </div>
  );
}

export default Match;
