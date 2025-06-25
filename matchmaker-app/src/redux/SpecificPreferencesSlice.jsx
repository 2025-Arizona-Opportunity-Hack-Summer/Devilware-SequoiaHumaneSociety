import { createSlice } from "@reduxjs/toolkit";

export const sp1Slice = createSlice({
  name: "sp1",
  initialState: "",
  reducers: {
    assign(state, action) {
      return action.payload;
    },
  },
});

export const sp2Slice = createSlice({
  name: "sp2",
  initialState: { fromAge: "", toAge: "" },
  reducers: {
    assign(state, action) {
      return action.payload;
    },
  },
});

export const sp3Slice = createSlice({
  name: "sp3",
  initialState: [],
  reducers: {
    assign(state, action) {
      return action.payload;
    },
  },
});

export const sp4Slice = createSlice({
  name: "sp4",
  initialState: [],
  reducers: {
    assign(state, action) {
      return action.payload;
    },
  },
});

export const sp5Slice = createSlice({
  name: "sp5",
  initialState: "",
  reducers: {
    assign(state, action) {
      return action.payload;
    },
  },
});

export const sp6Slice = createSlice({
  name: "sp6",
  initialState: "",
  reducers: {
    assign(state, action) {
      return action.payload;
    },
  },
});

const SPQuestionsSlice = {
  [sp1Slice.name]: sp1Slice.reducer,
  [sp2Slice.name]: sp2Slice.reducer,
  [sp3Slice.name]: sp3Slice.reducer,
  [sp4Slice.name]: sp4Slice.reducer,
  [sp5Slice.name]: sp5Slice.reducer,
  [sp6Slice.name]: sp6Slice.reducer,
};

export default SPQuestionsSlice;
