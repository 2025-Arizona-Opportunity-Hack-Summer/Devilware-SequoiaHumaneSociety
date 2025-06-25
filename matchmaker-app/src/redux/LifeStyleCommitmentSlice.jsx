import { createSlice } from "@reduxjs/toolkit";

export const lc1Slice = createSlice({
  name: "lc1",
  initialState: "",
  reducers: {
    assign(state, action) {
      return action.payload;
    },
  },
});

export const lc2Slice = createSlice({
  name: "lc2",
  initialState: "",
  reducers: {
    assign(state, action) {
      return action.payload;
    },
  },
});

export const lc3Slice = createSlice({
  name: "lc3",
  initialState: "",
  reducers: {
    assign(state, action) {
      return action.payload;
    },
  },
});

export const lc4Slice = createSlice({
  name: "lc4",
  initialState: { frequency: "", plan: "" },
  reducers: {
    assign(state, action) {
      return action.payload;
    },
  },
});

export const lc5Slice = createSlice({
  name: "lc5",
  initialState: null,
  reducers: {
    assign(state, action) {
      return action.payload;
    },
  },
});

const LCQuestionsSlice = {
  [lc1Slice.name]: lc1Slice.reducer,
  [lc2Slice.name]: lc2Slice.reducer,
  [lc3Slice.name]: lc3Slice.reducer,
  [lc4Slice.name]: lc4Slice.reducer,
  [lc5Slice.name]: lc5Slice.reducer,
};

export default LCQuestionsSlice;
