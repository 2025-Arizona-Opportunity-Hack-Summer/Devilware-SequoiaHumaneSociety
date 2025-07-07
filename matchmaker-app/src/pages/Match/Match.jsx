import { useState } from "react";

import Questions from "../../components/Questions/Questions";
import MatchBanner from "../../components/MatchBanner/MatchBanner";
import MatchedPets from "../../components/MatchedPets/MatchedPets";
import WaitingLoaderFindPets from "../../components/WaitingLoaderFindPets/WaitingLoaderFindPets";

function Match() {
  const [isQuestionPage, setIsQuestionPage] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="match">
      {/* <MatchBanner /> */}
      {/* {isQuestionPage && <Questions setIsQuestionPage={setIsQuestionPage} />}
      {!isQuestionPage && <MatchedPets setIsQuestionPage={setIsQuestionPage} />} */}
      {/* <Questions setIsQuestionPage={setIsQuestionPage} visible={isQuestionPage} />
      <WaitingLoaderFindPets />
      <MatchedPets setIsQuestionPage={setIsQuestionPage} visible={!isQuestionPage} /> */}
      <Questions
        setIsQuestionPage={setIsQuestionPage}
        visible={!isLoading && isQuestionPage}
        setIsLoading={setIsLoading}
      />
      <WaitingLoaderFindPets visible={isLoading} />
      <MatchedPets setIsQuestionPage={setIsQuestionPage} visible={!isLoading && !isQuestionPage} />
    </div>
  );
}

export default Match;
