import { useState } from "react";

import PageWrapper from "../../components/PageWrapper/PageWrapper";
import Questions from "../../components/Questions/Questions";
import MatchBanner from "../../components/MatchBanner/MatchBanner";
import MatchedPets from "../../components/MatchedPets/MatchedPets";

function Match() {
  const [isQuestionPage, setIsQuestionPage] = useState(true);

  return (
    <PageWrapper className="match">
      <MatchBanner />
      {isQuestionPage && <Questions setIsQuestionPage={setIsQuestionPage} />}
      {!isQuestionPage && <MatchedPets setIsQuestionPage={setIsQuestionPage} />}
    </PageWrapper>
  );
}

export default Match;
