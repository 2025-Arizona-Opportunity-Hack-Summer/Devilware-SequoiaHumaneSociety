import SessionStorage from "./sessionStorage";

const spId = ["sp1", "sp2", "sp3", "sp4", "sp5", "sp6"];
const eeId = ["ee1", "ee2", "ee3", "ee4"];
const lcId = ["lc1", "lc2", "lc3", "lc4", "lc5"];
const hcId = ["hc1", "hc2", "hc3", "hc4"];
const heId = ["he1", "he2", "he3", "he4", "he5"];

function saveUserQuesionnaire(user) {
  if (user === null) {
    return;
  }

  const { matchQuestions } = user;
  let updatedMatchQuestions = {};

  const questionsId = [heId, hcId, lcId, eeId, spId].flat();

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

export { saveUserQuesionnaire };
