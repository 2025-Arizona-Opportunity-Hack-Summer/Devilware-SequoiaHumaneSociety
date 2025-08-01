import SessionStorage from "./sessionStorage";

const adopterId = ["a1", "a2", "a3", "a4"];
const petId = ["p1", "p2", "p3", "p4"];

function saveUserAnswers(user) {
  if (user === null) {
    return;
  }

  const { matchQuestions } = user;
  let updatedMatchQuestions = {};

  const questionsId = [adopterId, petId].flat();

  for (const questionItem of questionsId) {
    if (matchQuestions[questionItem] !== undefined) {
      SessionStorage.setItem(questionItem, matchQuestions[questionItem]);
      updatedMatchQuestions[questionItem] = matchQuestions[questionItem];
    } else if (SessionStorage.getItem(questionItem) !== null) {
      updatedMatchQuestions[questionItem] = SessionStorage.getItem(questionItem);
    }
  }

  return updatedMatchQuestions;
}

export default saveUserAnswers;
