import { configureStore, combineReducers } from "@reduxjs/toolkit";

import MatchFormSlice from "./slices/MatchFormSlice";
import MatchedPetSlice from "./slices/MatchedPetSlice";
import UserInfoSlice from "./slices/UserInfoSlice";

const reducers = {
  ...MatchFormSlice,
  ...MatchedPetSlice,
  ...UserInfoSlice,
};

const rootReducer = combineReducers(reducers);

const store = configureStore({ reducer: rootReducer });

export default store;
