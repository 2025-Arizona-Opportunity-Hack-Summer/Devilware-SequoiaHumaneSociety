import { configureStore, combineReducers } from "@reduxjs/toolkit";

import MatchFormSlice from "./MatchFormSlice";
import MatchedPetSlice from "./MatchedPetSlice";

const reducers = {
  ...MatchFormSlice,
  ...MatchedPetSlice,
};

const rootReducer = combineReducers(reducers);

const store = configureStore({ reducer: rootReducer });

export default store;
