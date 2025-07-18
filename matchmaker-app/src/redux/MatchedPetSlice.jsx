import { createSlice } from "@reduxjs/toolkit";

export const matchedPetListSlice = createSlice({
  name: "matchedPetList",
  initialState: [],
  reducers: {
    assign(state, action) {
      return action.payload;
    },
  },
});

const MatchedPetSlice = {
  [matchedPetListSlice.name]: matchedPetListSlice.reducer,
};

export default MatchedPetSlice;
