import SessionStorage from "./sessionStorage";

const adopterId = ["a1", "a2", "a3", "a4"];
const petId = ["p1", "p2", "p3", "p4"];

function saveUserAnswers(user) {
  if (user === null) {
    return;
  }

  const { matchAnswers } = user;
  let updateMatchAnswers = {};

  const questionsId = [adopterId, petId].flat();

  for (const questionItem of questionsId) {
    if (matchAnswers[questionItem] !== undefined) {
      SessionStorage.setItem(questionItem, matchAnswers[questionItem]);
      updateMatchAnswers[questionItem] = matchQuestions[questionItem];
    } else if (SessionStorage.getItem(questionItem) !== null) {
      updateMatchAnswers[questionItem] = SessionStorage.getItem(questionItem);
    }
  }

  return updateMatchAnswers;
}

export default saveUserAnswers;
