import { configureStore, combineReducers } from "@reduxjs/toolkit";

import HEQuestionsSlice from "./HousingEnvironmentSlice";

const reducers = {
  ...HEQuestionsSlice,
};

const rootReducer = combineReducers(reducers);

const store = configureStore({ reducer: rootReducer });

export default store;
