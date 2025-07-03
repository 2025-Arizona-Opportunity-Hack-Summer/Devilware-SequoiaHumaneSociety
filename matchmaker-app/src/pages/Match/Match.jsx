import PageWrapper from "../../components/PageWrapper/PageWrapper";
import Questions from "../../components/Questions/Questions";
import MatchBanner from "../../components/MatchBanner/MatchBanner";
import MatchedPets from "../../components/MatchedPets/MatchedPets";

function Match() {
  return (
    <PageWrapper className="match">
      <MatchBanner />
      {/* <Questions /> */}
      <MatchedPets />
    </PageWrapper>
  );
}

export default Match;
