import { useState } from "react";

import Questions from "../../components/Questions/Questions";
import MatchBanner from "../../components/MatchBanner/MatchBanner";
import MatchedPets from "../../components/MatchedPets/MatchedPets";

function Match() {
  const [isQuestionPage, setIsQuestionPage] = useState(true);

  return (
    <div className="match">
      <MatchBanner />
      {/* {isQuestionPage && <Questions setIsQuestionPage={setIsQuestionPage} />}
      {!isQuestionPage && <MatchedPets setIsQuestionPage={setIsQuestionPage} />} */}
      <Questions setIsQuestionPage={setIsQuestionPage} visible={isQuestionPage} />
      <MatchedPets setIsQuestionPage={setIsQuestionPage} visible={!isQuestionPage} />
    </div>
  );
}

export default Match;
