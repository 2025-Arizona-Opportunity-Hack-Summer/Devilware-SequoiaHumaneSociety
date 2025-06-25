import { createSlice } from "@reduxjs/toolkit";

export const finishHESlice = createSlice({
  name: "finishHESlice",
  initialState: false,
  reducers: {
    assign(state, action) {
      return action.payload;
    },
  },
});

export const finishHCSlice = createSlice({
  name: "finishHCSlice",
  initialState: false,
  reducers: {
    assign(state, action) {
      return action.payload;
    },
  },
});

export const finishLCSlice = createSlice({
  name: "finishLCSlice",
  initialState: false,
  reducers: {
    assign(state, action) {
      return action.payload;
    },
  },
});

const MatchFormSlice = {
  [finishHESlice.name]: finishHESlice.reducer,
  [finishHCSlice.name]: finishHCSlice.reducer,
  [finishLCSlice.name]: finishLCSlice.reducer,
};

export default MatchFormSlice;
