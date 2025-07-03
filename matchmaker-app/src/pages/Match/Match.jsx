import { useState } from "react";

import Questions from "../../components/Questions/Questions";
import MatchBanner from "../../components/MatchBanner/MatchBanner";
import MatchedPets from "../../components/MatchedPets/MatchedPets";

function Match() {
  const [isQuestionPage, setIsQuestionPage] = useState(true);

  return (
    <div className="match">
      <MatchBanner />
      <Questions />
    </div>
  );
}

export default Match;
