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

export const numAnsweredQuestionSlice = createSlice({
  name: "numAnsweredQuestions",
  initialState: 0,
  reducers: {
    assign(state, action) {
      return action.payload;
    },
    increase(state) {
      return state + 1;
    },
  },
});
// export const finishHHSlice = createSlice({
//   name: "finishHH",
//   initialState: false,
//   reducers: {
//     assign(state, action) {
//       return action.payload;
//     },
//   },
// });

// export const finishHESlice = createSlice({
//   name: "finishHE",
//   initialState: false,
//   reducers: {
//     assign(state, action) {
//       return action.payload;
//     },
//   },
// });

// export const finishHCSlice = createSlice({
//   name: "finishHC",
//   initialState: false,
//   reducers: {
//     assign(state, action) {
//       return action.payload;
//     },
//   },
// });

// export const finishLCSlice = createSlice({
//   name: "finishLC",
//   initialState: false,
//   reducers: {
//     assign(state, action) {
//       return action.payload;
//     },
//   },
// });

// export const finishEESlice = createSlice({
//   name: "finishEE",
//   initialState: false,
//   reducers: {
//     assign(state, action) {
//       return action.payload;
//     },
//   },
// });

// export const finishSPSlice = createSlice({
//   name: "finishSP",
//   initialState: false,
//   reducers: {
//     assign(state, action) {
//       return action.payload;
//     },
//   },
// });

const MatchFormSlice = {
  // [finishHESlice.name]: finishHESlice.reducer,
  // [finishHCSlice.name]: finishHCSlice.reducer,
  // [finishLCSlice.name]: finishLCSlice.reducer,
  // [finishEESlice.name]: finishEESlice.reducer,
  // [finishSPSlice.name]: finishSPSlice.reducer,
  // [finishHHSlice.name]: finishHHSlice.reducer,
  [finishAdopterQuestionsSlice.name]: finishAdopterQuestionsSlice.reducer,
  [finishPetQuestionsSlice.name]: finishPetQuestionsSlice.reducer,
  [numAnsweredQuestionSlice.name]: numAnsweredQuestionSlice.reducer,
};

export default MatchFormSlice;
