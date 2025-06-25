import { createSlice } from "@reduxjs/toolkit";

export const ee1Slice = createSlice({
  name: "ee1",
  initialState: "",
  reducers: {
    assign(state, action) {
      return action.payload;
    },
  },
});

export const ee2Slice = createSlice({
  name: "ee2",
  initialState: "",
  reducers: {
    assign(state, action) {
      return action.payload;
    },
  },
});

export const ee3Slice = createSlice({
  name: "ee3",
  initialState: "",
  reducers: {
    assign(state, action) {
      return action.payload;
    },
  },
});

export const ee4Slice = createSlice({
  name: "ee4",
  initialState: null,
  reducers: {
    assign(state, action) {
      return action.payload;
    },
  },
});

const EEQuestionsSlice = {
  [ee1Slice.name]: ee1Slice.reducer,
  [ee2Slice.name]: ee2Slice.reducer,
  [ee3Slice.name]: ee3Slice.reducer,
  [ee4Slice.name]: ee4Slice.reducer,
};

export default EEQuestionsSlice;
