import PageWrapper from "../../components/NavigationBar/PageWrapper";
import Questions from "../../components/Questions/Questions";
import MatchBanner from "../../components/MatchBanner/MatchBanner";

function Match() {
  return (
    <PageWrapper className="match">
      <MatchBanner />
      <Questions />
    </PageWrapper>
  );
}

export default Match;
