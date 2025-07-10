import { configureStore, combineReducers } from "@reduxjs/toolkit";

import MatchFormSlice from "./MatchFormSlice";
import MatchedPetSlice from "./MatchedPetSlice";
import MatchedFilterSlice from "./MatchedFilterSlice";

const reducers = {
  ...MatchFormSlice,
  ...MatchedPetSlice,
  ...MatchedFilterSlice,
};

const rootReducer = combineReducers(reducers);

const store = configureStore({ reducer: rootReducer });

export default store;
