import { configureStore, combineReducers } from "@reduxjs/toolkit";

import HEQuestionsSlice from "./HousingEnvironmentSlice";
import HCQuestionsSlice from "./HouseholdCompositionSlice";
import MatchFormSlice from "./MatchFormSlice";

const reducers = {
  ...HEQuestionsSlice,
  ...HCQuestionsSlice,
  ...MatchFormSlice,
};

const rootReducer = combineReducers(reducers);

const store = configureStore({ reducer: rootReducer });

export default store;
