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

const MatchFormSlice = {
  [finishHESlice.name]: finishHESlice.reducer,
};

export default MatchFormSlice;
