import { createSlice } from "@reduxjs/toolkit";

export const finishAdopterQuestionsSlice = createSlice({
  name: "finishAdopterQuestion",
  initialState: false,
  reducers: {
    assign(state, action) {
      return action.payload;
    },
  },
});

export const finishPetQuestionsSlice = createSlice({
  name: "finishPetQuestion",
  initialState: false,
  reducers: {
    assign(state, action) {
      return action.payload;
    },
  },
});

const MatchFormSlice = {
  [finishAdopterQuestionsSlice.name]: finishAdopterQuestionsSlice.reducer,
  [finishPetQuestionsSlice.name]: finishPetQuestionsSlice.reducer,
};

export default MatchFormSlice;
