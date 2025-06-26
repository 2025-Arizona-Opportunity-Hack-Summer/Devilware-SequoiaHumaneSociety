import { createSlice } from "@reduxjs/toolkit";

export const finishHESlice = createSlice({
  name: "finishHE",
  initialState: false,
  reducers: {
    assign(state, action) {
      return action.payload;
    },
  },
});

export const finishHCSlice = createSlice({
  name: "finishHC",
  initialState: false,
  reducers: {
    assign(state, action) {
      return action.payload;
    },
  },
});

export const finishLCSlice = createSlice({
  name: "finishLC",
  initialState: false,
  reducers: {
    assign(state, action) {
      return action.payload;
    },
  },
});

export const finishEESlice = createSlice({
  name: "finishEE",
  initialState: false,
  reducers: {
    assign(state, action) {
      return action.payload;
    },
  },
});

export const finishSPSlice = createSlice({
  name: "finishSP",
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
  [finishEESlice.name]: finishEESlice.reducer,
  [finishSPSlice.name]: finishSPSlice.reducer,
};

export default MatchFormSlice;
