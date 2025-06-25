import { createSlice } from "@reduxjs/toolkit";

export const he1Slice = createSlice({
  name: "he1",
  initialState: "",
  reducers: {
    assign(state, action) {
      return action.payload;
    },
  },
});

export const he2Slice = createSlice({
  name: "he2",
  initialState: "",
  reducers: {
    assign(state, action) {
      return action.payload;
    },
  },
});

export const he3Slice = createSlice({
  name: "he3",
  initialState: { type: "", height: 0 },
  reducers: {
    assign(state, action) {
      return action.payload;
    },
  },
});

export const he4Slice = createSlice({
  name: "he4",
  initialState: "",
  reducers: {
    assign(state, action) {
      return action.payload;
    },
  },
});

export const he5Slice = createSlice({
  name: "he5",
  initialState: "",
  reducers: {
    assign(state, action) {
      return action.payload;
    },
  },
});

const HEQuestionsSlice = {
  [he1Slice.name]: he1Slice.reducer,
  [he2Slice.name]: he2Slice.reducer,
  [he3Slice.name]: he3Slice.reducer,
  [he4Slice.name]: he4Slice.reducer,
  [he5Slice.name]: he5Slice.reducer,
};

export default HEQuestionsSlice;
