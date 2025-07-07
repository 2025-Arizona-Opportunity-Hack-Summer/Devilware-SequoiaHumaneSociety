import { createSlice } from "@reduxjs/toolkit";

export const petListSlice = createSlice({
  name: "petListSlice",
  initialState: [],
  reducers: {
    assign(state, action) {
      return action.payload;
    },
  },
});

const MatchedPetSlice = {
  [petListSlice.name]: petListSlice.reducer,
};

export default MatchedPetSlice;
