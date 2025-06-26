import { configureStore, combineReducers } from "@reduxjs/toolkit";

import MatchFormSlice from "./MatchFormSlice";

const reducers = {
  ...MatchFormSlice,
};

const rootReducer = combineReducers(reducers);

const store = configureStore({ reducer: rootReducer });

export default store;
