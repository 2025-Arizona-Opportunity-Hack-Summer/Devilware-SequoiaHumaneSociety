import { configureStore, combineReducers } from "@reduxjs/toolkit";

import HEQuestionsSlice from "./HousingEnvironmentSlice";
import HCQuestionsSlice from "./HouseholdCompositionSlice";
import LCQuestionsSlice from "./LifeStyleCommitmentSlice";
import EEQuestionsSlice from "./ExperienceExpectationsSlice";
import SPQuestionsSlice from "./SpecificPreferencesSlice";
import MatchFormSlice from "./MatchFormSlice";

const reducers = {
  ...HEQuestionsSlice,
  ...HCQuestionsSlice,
  ...LCQuestionsSlice,
  ...EEQuestionsSlice,
  ...SPQuestionsSlice,
  ...MatchFormSlice,
};

const rootReducer = combineReducers(reducers);

const store = configureStore({ reducer: rootReducer });

export default store;
