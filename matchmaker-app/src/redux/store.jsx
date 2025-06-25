import { configureStore, combineReducers } from "@reduxjs/toolkit";

import HEQuestionsSlice from "./HousingEnvironmentSlice";
import MatchFormSlice from "./MatchFormSlice";

const reducers = {
  ...HEQuestionsSlice,
  ...MatchFormSlice,
};

const rootReducer = combineReducers(reducers);

const store = configureStore({ reducer: rootReducer });

export default store;
