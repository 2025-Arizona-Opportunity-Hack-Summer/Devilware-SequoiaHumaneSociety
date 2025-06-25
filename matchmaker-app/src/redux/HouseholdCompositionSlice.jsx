import { createSlice } from "@reduxjs/toolkit";

export const hc1Slice = createSlice({
  name: "hc1",
  initialState: { adults: "", children: "", youngestAge: "" },
  reducers: {
    assign(state, action) {
      return action.payload;
    },
  },
});

export const hc2Slice = createSlice({
  name: "hc2",
  initialState: "",
  reducers: {
    assign(state, action) {
      return action.payload;
    },
  },
});

export const hc3Slice = createSlice({
  name: "hc3",
  initialState: "",
  reducers: {
    assign(state, action) {
      return action.payload;
    },
  },
});

export const hc4Slice = createSlice({
  name: "hc4",
  initialState: null,
  reducers: {
    assign(state, action) {
      return action.payload;
    },
  },
});

const HCQuestionsSlice = {
  [hc1Slice.name]: hc1Slice.reducer,
  [hc2Slice.name]: hc2Slice.reducer,
  [hc3Slice.name]: hc3Slice.reducer,
  [hc4Slice.name]: hc4Slice.reducer,
};

export default HCQuestionsSlice;
